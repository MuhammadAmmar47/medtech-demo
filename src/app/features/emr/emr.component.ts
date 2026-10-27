import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { ToastService } from '../../core/services/toast.service';
import { CLINIC_CONFIG } from '../../core/constants/clinic.config';
import { PatientRecord, PatientStatus } from '../../shared/models/patient.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { EmrModalComponent, EmrSaveEvent } from './components/emr-modal/emr-modal.component';
import { PrintModalComponent } from './components/print-modal/print-modal.component';
import { WhatsappModalComponent } from './components/whatsapp-modal/whatsapp-modal.component';

@Component({
  selector: 'app-emr',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatusBadgeComponent,
    EmrModalComponent,
    PrintModalComponent,
    WhatsappModalComponent
  ],
  templateUrl: './emr.component.html',
  styleUrl: './emr.component.css'
})
export class EmrComponent {
  private patientService = inject(PatientService);
  private toastService = inject(ToastService);
  readonly config = CLINIC_CONFIG;

  searchQuery = signal<string>('');

  readonly filteredPatients = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.patientService.patients();
    if (!query) return all;
    return all.filter(
      p => p.name.toLowerCase().includes(query) || p.phone.includes(query)
    );
  });

  isEmrModalOpen = false;
  isPrintModalOpen = false;
  isWhatsAppModalOpen = false;
  activePatient: PatientRecord | null = null;
  whatsappMessageContent = '';

  openEMR(patient: PatientRecord): void {
    this.activePatient = { ...patient };
    this.isEmrModalOpen = true;
  }

  closeEMR(): void {
    this.isEmrModalOpen = false;
  }

  callInPatient(patient: PatientRecord): void {
    this.patientService.callInPatient(patient);
  }

  updateStatus(patient: PatientRecord, status: PatientStatus): void {
    this.patientService.updateStatus(patient.id, status);
  }

  handleEmrSave(event: EmrSaveEvent): void {
    const updated: PatientRecord = {
      ...event.patient,
      bp: event.bp,
      mriStatus: event.mriStatus,
      prescription: event.prescription,
      status: 'Completed'
    };

    this.patientService.updatePatient(updated);
    this.activePatient = updated;

    switch (event.action) {
      case 'save':
        this.toastService.show(`EMR Draft saved successfully for ${updated.name}`);
        this.closeEMR();
        break;

      case 'print':
        this.closeEMR();
        this.isPrintModalOpen = true;
        break;

      case 'whatsapp':
        this.whatsappMessageContent = `${this.config.hospitalName}
${this.config.doctorName}, ${this.config.doctorQualifications}

Patient: ${updated.name}
Diagnosis: ${updated.issue}
Blood Pressure: ${updated.bp}

DIGITAL PRESCRIPTION:
${updated.prescription}

Address: ${this.config.address}
Helpline: ${this.config.helpline}`;

        this.closeEMR();
        this.isWhatsAppModalOpen = true;
        break;
    }
  }

  closePrintModal(): void {
    this.isPrintModalOpen = false;
    this.activePatient = null;
    this.toastService.show('Official BNI prescription closed.');
  }

  closeWhatsAppModal(): void {
    this.isWhatsAppModalOpen = false;
    this.toastService.show('WhatsApp digital prescription sent successfully!');
  }
}
