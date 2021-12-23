import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CryptoList } from 'src/app/interfaces/crypto-list.interface';
import { SearchbarChangeEventDetail } from '@ionic/angular';
@Component({
  selector: 'app-all-crypto-list',
  templateUrl: './all-crypto-list.page.html',
  styleUrls: ['./all-crypto-list.page.scss'],
})
export class AllCryptoListPage implements OnInit {
  quotes;
  showPullInfo = false;
  showInfoOnce = false;
  cryptos = [];
  searchResult = [];
  allCryptos = {};
  filteredData: [CryptoList];
  currentSection = 'inr';
  loading: boolean;
  searching: boolean;
  currentSubs;
  constructor(
    private apiService: ApiService,
    private globalService: GlobalService
  ) {
    this.quotes = new Array(4);
  }

  ngOnInit() {
    this.searching = false;
    this.getCryptoList();
  }
  ionViewWillEnter(){
    this.currentSubs = this.globalService.getSubs;
    // console.log(this.currentSubs);
  }
  hideInfo() {
    setTimeout(() => {
      this.showPullInfo = false;
      this.showInfoOnce = true;
    }, 1000);
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
    if (!this.showInfoOnce) {
      setTimeout(() => {
        this.showPullInfo = true;
        this.hideInfo();
      }, 700);
    }
    // console.log(this.quotes)
  }

  segmentChanged(ev) {
    console.log(ev);
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
  search(ev) {
    // console.log(this.cryptos);
    if (ev && ev.detail.value.length > 0) {
      this.searching = true;
      const query: string = ev.detail.value;
      this.searchResult = this.cryptos.filter(item => item.crypto.includes(query.toLocaleLowerCase()));
    } else {
      this.searching = false;
    }
  }
  doRefresh(event) {
    event.target.complete();
    this.getCryptoList();
  }
}
