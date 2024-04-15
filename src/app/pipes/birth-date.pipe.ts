import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDate',
  standalone: true
})
export class BirthDatePipe implements PipeTransform {

  transform(value: string): string {
    return value[0]+value[1]+"/"+value[2]+value[3]+"/"+value[4]+value[5]+value[6]+value[7];
  }

}
