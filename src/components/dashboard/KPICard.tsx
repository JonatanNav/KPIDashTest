import type { KPI } from '../../types/kpi';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const isPositive = kpi.change >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{kpi.value}</p>
      <div className="mt-3 flex items-center gap-1">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '\u2191' : '\u2193'} {Math.abs(kpi.change)}%
        </span>
        <span className="text-sm text-gray-400">{kpi.changeLabel}</span>
      </div>
    </div>
  );
}
