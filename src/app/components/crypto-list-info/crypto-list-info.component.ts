import { ApiService } from './../../services/api.service';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CryptoList } from 'src/app/interfaces/crypto-list.interface';

@Component({
  selector: 'app-crypto-list-info',
  templateUrl: './crypto-list-info.component.html',
  styleUrls: ['./crypto-list-info.component.scss'],
})
export class CryptoListInfoComponent implements OnInit {
  @Input() currentSection;
  @Input() currentSubs;
  @Input() type;
  @Input() set cryptos(arr) {
    this.paginatedCrypto = [];
    this.allCryptos = arr;
    this.setPagination();
  }
  paginatedCrypto = [];
  pagination = {
    limit: 10
  };
  allCryptos;
  constructor(
    private globalService: GlobalService,
    private apiService: ApiService
  ) { }
  ngOnInit() {
    // b = b.concat(a.splice(0, 4))
    this.setPagination();
  }
  setPagination() {
    this.paginatedCrypto = this.paginatedCrypto.concat(this.allCryptos.splice(0, this.pagination.limit));
    // console.log(this.paginatedCrypto);
    // console.log(this.allCryptos);
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
      active: false,
      quoteMarket: item.quoteMarket,
      cryptoName: item.cryptoName
    };
    const body = {
      subs: {...this.currentSubs}
    };
    body.subs[item.cryptoName] = currentCrypto;
    this.apiService.updateSubs(body).subscribe( res => {
      // this.globalService.dismissLoader();
      this.globalService.setSubs(body.subs);
      this.currentSubs = body.subs;
      this.globalService.showToast({msg: 'Added successfully'});
    }, err => {
      // this.globalService.dismissLoader();
    // this.globalService.showToast({msg: 'Something went wrong'});
      console.log(err);
    });
  }
  loadData(ev) {
    ev.target.complete();
    this.setPagination();
    if (this.allCryptos.length === 0) {
      ev.target.disabled = true;
    }
  }
}
