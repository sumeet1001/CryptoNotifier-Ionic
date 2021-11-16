import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CryptoList } from 'src/app/interfaces/crypto-list.interface';
@Component({
  selector: 'app-all-crypto-list',
  templateUrl: './all-crypto-list.page.html',
  styleUrls: ['./all-crypto-list.page.scss'],
})
export class AllCryptoListPage implements OnInit {
  cryptos: [CryptoList];
  quotes;
  filteredData: [CryptoList];
  currentSection;
  loading: boolean;
  constructor(
    private apiService: ApiService
  ) {
    this.quotes = new Array(4);
  }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.getCryptoList();
  }
  getCryptoList() {
    this.loading = true;
    this.apiService.getCryptoList().subscribe((res: any) => {
      this.cryptos = res.markets;
      this.getUniqueQuotes(res.markets);
    }, err => {
      console.log(err);
    });
  }

  getUniqueQuotes(arr: []) {
    const allQuote = [];
    arr.forEach((item: CryptoList) => {
      allQuote.push(item.quoteMarket);
    });
    this.quotes = [... new Set(allQuote)];
    this.currentSection = this.quotes[0];
    this.loading = false;
    // console.log(this.quotes)
  }
  segmentChanged(ev) {
    console.log(this.currentSection);
    this.currentSection = ev.target.value;
    // this.cryptos ;
  }
  getCurrencyType(type) {
    let filter;
    switch (type) {
      case 'inr':
        filter = 'INR';
        break;
      case 'usdt':
        filter = 'USD';
        break;
      default:
        filter = ' ';
        break;
    }
    return filter;
  }
}
