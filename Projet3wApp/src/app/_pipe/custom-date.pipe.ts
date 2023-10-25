import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(publishedAt: string): string|null {
    if (!publishedAt) return publishedAt;

    // Convert the string to a Date object
    const date = new Date(publishedAt);
    const formattedDate = new DatePipe('fr').transform(date, 'medium');

    return formattedDate;
  }

}
