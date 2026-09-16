import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    claude?: {
      use: (name: string) => Promise<unknown>;
    };
  }
}

interface DocSnapshot {
  id: string;
  data(): Record<string, unknown> | undefined;
}

interface QuerySnapshot {
  docs: DocSnapshot[];
}

interface CollectionRef {
  doc(id?: string): {
    update(data: Record<string, unknown>): Promise<void>;
    delete(): Promise<void>;
  };
  add(data: Record<string, unknown>): Promise<{ id: string }>;
  onSnapshot(
    next: (snap: QuerySnapshot) => void,
    error?: (e: unknown) => void,
  ): () => void;
}

interface Db {
  collection(path: string): CollectionRef;
}

export type SyncMode = 'loading' | 'synced' | 'local';

export function useCollection<T extends { id: string }>(path: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [mode, setMode] = useState<SyncMode>('loading');
  const collectionRef = useRef<CollectionRef | null>(null);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    async function init() {
      if (typeof window === 'undefined' || typeof window.claude?.use !== 'function') {
        if (!cancelled) setMode('local');
        return;
      }
      const db = (await window.claude.use('db')) as Db | null;
      if (cancelled) return;
      if (!db) {
        setMode('local');
        return;
      }
      const collection = db.collection(path);
      collectionRef.current = collection;
      unsubscribe = collection.onSnapshot(
        (snap) => {
          if (cancelled) return;
          setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
          setMode('synced');
        },
        () => {
          if (!cancelled) setMode('local');
        },
      );
    }

    init();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [path]);

  const addItem = useCallback(
    async (data: Omit<T, 'id'>) => {
      if (collectionRef.current) {
        await collectionRef.current.add(data as Record<string, unknown>);
      } else {
        const id = crypto.randomUUID();
        setItems((prev) => [...prev, { ...data, id } as T]);
      }
    },
    [],
  );

  const updateItem = useCallback(async (id: string, patch: Partial<Omit<T, 'id'>>) => {
    if (collectionRef.current) {
      await collectionRef.current.doc(id).update(patch as Record<string, unknown>);
    } else {
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    }
  }, []);

  const removeItem = useCallback(async (id: string) => {
    if (collectionRef.current) {
      await collectionRef.current.doc(id).delete();
    } else {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  }, []);

  return { items, mode, addItem, updateItem, removeItem };
}
