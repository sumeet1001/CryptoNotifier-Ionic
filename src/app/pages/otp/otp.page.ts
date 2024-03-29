import { ApiService } from './../../services/api.service';
import { AlertController } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  mobile;
  verificationId;
  otp = '';
  userId;
  btnText = 'Verify';
  from: string;
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private firebaseAuthentication: FirebaseAuthentication,
    private alertController: AlertController,
    private apiService: ApiService
  ) {

  }
  ionViewWillEnter(){
   this.mobile = this.activatedroute.snapshot.paramMap.get('mobile');
   this.from = this.activatedroute.snapshot.paramMap.get('from') || null;
  //  this.userId = this.activatedroute.snapshot.paramMap.get('user');
   if (!this.mobile || this.mobile && this.mobile.length === 0) {
     this.globalService.showToast({msg: 'something went!!'});
     this.router.navigateByUrl('login');
     return;
   } else {
    this.sendOtp();
   }
  }
  ngOnInit() {
  }
  sendOtp() {
    this.globalService.showToast({msg: 'Sending Otp'});
    this.firebaseAuthentication.verifyPhoneNumber(`+91 ${this.mobile}`, 30).then( res => {
      // console.log(res);
      this.verificationId = res;
      this.globalService.showToast({msg: 'Otp sent'});
    }).catch(err => {
      this.presentAlert(err);
    });
  }
  onOtpChange(ev) {
    this.otp = ev;
  }
  submit() {
    this.btnText = 'verifying...';
    if (this.otp && this.otp.length === 6) {
      this.firebaseAuthentication.signInWithVerificationId(this.verificationId, this.otp).then(res => {
        this.btnText = 'Verified';
        if (this.from && this.from === 'reset') {

        } else {
          this.globalService.showToast({msg: 'Number Verified'});
        }
        this.markUserVerified();
      }).catch( err => {
        this.btnText = 'Verify';
        this.presentAlert(err);
      });
    }
  }
  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Failed',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  markUserVerified() {
    if (this.from && this.from === 'reset') {
        const config = ['forgot-password', {mobile: this.mobile, verified: 1}];
        this.router.navigate(config);
    } else {
      const body = {
        phoneNumber: this.mobile
      };
      this.apiService.updateUserVerified(body).subscribe( res => {
        let config = [];
        switch (this.from) {
          case 'dashboard':
            config = ['tabs/home'];
            break;
          default:
            config = ['login'];
            break;
        }
        this.router.navigate(config);
      }, err => {
        console.log(err);
      });
    }
  }
  gotoLogin() {
    this.router.navigateByUrl('login');
  }
}
