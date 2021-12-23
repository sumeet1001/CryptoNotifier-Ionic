import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HomeService } from './../services/home.service';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'profileTab.page.html',
  styleUrls: ['profileTab.page.scss']
})
export class ProfileTabPage implements OnInit{
  user;
  name;
  subs;
  about;
  constructor(
    private globalService: GlobalService,
    private homeService: HomeService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.about = [
      {
        title: 'About Developer',
        url: 'about-dev'
      },
      {
        title: 'Contact us',
        mail: 'cryptonotifier.help101@gmail.com'
      }
    ];
  }
  ionViewWillEnter() {
    this.subs = this.globalService.getSubs;
  }
  ngOnInit() {
    this.user = this.globalService.currentUserValue;
    this.name = this.user.name;
  }
  updateName() {
    const body = {
      name: this.name,
      firebaseToken: this.user.firebaseToken
    };
    console.log(body);
    this.homeService.saveDetails(body);
  }
  goto(url?) {
    if (url) {
      this.router.navigate([url]);
    }
  }
  async resetPassword() {
    const options = {
      cssClass: 'my-custom-class',
      header: 'Reset Password!!!',
      message: 'Logout and reset the password?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          role: 'logout'
        },
      ],
    };
    const alert = await this.alertController.create(options);

    await alert.present();
    const { role } = await alert.onDidDismiss();
    switch (role) {
      case 'logout':
        this.globalService.clearStorage();
        this.router.navigate(['forgot-password', {mobile: this.user.phoneNumber}]);
        break;
    }
  }
}
