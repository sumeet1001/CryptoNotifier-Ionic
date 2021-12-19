import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CryptoList } from 'src/app/interfaces/crypto-list.interface';
@Component({
  selector: 'app-all-crypto-list',
  templateUrl: './all-crypto-list.page.html',
  styleUrls: ['./all-crypto-list.page.scss'],
})
export class AllCryptoListPage implements OnInit {
  quotes;
  allCryptos = {};
  filteredData: [CryptoList];
  currentSection = 'inr';
  loading: boolean;
  currentSubs;
  constructor(
    private apiService: ApiService,
    private globalService: GlobalService
  ) {
    this.quotes = new Array(4);
  }

  ngOnInit() {
    this.loading = true;
  }
  ionViewWillEnter(){
    this.currentSubs = this.globalService.getSubs;
    // console.log(this.currentSubs);
    this.getCryptoList();
  }
  getCryptoList() {
    this.loading = true;
    this.apiService.getCryptoList().subscribe((res: any) => {
      this.getUniqueQuotes(res.markets);
    }, err => {
      console.log(err);
    });
  }

  getUniqueQuotes(arr) {
    const allQuote = [];
    arr.forEach((item: CryptoList) => {
      allQuote.push(item.quoteMarket);
    });
    this.quotes = [... new Set(allQuote)];
    this.quotes.forEach(element => {
      this.allCryptos[element] = arr.filter(crypto => element === crypto.quoteMarket);
    });
    // console.log(this.allCryptos);
    // this.currentSection = this.quotes[1];
    this.loading = false;
    // console.log(this.quotes)
  }

  segmentChanged(ev) {
    // console.log(this.currentSection);
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
