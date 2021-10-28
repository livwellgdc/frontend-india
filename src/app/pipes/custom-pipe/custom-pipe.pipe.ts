import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customPipe'
})
export class CustomPipe implements PipeTransform {

  transform(date: Date | number, format: string = 'h:mm a'): string {
    return new DatePipe('en-US').transform(date, format);
  }

}
