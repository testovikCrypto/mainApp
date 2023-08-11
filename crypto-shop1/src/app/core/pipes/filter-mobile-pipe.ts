import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMobile'
})
export class FilterMobilePipe implements PipeTransform {
  transform(items: any[], sSearchPair: string): any[] {
    if (!items) {
      return [];
    }
    if (!sSearchPair) {
      return items;
    }
    sSearchPair = sSearchPair.toLocaleLowerCase();
    return items.filter(it => {
      return it.toLocaleLowerCase().includes(sSearchPair);
    });
  }
}
