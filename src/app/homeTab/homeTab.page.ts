import { Platform } from '@ionic/angular';
import { HomeService } from './../services/home.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

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
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private homeService: HomeService,
    private firebaseAuthentication: FirebaseAuthentication,
    private platform: Platform
  ) {
    this.user = globalService.currentUserValue;
    // this.cryptoList = this.user.userDetails.subs;
    // console.log(this.cryptoList);
    // firebaseAuthentication.verifyPhoneNumber('+918882023249', 30).then( res => {

    // });

  }
  ionViewWillEnter(){
    console.log(this.globalService.getSubs);
    this.globalService.backButtonSub();
  }
  ionViewWillLeave(){
    this.globalService.bacButtonUnsub();
  }
  ngOnInit() {
    // console.log(this.testGroup)
    // change this for website
    this.pushNotifications();
    this.getSubsList();
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
    if (this.globalService.getSubs.subs && Object.keys(this.globalService.getSubs.subs).length) {
      this.subs = this.globalService.getSubs.subs;
    } else {
      this.homeService.getSubsList().subscribe( (res: any) => {
        this.globalService.setSubs(res.subs || {});
        console.log(res);
        this.subs = res.subs;
      }, err => {
        console.log(err);
      });
    }
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
