import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number, format?: any): string {
    return value > 1 ? value.toLocaleString() : value.toString();
  }
}
