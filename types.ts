
export enum ClaimStatus {
  UNVERIFIED = 'قيد التحقق',
  INCOMPLETE = 'ناقص',
  CONTRADICTORY = 'متناقض',
  VERIFIED = 'موثق',
  DEBUNKED = 'زائف'
}

export interface TimelineEvent {
  id: string;
  date: string;
  description: string;
  source?: string;
}

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  confidence: number;
  extractedAt: string;
  timeline: TimelineEvent[];
  notes: string;
}

export type AppView = 'public' | 'workspace';
