import type { Proposal } from '../../types/proposal';

const statusStyles: Record<Proposal['status'], string> = {
  Accepted: 'bg-green-100 text-green-700',
  Sent: 'bg-blue-100 text-blue-700',
  Draft: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

interface ProposalsTableProps {
  proposals: Proposal[];
}

export function ProposalsTable({ proposals }: ProposalsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p.id} className="border-b last:border-b-0 border-gray-100">
              <td className="py-3 text-sm font-medium text-gray-900">{p.client}</td>
              <td className="py-3 text-sm text-gray-600">${p.amount.toLocaleString()}</td>
              <td className="py-3 text-sm text-gray-600">{p.date}</td>
              <td className="py-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
