import { CurrencySignPipe } from './currency-sign.pipe';

describe('CurrencySignPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencySignPipe();
    expect(pipe).toBeTruthy();
  });
});
