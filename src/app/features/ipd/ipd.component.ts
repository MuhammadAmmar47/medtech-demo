import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../core/services/patient.service';

@Component({
  selector: 'app-ipd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ipd.component.html',
  styleUrl: './ipd.component.css'
})
export class IpdComponent {
  private patientService = inject(PatientService);

  readonly ipdCount = this.patientService.ipdCount;

  readonly admittedPatients = computed(() =>
    this.patientService.patients().filter(p => p.status === 'Admitted (IPD)')
  );

  getBedNumber(index: number): string {
    return index % 2 === 0
      ? `ICU-Bed #0${index + 1}`
      : `Post-Op Ward #${101 + index}`;
  }
}
