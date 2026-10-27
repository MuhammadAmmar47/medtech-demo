import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRecord } from '../../../../shared/models/patient.model';
import { CLINIC_CONFIG } from '../../../../core/constants/clinic.config';

@Component({
  selector: 'app-print-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-modal.component.html',
  styleUrl: './print-modal.component.css'
})
export class PrintModalComponent {
  @Input() patient: PatientRecord | null = null;
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  readonly config = CLINIC_CONFIG;

  onClose(): void {
    this.close.emit();
  }

  print(): void {
    window.print();
  }
}
