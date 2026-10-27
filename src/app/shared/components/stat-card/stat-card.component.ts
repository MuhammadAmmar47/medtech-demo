import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [style.border-left-color]="borderColor">
      <span class="stat-card__label">{{ label }}</span>
      <h3 class="stat-card__value" [style.color]="valueColor">{{ value }}</h3>
    </div>
  `,
  styles: [`
    .stat-card {
      background: var(--surface-card, #ffffff);
      padding: 1.5rem;
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
      border-left: 4px solid var(--color-primary, #0d9488);
    }
    .stat-card__label {
      color: var(--text-muted, #64748b);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: block;
    }
    .stat-card__value {
      margin: 0.5rem 0 0 0;
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.2;
    }
  `]
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() borderColor: string = '#0d9488';
  @Input() valueColor: string = '#0d9488';
}
