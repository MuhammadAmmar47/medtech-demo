import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'booking', pathMatch: 'full' },
  {
    path: 'booking',
    loadComponent: () =>
      import('./features/booking/booking.component').then(m => m.BookingComponent),
    title: 'Patient Booking | MedTech BNI'
  },
  {
    path: 'emr',
    loadComponent: () =>
      import('./features/emr/emr.component').then(m => m.EmrComponent),
    title: 'Doctor EMR & Queue | MedTech BNI'
  },
  {
    path: 'ipd',
    loadComponent: () =>
      import('./features/ipd/ipd.component').then(m => m.IpdComponent),
    title: 'IPD / Wards | MedTech BNI'
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./features/billing/billing.component').then(m => m.BillingComponent),
    title: 'Billing & Finance | MedTech BNI'
  },
  { path: '**', redirectTo: 'booking' }
];
