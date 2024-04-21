import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(number: string): string {
    if (number) {
      const areaCode = number.slice(0, 2);
      const extraDigit = number.slice(2, 3);
      const firstPart = number.slice(3, 7);
      const secondPart = number.slice(7);
      return `(${areaCode}) ${extraDigit} ${firstPart}-${secondPart}`;
    } else {
      return number;
    };
  };
}
