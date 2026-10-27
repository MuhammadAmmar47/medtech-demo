import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../core/services/patient.service';
import { BillingService } from '../../core/services/billing.service';
import { PatientRecord } from '../../shared/models/patient.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { CurrencyPkrPipe } from '../../shared/pipes/currency-pkr.pipe';
import { BillEditModalComponent } from './components/bill-edit-modal/bill-edit-modal.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    CurrencyPkrPipe,
    BillEditModalComponent
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  private patientService = inject(PatientService);
  private billingService = inject(BillingService);

  readonly patients = this.patientService.patients;
  readonly totalRevenue = this.billingService.totalRevenue;
  readonly paidInvoicesCount = this.billingService.paidInvoicesCount;

  isBillModalOpen = false;
  selectedBillPatient: PatientRecord | null = null;

  openEditBillModal(patient: PatientRecord): void {
    this.selectedBillPatient = patient;
    this.isBillModalOpen = true;
  }

  closeEditBillModal(): void {
    this.isBillModalOpen = false;
    this.selectedBillPatient = null;
  }

  saveBillAmount(event: { patientId: number; amount: number }): void {
    this.billingService.updateInvoice(event.patientId, event.amount);
    this.closeEditBillModal();
  }
}
