import type { Meeting } from '../types/meeting';
import type { KPI } from '../types/kpi';

export const mockMeetings: Meeting[] = [
  { id: 'm1', client: 'Acme Corp', date: '2026-04-14', status: 'Scheduled', type: 'Discovery' },
  { id: 'm2', client: 'Globex Inc', date: '2026-04-12', status: 'Completed', type: 'Demo' },
  { id: 'm3', client: 'Stark Industries', date: '2026-04-11', status: 'Completed', type: 'Closing' },
  { id: 'm4', client: 'Wayne Enterprises', date: '2026-04-10', status: 'Cancelled', type: 'Follow-up' },
  { id: 'm5', client: 'Initech', date: '2026-04-15', status: 'Scheduled', type: 'Demo' },
  { id: 'm6', client: 'Umbrella Corp', date: '2026-04-09', status: 'Completed', type: 'Follow-up' },
];

const total = mockMeetings.length;
const completed = mockMeetings.filter((m) => m.status === 'Completed').length;
const scheduled = mockMeetings.filter((m) => m.status === 'Scheduled').length;
const completionRate = Math.round((completed / total) * 100);

export const meetingKPIs: KPI[] = [
  { id: 'mk1', title: 'Total Meetings', value: total, change: 15.0, changeLabel: 'vs last month' },
  { id: 'mk2', title: 'Completed', value: completed, change: 10.0, changeLabel: 'vs last month' },
  { id: 'mk3', title: 'Scheduled', value: scheduled, change: 25.0, changeLabel: 'vs last month' },
  { id: 'mk4', title: 'Completion Rate', value: `${completionRate}%`, change: 3.2, changeLabel: 'vs last month' },
];
