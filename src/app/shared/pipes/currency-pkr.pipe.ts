import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPkr',
  standalone: true
})
export class CurrencyPkrPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return 'Rs. 0';
    }
    return `Rs. ${new Intl.NumberFormat('en-PK').format(value)}`;
  }
}
