import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  mobile;
  verified;
  resetPasswordForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('')
    // confirmPassword: new FormControl('', Validators.required)
  });
  inputs = [
    {
      label: 'Mobile Number',
      type: 'number',
      formControl: 'phoneNumber',
      otpVerified: true
    },
    {
      label: 'New Password',
      type: 'password',
      formControl: 'password',
      otpVerified: false
    }
  ];
  constructor(
    private router: Router,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private globalService: GlobalService
  ) { }

  ionViewWillEnter() {
    this.mobile = this.activatedRoute.snapshot.paramMap.get('mobile');
    this.verified = this.activatedRoute.snapshot.paramMap.get('verified');
    if (+this.verified) {
      this.inputs.forEach(item => {
        item.otpVerified = true;
      });
    }
    if (+this.mobile) {
      this.resetPasswordForm.patchValue({
        phoneNumber: +this.mobile
      });
    }
  }
  ngOnInit() {
  }
  gotoOtp() {
    this.router.navigate(['otp', {mobile: this.resetPasswordForm.value.phoneNumber, from: 'reset'}]);
  }
  async submit() {
    this.globalService.presentLoadingWithOptions({msg: 'Updating Password..'});
    const body = this.resetPasswordForm.value;
    this.apiService.updateUserPassword(body).subscribe( res => {
      this.globalService.dismissLoader();
      this.resetPasswordForm.reset();
      this.globalService.showToast({msg: 'Password Updated Please login', position: 'top'});
      this.router.navigate(['login']);
    });
  }
}
