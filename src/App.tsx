import { DashboardLayout } from './components/layout/DashboardLayout';
import { KPIGrid } from './components/dashboard/KPIGrid';
import { mockKPIs } from './data/mockKPIs';

function App() {
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Overview</h2>
        <KPIGrid kpis={mockKPIs} />
      </div>
    </DashboardLayout>
  );
}

export default App;
