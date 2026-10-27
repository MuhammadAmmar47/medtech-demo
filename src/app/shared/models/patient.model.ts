export type PatientStatus = 'Waiting' | 'In Consultation' | 'Admitted (IPD)' | 'Completed';

export interface PatientRecord {
  id: number;
  name: string;
  age: number;
  phone: string;
  date: string;
  issue: string;
  painScore: number;
  status: PatientStatus;
  bp: string;
  mriStatus: string;
  prescription: string;
  billAmount: number;
  aiPrediction?: string;
}

export interface NewBookingForm {
  name: string;
  age: number;
  phone: string;
  date: string;
  issue: string;
  painScore: number;
}
