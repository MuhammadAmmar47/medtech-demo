import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';
interface PatientRecord {
  id: number;
  name: string;
  age: number;
  phone: string;
  date: string;
  issue: string;
  painScore: number;
  status: 'Waiting' | 'In Consultation' | 'Admitted (IPD)' | 'Completed';
  bp: string;
  mriStatus: string;
  prescription: string;
  billAmount: number;
  aiPrediction?: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor(private ngZone: NgZone) {}
 activeTab: 'overview' | 'patients' | 'ipd' | 'billing' = 'overview';
  
  toastMessage: string = '';
  toastType: 'success' | 'info' = 'success';
  isToastVisible: boolean = false;

  lastToken: number = 0;
  searchQuery: string = '';

  newBooking = {
    name: '',
    age: 35,
    phone: '',
    date: '',
    issue: '',
    painScore: 7
  };

  patients: PatientRecord[] = [
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

  isModalOpen: boolean = false;
  activePatient: PatientRecord | null = null;
  editPrescription: string = '';
  editMri: string = '';
  editBp: string = '';
  
  isWhatsAppModalOpen: boolean = false;
  whatsappMessageContent: string = '';
  isPrintModalOpen: boolean = false;

  private toastTimer: any = null; // Timer reference ko track karne ke liye

  hideToast() {
    this.isToastVisible = false;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  showToast(message: string, type: 'success' | 'info' = 'success') {
    this.hideToast(); // Pehle purana clear karein

    this.ngZone.run(() => {
      this.toastMessage = message;
      this.toastType = type;
      this.isToastVisible = true;

      this.toastTimer = setTimeout(() => {
        this.ngZone.run(() => {
          this.isToastVisible = false;
        });
      }, 1000);
    });
  }

  switchTab(tab: 'overview' | 'patients' | 'ipd' | 'billing') {
    this.activeTab = tab;
  }

  bookAppointment() {
    if (!this.newBooking.name || !this.newBooking.phone || !this.newBooking.date) return;

    const token = Math.floor(100 + Math.random() * 900);
    this.lastToken = token;

    this.patients.unshift({
      id: token,
      name: this.newBooking.name,
      age: this.newBooking.age,
      phone: this.newBooking.phone,
      date: this.newBooking.date,
      issue: this.newBooking.issue || 'General Neurospine Evaluation',
      painScore: this.newBooking.painScore,
      status: 'Waiting',
      bp: '120/80',
      mriStatus: 'Pending Review',
      prescription: '',
      billAmount: 5000,
      aiPrediction: 'AI analysis pending complete neuro examination.'
    });

    this.showToast(`Appointment booked successfully! Token #${token} generated.`);
    this.newBooking = { name: '', age: 35, phone: '', date: '', issue: '', painScore: 7 };
  }

  get filteredPatients() {
    if (!this.searchQuery) return this.patients;
    return this.patients.filter(p => 
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      p.phone.includes(this.searchQuery)
    );
  }

  callInPatient(patient: PatientRecord) {
    patient.status = 'In Consultation';
    this.showToast(`Patient ${patient.name} called into the chamber.`, 'info');
  }

  openEMR(patient: PatientRecord) {
    this.activePatient = patient;
    this.editPrescription = patient.prescription;
    this.editMri = patient.mriStatus;
    this.editBp = patient.bp;
    this.isModalOpen = true;
  }

  closeEMR() {
    this.isModalOpen = false;
    
    // Don't nullify activePatient immediately here if print modal needs it
  }

 

  updateStatus(patient: PatientRecord, status: 'Waiting' | 'In Consultation' | 'Admitted (IPD)' | 'Completed') {
    patient.status = status;
    this.showToast(`Patient status updated to ${status}.`, 'info');
  }

  // Common data synchronization helper
  private syncActivePatientData() {
    if (this.activePatient) {
      this.activePatient.prescription = this.editPrescription;
      this.activePatient.mriStatus = this.editMri;
      this.activePatient.bp = this.editBp;
      this.activePatient.status = 'Completed';
    }
  }

  // 1. Save Only (Draft)
  saveDraft() {
    this.syncActivePatientData();
    this.showToast(`EMR Draft saved successfully for ${this.activePatient?.name}`);
    this.closeEMR();
  }

  // 2. Save & Print / PDF
 // 2. Save & Print / PDF
  saveAndPrint() {
    this.syncActivePatientData();
    if (this.activePatient) {
      // Create a direct reference or keep activePatient locked for the print view
      this.isPrintModalOpen = true;
      this.closeEMR(); // Close EMR but retain activePatient safely
    }
  }

  

  // 3. Save & WhatsApp
  saveAndWhatsApp() {
    this.syncActivePatientData();
    if (this.activePatient) {
      this.whatsappMessageContent = 
`BASHIR NEUROSPINE INSTITUTE (BNI)
Dr. Salman, MBBS, FCPS (Consultant Neurosurgeon)

Patient: ${this.activePatient.name}
Diagnosis: ${this.activePatient.issue}
Blood Pressure: ${this.activePatient.bp}

DIGITAL PRESCRIPTION:
${this.editPrescription}

Address: 18 Shadman Jail Road, Lahore
Helpline: 042-111-BNI-999`;
    }
    this.closeEMR();
    this.isWhatsAppModalOpen = true;
  }

  closeWhatsAppModal() {
    this.isWhatsAppModalOpen = false;
    this.showToast(`WhatsApp digital prescription sent successfully!`);
  }

   closePrintModal() {
    this.isPrintModalOpen = false;
    this.activePatient = null; // Clear here after printing is done
    this.showToast(`Official BNI prescription closed.`);
  }

  triggerBrowserPrint() {
    window.print();
  }

  get waitingCount() { return this.patients.filter(p => p.status === 'Waiting').length; }
  get ipdCount() { return this.patients.filter(p => p.status === 'Admitted (IPD)').length; }
  get completedCount() { return this.patients.filter(p => p.status === 'Completed').length; }
}
