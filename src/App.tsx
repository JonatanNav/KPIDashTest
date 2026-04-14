import { DashboardLayout } from './components/layout/DashboardLayout';
import { KPIGrid } from './components/dashboard/KPIGrid';
import { MeetingsTable } from './components/dashboard/MeetingsTable';
import { ProposalsTable } from './components/dashboard/ProposalsTable';
import { mockKPIs } from './data/mockKPIs';
import { mockMeetings, meetingKPIs } from './data/mockMeetings';
import { mockProposals, proposalKPIs } from './data/mockProposals';

function App() {
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Overview</h2>
        <KPIGrid kpis={mockKPIs} />
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Sales Meetings</h2>
        <KPIGrid kpis={meetingKPIs} />
        <div className="mt-6">
          <MeetingsTable meetings={mockMeetings} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Proposals</h2>
        <KPIGrid kpis={proposalKPIs} />
        <div className="mt-6">
          <ProposalsTable proposals={mockProposals} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
