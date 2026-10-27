import { Injectable, computed, inject } from '@angular/core';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private patientService = inject(PatientService);

  readonly totalRevenue = computed(() =>
    this.patientService.patients().reduce((sum, p) => sum + (p.billAmount || 0), 0)
  );

  readonly paidInvoicesCount = computed(() =>
    this.patientService
      .patients()
      .filter(p => p.status === 'Completed' || p.status === 'Admitted (IPD)').length
  );

  updateInvoice(patientId: number, newAmount: number): void {
    this.patientService.updateBillAmount(patientId, newAmount);
  }
}
