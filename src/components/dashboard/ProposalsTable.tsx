import { useState } from 'react';
import type { Proposal } from '../../types/proposal';

const statusStyles: Record<Proposal['status'], string> = {
  Accepted: 'bg-green-100 text-green-700',
  Sent: 'bg-blue-100 text-blue-700',
  Draft: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

const statuses: Proposal['status'][] = ['Draft', 'Sent', 'Accepted', 'Rejected'];

const emptyDraft: Omit<Proposal, 'id'> = {
  client: '',
  amount: 0,
  status: 'Draft',
  date: new Date().toISOString().slice(0, 10),
};

interface ProposalsTableProps {
  proposals: Proposal[];
  onAdd?: (data: Omit<Proposal, 'id'>) => void;
  onUpdate?: (id: string, patch: Partial<Omit<Proposal, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export function ProposalsTable({ proposals, onAdd, onUpdate, onDelete }: ProposalsTableProps) {
  const editable = Boolean(onUpdate);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Proposal, 'id'>>(emptyDraft);
  const [newDraft, setNewDraft] = useState<Omit<Proposal, 'id'>>(emptyDraft);

  const startEdit = (p: Proposal) => {
    setEditingId(p.id);
    setDraft(p);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            {editable && <th className="pb-3" />}
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) =>
            editingId === p.id ? (
              <tr key={p.id} className="border-b last:border-b-0 border-gray-100 bg-blue-50/40">
                <td className="py-2 pr-2">
                  <input
                    className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.client}
                    onChange={(e) => setDraft({ ...draft, client: e.target.value })}
                  />
                </td>
                <td className="py-2 pr-2">
                  <input
                    type="number"
                    className="w-24 text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
                    value={draft.amount}
                    onChange={(e) => setDraft({ ...draft, amount: Number(e.target.value) })}
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
                    value={draft.status}
                    onChange={(e) => setDraft({ ...draft, status: e.target.value as Proposal['status'] })}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <button
                    onClick={() => {
                      onUpdate?.(p.id, draft);
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
              <tr key={p.id} className="group border-b last:border-b-0 border-gray-100">
                <td className="py-3 text-sm font-medium text-gray-900">{p.client}</td>
                <td className="py-3 text-sm text-gray-600">${p.amount.toLocaleString()}</td>
                <td className="py-3 text-sm text-gray-600">{p.date}</td>
                <td className="py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                {editable && (
                  <td className="py-3 text-right whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-xs font-medium text-gray-400 hover:text-blue-600 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete?.(p.id)}
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
            type="number"
            className="w-24 text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            placeholder="Amount"
            value={newDraft.amount || ''}
            onChange={(e) => setNewDraft({ ...newDraft, amount: Number(e.target.value) })}
          />
          <input
            type="date"
            className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            value={newDraft.date}
            onChange={(e) => setNewDraft({ ...newDraft, date: e.target.value })}
          />
          <select
            className="text-sm border-b border-gray-300 focus:outline-none focus:border-blue-400"
            value={newDraft.status}
            onChange={(e) => setNewDraft({ ...newDraft, status: e.target.value as Proposal['status'] })}
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
            + Add proposal
          </button>
        </div>
      )}
    </div>
  );
}
