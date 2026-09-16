import { useState } from 'react';
import type { Meeting } from '../../types/meeting';

const statusStyles: Record<Meeting['status'], string> = {
  Completed: 'bg-green-100 text-green-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};

const statuses: Meeting['status'][] = ['Scheduled', 'Completed', 'Cancelled'];
const types: Meeting['type'][] = ['Discovery', 'Demo', 'Follow-up', 'Closing'];

const emptyDraft: Omit<Meeting, 'id'> = {
  client: '',
  date: new Date().toISOString().slice(0, 10),
  status: 'Scheduled',
  type: 'Discovery',
};

interface MeetingsTableProps {
  meetings: Meeting[];
  onAdd?: (data: Omit<Meeting, 'id'>) => void;
  onUpdate?: (id: string, patch: Partial<Omit<Meeting, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export function MeetingsTable({ meetings, onAdd, onUpdate, onDelete }: MeetingsTableProps) {
  const editable = Boolean(onUpdate);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Meeting, 'id'>>(emptyDraft);
  const [newDraft, setNewDraft] = useState<Omit<Meeting, 'id'>>(emptyDraft);

  const startEdit = (m: Meeting) => {
    setEditingId(m.id);
    setDraft(m);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            {editable && <th className="pb-3" />}
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) =>
            editingId === m.id ? (
              <tr key={m.id} className="border-b last:border-b-0 border-gray-100 bg-blue-50/40">
                <td className="py-2 pr-2">
                  <input
                    className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.client}
                    onChange={(e) => setDraft({ ...draft, client: e.target.value })}
                  />
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="date"
                    className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.date}
                    onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                  />
                </td>
                <td className="py-2 pr-2">
                  <select
                    className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.type}
                    onChange={(e) => setDraft({ ...draft, type: e.target.value as Meeting['type'] })}
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-2">
                  <select
                    className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.status}
                    onChange={(e) => setDraft({ ...draft, status: e.target.value as Meeting['status'] })}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <button
                    onClick={() => {
                      onUpdate?.(m.id, draft);
                      setEditingId(null);
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 mr-3"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={m.id} className="group border-b last:border-b-0 border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900">{m.client}</td>
                <td className="py-3 text-sm text-gray-600">{m.date}</td>
                <td className="py-3 text-sm text-gray-600">{m.type}</td>
                <td className="py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[m.status]}`}>
                    {m.status}
                  </span>
                </td>
                {editable && (
                  <td className="py-3 text-right whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(m)}
                      className="text-xs font-medium text-gray-400 hover:text-blue-600 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete?.(m.id)}
                      className="text-xs font-medium text-gray-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>

      {editable && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <input
            className="flex-1 min-w-[120px] text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            placeholder="Client name"
            value={newDraft.client}
            onChange={(e) => setNewDraft({ ...newDraft, client: e.target.value })}
          />
          <input
            type="date"
            className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            value={newDraft.date}
            onChange={(e) => setNewDraft({ ...newDraft, date: e.target.value })}
          />
          <select
            className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            value={newDraft.type}
            onChange={(e) => setNewDraft({ ...newDraft, type: e.target.value as Meeting['type'] })}
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            value={newDraft.status}
            onChange={(e) => setNewDraft({ ...newDraft, status: e.target.value as Meeting['status'] })}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={() => {
              if (!newDraft.client.trim()) return;
              onAdd?.(newDraft);
              setNewDraft(emptyDraft);
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add meeting
          </button>
        </div>
      )}
    </div>
  );
}
