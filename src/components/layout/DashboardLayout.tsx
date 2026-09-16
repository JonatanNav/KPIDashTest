import type { SyncMode } from '../../hooks/useCollection';

interface DashboardLayoutProps {
  children: React.ReactNode;
  mode?: SyncMode;
}

const modeLabel: Record<SyncMode, string> = {
  loading: 'Connecting…',
  synced: 'Synced with team',
  local: 'Local preview (not connected)',
};

const modeDot: Record<SyncMode, string> = {
  loading: 'bg-gray-300',
  synced: 'bg-green-500',
  local: 'bg-gray-400',
};

export function DashboardLayout({ children, mode = 'local' }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">KPI Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${modeDot[mode]}`} />
            <span className="text-sm text-gray-400">{modeLabel[mode]}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
