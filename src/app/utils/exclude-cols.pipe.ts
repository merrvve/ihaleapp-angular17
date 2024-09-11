import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeCols',
  standalone: true,
})
export class ExcludeColsPipe implements PipeTransform {
  transform(value: any[], excludeFirst: number, excludeLast: number): any[] {
    if (!value || value.length <= excludeFirst + excludeLast) {
      return [];
    }
    return value.slice(excludeFirst, value.length - excludeLast);
  }
}
