import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySign'
})
export class CurrencySignPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
