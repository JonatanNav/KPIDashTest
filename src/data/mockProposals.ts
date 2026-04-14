import type { Proposal } from '../types/proposal';
import type { KPI } from '../types/kpi';

export const mockProposals: Proposal[] = [
  { id: 'p1', client: 'Acme Corp', amount: 45000, status: 'Sent', date: '2026-04-13' },
  { id: 'p2', client: 'Globex Inc', amount: 72000, status: 'Accepted', date: '2026-04-10' },
  { id: 'p3', client: 'Stark Industries', amount: 120000, status: 'Accepted', date: '2026-04-08' },
  { id: 'p4', client: 'Wayne Enterprises', amount: 38000, status: 'Rejected', date: '2026-04-07' },
  { id: 'p5', client: 'Initech', amount: 15000, status: 'Draft', date: '2026-04-14' },
  { id: 'p6', client: 'Umbrella Corp', amount: 62000, status: 'Sent', date: '2026-04-11' },
];

const total = mockProposals.length;
const totalValue = mockProposals.reduce((sum, p) => sum + p.amount, 0);
const accepted = mockProposals.filter((p) => p.status === 'Accepted').length;
const acceptanceRate = Math.round((accepted / total) * 100);

export const proposalKPIs: KPI[] = [
  { id: 'pk1', title: 'Total Proposals', value: total, change: 20.0, changeLabel: 'vs last month' },
  { id: 'pk2', title: 'Total Value', value: `$${totalValue.toLocaleString()}`, change: 18.3, changeLabel: 'vs last month' },
  { id: 'pk3', title: 'Accepted', value: accepted, change: 5.0, changeLabel: 'vs last month' },
  { id: 'pk4', title: 'Acceptance Rate', value: `${acceptanceRate}%`, change: -4.1, changeLabel: 'vs last month' },
];
