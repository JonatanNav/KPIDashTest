import { useState } from 'react';
import type { KPI } from '../../types/kpi';

interface KPICardProps {
  kpi: KPI;
  onUpdate?: (id: string, patch: Partial<Omit<KPI, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export function KPICard({ kpi, onUpdate, onDelete }: KPICardProps) {
  const editable = Boolean(onUpdate);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(kpi);

  const isPositive = kpi.change >= 0;

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-6 space-y-2">
        <input
          className="w-full text-sm font-medium text-gray-500 border-b border-gray-200 focus:outline-none focus:border-blue-400"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Title"
        />
        <input
          className="w-full text-2xl font-bold text-gray-900 border-b border-gray-200 focus:outline-none focus:border-blue-400"
          value={draft.value}
          onChange={(e) => setDraft({ ...draft, value: e.target.value })}
          placeholder="Value"
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.1"
            className="w-20 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-400"
            value={draft.change}
            onChange={(e) => setDraft({ ...draft, change: Number(e.target.value) })}
          />
          <input
            className="flex-1 text-sm text-gray-400 border-b border-gray-200 focus:outline-none focus:border-blue-400"
            value={draft.changeLabel}
            onChange={(e) => setDraft({ ...draft, changeLabel: e.target.value })}
            placeholder="Change label"
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              onDelete?.(kpi.id);
            }}
            className="text-xs font-medium text-red-500 hover:text-red-600"
          >
            Delete
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setDraft(kpi);
                setEditing(false);
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onUpdate?.(kpi.id, draft);
                setEditing(false);
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {editable && (
        <button
          onClick={() => {
            setDraft(kpi);
            setEditing(true);
          }}
          className="absolute top-4 right-4 text-xs font-medium text-gray-300 opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-opacity"
        >
          Edit
        </button>
      )}
      <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{kpi.value}</p>
      <div className="mt-3 flex items-center gap-1">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(kpi.change)}%
        </span>
        <span className="text-sm text-gray-400">{kpi.changeLabel}</span>
      </div>
    </div>
  );
}
