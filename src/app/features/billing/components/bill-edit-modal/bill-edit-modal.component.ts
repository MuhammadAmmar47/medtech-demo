import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientRecord } from '../../../../shared/models/patient.model';

@Component({
  selector: 'app-bill-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bill-edit-modal.component.html',
  styleUrl: './bill-edit-modal.component.css'
})
export class BillEditModalComponent implements OnChanges {
  @Input() patient: PatientRecord | null = null;
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ patientId: number; amount: number }>();

  editAmount: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.editAmount = this.patient.billAmount || 0;
    }
  }

  onSave(): void {
    if (this.patient && this.editAmount >= 0) {
      this.save.emit({
        patientId: this.patient.id,
        amount: this.editAmount
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
