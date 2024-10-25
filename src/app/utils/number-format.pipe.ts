import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value === 'number') {
      return value.toLocaleString('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }
    return value;
  }

}
