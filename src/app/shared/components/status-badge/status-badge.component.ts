import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientStatus } from '../../models/patient.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [ngClass]="badgeClass">
      {{ status }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-block;
      padding: 0.3rem 0.7rem;
      border-radius: var(--radius-pill, 20px);
      font-size: 0.7rem;
      font-weight: 700;
      white-space: nowrap;
      text-transform: capitalize;
    }
    .status-waiting {
      background: var(--badge-waiting-bg, #fef3c7);
      color: var(--badge-waiting-text, #92400e);
    }
    .status-consultation {
      background: var(--badge-consultation-bg, #e0f2fe);
      color: var(--badge-consultation-text, #0369a1);
    }
    .status-ipd {
      background: var(--badge-ipd-bg, #dbeafe);
      color: var(--badge-ipd-text, #1e40af);
    }
    .status-completed {
      background: var(--badge-completed-bg, #dcfce7);
      color: var(--badge-completed-text, #166534);
    }
  `]
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: PatientStatus | string;

  get badgeClass(): string {
    switch (this.status) {
      case 'Waiting':
        return 'status-waiting';
      case 'In Consultation':
        return 'status-consultation';
      case 'Admitted (IPD)':
        return 'status-ipd';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-waiting';
    }
  }
}
