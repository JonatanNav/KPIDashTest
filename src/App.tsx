import { DashboardLayout } from './components/layout/DashboardLayout';
import { KPIGrid } from './components/dashboard/KPIGrid';
import { MeetingsTable } from './components/dashboard/MeetingsTable';
import { ProposalsTable } from './components/dashboard/ProposalsTable';
import { useCollection } from './hooks/useCollection';
import { mockKPIs } from './data/mockKPIs';
import { mockMeetings, computeMeetingKPIs } from './data/mockMeetings';
import { mockProposals, computeProposalKPIs } from './data/mockProposals';
import type { KPI } from './types/kpi';
import type { Meeting } from './types/meeting';
import type { Proposal } from './types/proposal';

function App() {
  const kpis = useCollection<KPI>('kpis', mockKPIs);
  const meetings = useCollection<Meeting>('meetings', mockMeetings);
  const proposals = useCollection<Proposal>('proposals', mockProposals);

  return (
    <DashboardLayout mode={kpis.mode}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
          <button
            onClick={() =>
              kpis.addItem({ title: 'New KPI', value: '0', change: 0, changeLabel: 'vs last month' })
            }
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add KPI
          </button>
        </div>
        <KPIGrid kpis={kpis.items} onUpdate={kpis.updateItem} onDelete={kpis.removeItem} />
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales Meetings</h2>
        <KPIGrid kpis={computeMeetingKPIs(meetings.items)} />
        <div className="mt-6">
          <MeetingsTable
            meetings={meetings.items}
            onAdd={meetings.addItem}
            onUpdate={meetings.updateItem}
            onDelete={meetings.removeItem}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Proposals</h2>
        <KPIGrid kpis={computeProposalKPIs(proposals.items)} />
        <div className="mt-6">
          <ProposalsTable
            proposals={proposals.items}
            onAdd={proposals.addItem}
            onUpdate={proposals.updateItem}
            onDelete={proposals.removeItem}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
