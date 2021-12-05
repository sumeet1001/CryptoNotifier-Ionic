import { Platform } from '@ionic/angular';
import { HomeService } from './../services/home.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'homeTab.page.html',
  styleUrls: ['homeTab.page.scss']
})
export class HomeTabPage implements OnInit {
  subs = {};
  user;
  testGroup: FormGroup;
  fcmToken: any;
  loading = true;
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private homeService: HomeService,
    private platform: Platform
  ) {
    this.user = globalService.currentUserValue;
  }
  ionViewWillEnter(){
    console.log(this.globalService.getSubs);
    this.globalService.backButtonSub();
    this.getSubsList();
  }
  ionViewWillLeave(){
    this.globalService.bacButtonUnsub();
  }
  ngOnInit() {
    // console.log(this.testGroup)
    // change this for website
    this.pushNotifications();
  }

  pushNotifications() {
    if (this.platform.is('capacitor')) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
      PushNotifications.addListener('registration',
        (token: Token) => {
          console.log('Push registration success, token: ' + token.value);
          this.fcmToken = token.value;
        }
      );
    }
  }

  getSubsList() {
    if (this.globalService.getSubs && this.globalService.getSubs.subs && Object.keys(this.globalService.getSubs.subs).length) {
      this.subs = this.globalService.getSubs.subs;
      this.loading = false;
    } else {
      this.homeService.getSubsList().subscribe( (res: any) => {
        this.globalService.setSubs(res.subs || {});
        for (const item of Object.keys(res.subs)) {
          res.subs[item].expanded = false;
        }
        console.log(res);
        this.subs = res.subs;
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
    }
  }
  expand(item) {
    item.expanded = !item.expanded;
    console.log(item);
  }
  // updateObj(ev, id, field) {
  //   this.cryptoList.forEach(item => {
  //     // eslint-disable-next-line no-underscore-dangle
  //     if (item._id === id) {
  //       if (ev.detail.value === 'on') {
  //         item[field] = ev.detail.checked;
  //       } else {
  //         item[field] = parseFloat(ev.detail.value);
  //       }
  //     }
  //  });
  // }

  // saveDetails() {
  //   const body = {
  //     firebaseToken: this.fcmToken,
  //     subs: this.cryptoList
  //   };
  //   this.homeService.saveDetails(body);
  // }
}
