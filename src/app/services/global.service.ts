import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public currentUserSubject: BehaviorSubject<any>;
  public subs: BehaviorSubject<any>;
  lastBack;
  buttonSub;
  loadingObj = null;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.subs = new BehaviorSubject<any>({});
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
    this.subs.next(null);
    localStorage.clear();
  }
  setSubs(value) {
    this.subs.next(null);
    this.subs.next(value);
  }
  public get getSubs() {
    return this.subs.value;
  }
  // updateUserSubs(data) {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   user.userDetails.subs = data.subs;
  //   user.firebaseToken = data.firebaseToken;
  //   this.setUser(user);
  // }
  async presentLoadingWithOptions(options?) {
    this.loadingObj = await this.loadingController.create({
      spinner: options.type || 'crescent',
      message: options.msg || 'Loading',
      translucent: false,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await this.loadingObj.present();
  }
  async dismissLoader() {
    try {
      // loader = this.loadingController.getTop();
      // console.log('loader', loader);
      if (this.loadingObj) {
        this.loadingController.dismiss();
        this.loadingObj = null;
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
