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
  cryptos: [CryptoList];
  quotes;
  filteredData: [CryptoList];
  currentSection;
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
    console.log(this.currentSubs);
    this.getCryptoList();
  }
  getCryptoList() {
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
    this.currentSection = this.quotes[1];
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
  addSubscription(item: CryptoList) {
    // this.globalService.presentLoadingWithOptions({msg: 'Adding Subscription'});
    if (this.currentSubs[item.crypto]) {
      this.globalService.showToast({msg: 'Already subscribed'});
      return;
    }
    const currentCrypto = {
      crypto: item.crypto,
      min: 0,
      max: 0,
      active: false
    };
    const body = {
      subs: {...this.currentSubs}
    };
    body.subs[item.crypto] = currentCrypto;
    this.apiService.updateSubs(body).subscribe( res => {
      // this.globalService.dismissLoader();
      this.globalService.setSubs(body);
      this.currentSubs = body.subs;
      this.globalService.showToast({msg: 'Added successfully'});
    }, err => {
      // this.globalService.dismissLoader();
    // this.globalService.showToast({msg: 'Something went wrong'});
      console.log(err);
    });
  }
}
