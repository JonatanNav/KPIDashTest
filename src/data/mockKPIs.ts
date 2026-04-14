import type { KPI } from '../types/kpi';

export const mockKPIs: KPI[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$48,250',
    change: 12.5,
    changeLabel: 'vs last month',
  },
  {
    id: '2',
    title: 'Active Users',
    value: '2,420',
    change: 8.1,
    changeLabel: 'vs last month',
  },
  {
    id: '3',
    title: 'Conversion Rate',
    value: '3.24%',
    change: -2.4,
    changeLabel: 'vs last month',
  },
  {
    id: '4',
    title: 'Avg. Session Duration',
    value: '4m 32s',
    change: 5.7,
    changeLabel: 'vs last month',
  },
];
