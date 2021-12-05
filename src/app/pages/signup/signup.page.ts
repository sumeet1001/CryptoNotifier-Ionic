import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { GlobalService } from 'src/app/services/global.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firebaseToken: new FormControl('')
  });
  fcmToken: string;
  signupInputs = [
    {
      label: 'Name',
      type: 'string',
      formControl: 'name'
    },
    {
      label: 'Mobile',
      type: 'number',
      formControl: 'phoneNumber'
    },
    {
      label: 'Password',
      type: 'password',
      formControl: 'password'
    }
  ];
  showPass = false;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.globalService.clearStorage();
  }

  ngOnInit() {
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
  signup() {
    if (this.signupForm.valid) {
      this.globalService.presentLoadingWithOptions({msg: 'Signing up'});
      this.signupForm.patchValue({
        firebaseToken: this.fcmToken
      });
      this.signupForm.disable();
        this.signupService.signup(this.signupForm.value).subscribe((res: any) => {
          this.signupForm.enable();
          this.signupForm.reset();
          this.globalService.dismissLoader();
          this.router.navigate(['otp', {mobile: res && res.userDetails && res.userDetails.phoneNumber, user: res.userDetails.userId}]);
          // this.router.navigate(['login']);
        }, (err) => {
          console.log(err);
          this.globalService.dismissLoader();
          this.signupForm.enable();
        });
      }
  }
  handleClick(item) {
    this.showPass = this.globalService.toggleEye(item, this.showPass);
  }
}
