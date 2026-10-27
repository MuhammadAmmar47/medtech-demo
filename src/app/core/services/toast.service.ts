import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info';

export interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private stateSignal = signal<ToastState>({
    message: '',
    type: 'success',
    isVisible: false
  });

  readonly state = this.stateSignal.asReadonly();
  private timer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: ToastType = 'success', durationMs = 2500): void {
    this.hide();

    this.stateSignal.set({
      message,
      type,
      isVisible: true
    });

    this.timer = setTimeout(() => {
      this.hide();
    }, durationMs);
  }

  hide(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.stateSignal.update(state => ({ ...state, isVisible: false }));
  }
}
