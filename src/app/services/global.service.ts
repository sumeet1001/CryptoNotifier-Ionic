import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public currentUserSubject: BehaviorSubject<any>;
  lastBack;
  buttonSub;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  toggleEye(item, toggle) {
    if(item && item.formControl === 'password') {
      toggle = !toggle;
      if (item.type === 'password')  {
        item.type = 'text';
      } else {
        item.type = 'password';
      }
    }
    return toggle;
  }
  setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }
  clearStorage() {
    this.currentUserSubject.next(null);
    localStorage.clear();
  }
  updateUserSubs(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.userDetails.subs = data.subs;
    user.firebaseToken = data.firebaseToken;
    this.setUser(user);
  }
  async presentLoadingWithOptions(options?) {
    const loading = await this.loadingController.create({
      spinner: options.type || 'crescent',
      message: options.msg || 'Loading',
      translucent: false,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
  async dismissLoader() {
    try {
      const loader = this.loadingController.getTop();
      if (loader) {
        this.loadingController.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showToast(options) {
    const toast = await this.toastController.create({
      message: options.msg || '',
      duration: options.duration || 2000,
      position: options.position || 'bottom'
    });
    toast.present();
  }
  backButtonSub() {
    this.buttonSub = this.platform.backButton.subscribe(() => {
      this.showToast({msg: 'Double tap to exit', duration: 1000});
      if (Date.now() - this.lastBack < 500) { // logic for double tap: delay of 500ms between two clicks of back button
        App.exitApp();
      }
      this.lastBack= Date.now();
    });
  }
  bacButtonUnsub() {
    this.buttonSub.unsubscribe();
  }
}