import { ApiService } from './../services/api.service';
import { Platform, AlertController } from '@ionic/angular';
import { HomeService } from './../services/home.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
    private homeService: HomeService,
    private platform: Platform,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router
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
    this.checkVerifiedUser();
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
          // console.log('Push registration success, token: ' + token.value);
          this.fcmToken = token.value;
        }
      );
    }
  }

  getSubsList() {
    if (this.globalService.getSubs && this.globalService.getSubs && Object.keys(this.globalService.getSubs).length > 0) {
      this.subs = this.globalService.getSubs;
      this.loading = false;
    } else {
      this.homeService.getSubsList().subscribe( (res: any) => {
        if (res && res.subs) {
          this.globalService.setSubs(res.subs || {});
          for (const item of Object.keys(res.subs)) {
            res.subs[item].expanded = false;
          }
          console.log(res);
          this.subs = res.subs;
        }
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
    }
  }
  expand(key) {
    this.subs[key].expanded = !this.subs[key].expanded;
  }
  updateObj(ev, key, field) {
    if (ev.detail.value === 'on') {
      this.subs[key][field] = ev.detail.checked;
      this.expand(key);
    } else {
      this.subs[key][field] = parseFloat(ev.detail.value || 0);
    }
  }

  saveDetails(remove?, key?) {
    const body = {
      subs: {...this.subs}
    };
    if (remove) {
      delete body.subs[key];
    }
    this.apiService.updateSubs(body).subscribe(res => {
      if (remove) {
        delete(this.subs[key]);
      }
      this.globalService.showToast({msg: 'updated'});
      console.log(this.subs);
    });
  }
  checkVerifiedUser() {
    if (!this.user.verified) {
      const options = {
        cssClass: 'my-custom-class',
        header: 'Verification pending ',
        message: 'Mobile number not verified',
        buttons: [
          {
            text: 'Maybe Later',
            role: 'cancel'
          },
          {
            text: 'Verify Now',
            role: 'verify'
          },
        ],
      };
      this.alertConfirm(options);
    }
  }
  async alertConfirm(options) {
    const alert = await this.alertController.create(options);

    await alert.present();
    const { role } = await alert.onDidDismiss();
    switch (role) {
      case 'verify':
        this.router.navigate(['otp', {mobile: this.user.phoneNumber}]);
        break;
      case 'yes':
        this.saveDetails(true, options.key);
        break;
    }
  }
  removeSub(key: string) {
    const options = {
      cssClass: 'my-custom-class',
      header: `Remove ${key.toUpperCase()}`,
      message: `Are you sure you want to remove ${key}`,
      buttons: [
        {
          text: 'Go back',
          role: 'cancel'
        },
        {
          text: 'Yes',
          role: 'yes'
        },
      ],
      key
    };
    this.alertConfirm(options);
  }
}
