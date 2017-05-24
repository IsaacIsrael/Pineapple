import { Pipe, PipeTransform } from '@angular/core';

import * as dateFns from 'date-fns';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return dateFns.format(value,"YYYY-MM-DD");
  }

}
