import type { KPI } from '../../types/kpi';
import { KPICard } from './KPICard';

interface KPIGridProps {
  kpis: KPI[];
  onUpdate?: (id: string, patch: Partial<Omit<KPI, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export function KPIGrid({ kpis, onUpdate, onDelete }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
