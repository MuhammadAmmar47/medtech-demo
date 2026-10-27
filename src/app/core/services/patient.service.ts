import { Injectable, computed, signal, inject } from '@angular/core';
import { PatientRecord, PatientStatus, NewBookingForm } from '../../shared/models/patient.model';
import { ToastService } from './toast.service';
import { CLINIC_CONFIG } from '../constants/clinic.config';

const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 501,
    name: 'Muhammad Usman',
    age: 48,
    phone: '0321-9876543',
    date: '2026-10-29',
    issue: 'L4-L5 Disc Herniation with severe sciatica pain radiating to left leg',
    painScore: 8,
    status: 'Waiting',
    bp: '130/85',
    mriStatus: 'MRI Lumbar Spine: Disc bulge noted at L4-L5',
    prescription: '',
    billAmount: 5000,
    aiPrediction: '92% Probability of L4-L5 Radiculopathy. Recommended: MRI Lumbar Spine & Targeted Epidural Injection.'
  },
  {
    id: 502,
    name: 'Ayesha Tariq',
    age: 42,
    phone: '0333-5544332',
    date: '2026-10-29',
    issue: 'Cervical Spondylosis with bilateral hand numbness & neck stiffness',
    painScore: 6,
    status: 'Admitted (IPD)',
    bp: '120/80',
    mriStatus: 'MRI Cervical Spine completed',
    prescription: 'Tab Pregabalin 75mg BD, Cap Nurobion OD',
    billAmount: 25000,
    aiPrediction: '85% Probability of Cervical Spondylotic Myelopathy. Monitor vitals in IPD ward.'
  },
  {
    id: 503,
    name: 'Tariq Mahmood',
    age: 55,
    phone: '0300-4455667',
    date: '2026-10-29',
    issue: 'Lumbar Spinal Stenosis with neurogenic claudication',
    painScore: 9,
    status: 'Waiting',
    bp: '140/90',
    mriStatus: 'Pending MRI order',
    prescription: '',
    billAmount: 5000,
    aiPrediction: '96% High Severity Stenosis. Immediate neurosurgery consult required.'
  },
  {
    id: 504,
    name: 'Dr. Zeeshan Haider',
    age: 38,
    phone: '0312-7788990',
    date: '2026-10-29',
    issue: 'Acute Cervical Disc Prolapse following gym injury',
    painScore: 7,
    status: 'Waiting',
    bp: '125/82',
    mriStatus: 'MRI ordered',
    prescription: '',
    billAmount: 5000,
    aiPrediction: '78% Probability of Acute Disc Bulge. Recommend cervical collar & muscle relaxants.'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private toastService = inject(ToastService);
  private patientsSignal = signal<PatientRecord[]>(INITIAL_PATIENTS);

  readonly patients = this.patientsSignal.asReadonly();

  readonly waitingCount = computed(() =>
    this.patientsSignal().filter(p => p.status === 'Waiting').length
  );

  readonly ipdCount = computed(() =>
    this.patientsSignal().filter(p => p.status === 'Admitted (IPD)').length
  );

  readonly completedCount = computed(() =>
    this.patientsSignal().filter(p => p.status === 'Completed').length
  );

  addBooking(booking: NewBookingForm): PatientRecord {
    const token = Math.floor(100 + Math.random() * 900);
    const newPatient: PatientRecord = {
      id: token,
      name: booking.name,
      age: booking.age,
      phone: booking.phone,
      date: booking.date,
      issue: booking.issue || 'General Neurospine Evaluation',
      painScore: booking.painScore,
      status: 'Waiting',
      bp: '120/80',
      mriStatus: 'Pending Review',
      prescription: '',
      billAmount: CLINIC_CONFIG.defaultConsultationFee,
      aiPrediction: 'AI analysis pending complete neuro examination.'
    };

    this.patientsSignal.update(list => [newPatient, ...list]);
    this.toastService.show(`Appointment booked successfully! Token #${token} generated.`);
    return newPatient;
  }

  updateStatus(id: number, status: PatientStatus): void {
    let patientName = '';
    this.patientsSignal.update(list =>
      list.map(p => {
        if (p.id === id) {
          patientName = p.name;
          return { ...p, status };
        }
        return p;
      })
    );

    if (patientName) {
      this.toastService.show(`Patient ${patientName} status updated to ${status}.`, 'info');
    }
  }

  callInPatient(patient: PatientRecord): void {
    this.updateStatus(patient.id, 'In Consultation');
  }

  updatePatient(updated: PatientRecord): void {
    this.patientsSignal.update(list =>
      list.map(p => (p.id === updated.id ? { ...updated } : p))
    );
  }

  updateBillAmount(id: number, amount: number): void {
    let patientName = '';
    this.patientsSignal.update(list =>
      list.map(p => {
        if (p.id === id) {
          patientName = p.name;
          return { ...p, billAmount: amount };
        }
        return p;
      })
    );

    if (patientName) {
      this.toastService.show(`Bill updated successfully for ${patientName}!`);
    }
  }

  getPatientById(id: number): PatientRecord | undefined {
    return this.patientsSignal().find(p => p.id === id);
  }
}
