import type { Meeting } from '../../types/meeting';

const statusStyles: Record<Meeting['status'], string> = {
  Completed: 'bg-green-100 text-green-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};

interface MeetingsTableProps {
  meetings: Meeting[];
}

export function MeetingsTable({ meetings }: MeetingsTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.id} className="border-b last:border-b-0 border-gray-100">
              <td className="py-3 text-sm font-medium text-gray-900">{m.client}</td>
              <td className="py-3 text-sm text-gray-600">{m.date}</td>
              <td className="py-3 text-sm text-gray-600">{m.type}</td>
              <td className="py-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[m.status]}`}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
