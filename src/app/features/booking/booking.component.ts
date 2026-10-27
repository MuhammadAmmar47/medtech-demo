import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { CLINIC_CONFIG } from '../../core/constants/clinic.config';
import { NewBookingForm } from '../../shared/models/patient.model';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, StatCardComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  private patientService = inject(PatientService);
  readonly config = CLINIC_CONFIG;

  readonly waitingCount = this.patientService.waitingCount;
  readonly ipdCount = this.patientService.ipdCount;
  readonly completedCount = this.patientService.completedCount;

  bookingForm: NewBookingForm = {
    name: '',
    age: 35,
    phone: '',
    date: '',
    issue: '',
    painScore: 7
  };

  onSubmit(): void {
    if (!this.bookingForm.name || !this.bookingForm.phone || !this.bookingForm.date) {
      return;
    }

    this.patientService.addBooking(this.bookingForm);

    this.bookingForm = {
      name: '',
      age: 35,
      phone: '',
      date: '',
      issue: '',
      painScore: 7
    };
  }
}
