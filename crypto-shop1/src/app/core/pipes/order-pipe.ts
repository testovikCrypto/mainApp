import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDateTime'
})
export class OrderPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) {
      return [];
    }

    return items.sort((a: any, b: any) => {
      return new Date(a.dealOpened) < new Date(b.dealOpened) ? 1 : -1;
    })
  }
}
