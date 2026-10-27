import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientRecord } from '../../../../shared/models/patient.model';

export interface EmrSaveEvent {
  patient: PatientRecord;
  bp: string;
  mriStatus: string;
  prescription: string;
  action: 'save' | 'print' | 'whatsapp';
}

@Component({
  selector: 'app-emr-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emr-modal.component.html',
  styleUrl: './emr-modal.component.css'
})
export class EmrModalComponent implements OnChanges {
  @Input({ required: true }) patient!: PatientRecord;
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<EmrSaveEvent>();

  editBp: string = '';
  editMri: string = '';
  editPrescription: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.editBp = this.patient.bp || '';
      this.editMri = this.patient.mriStatus || '';
      this.editPrescription = this.patient.prescription || '';
    }
  }

  onSave(action: 'save' | 'print' | 'whatsapp'): void {
    this.save.emit({
      patient: this.patient,
      bp: this.editBp,
      mriStatus: this.editMri,
      prescription: this.editPrescription,
      action
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
