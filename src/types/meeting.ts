export interface Meeting {
  id: string;
  client: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  type: 'Discovery' | 'Demo' | 'Follow-up' | 'Closing';
}
