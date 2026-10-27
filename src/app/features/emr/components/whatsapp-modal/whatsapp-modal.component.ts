import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-modal.component.html',
  styleUrl: './whatsapp-modal.component.css'
})
export class WhatsappModalComponent {
  @Input() messageContent: string = '';
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
