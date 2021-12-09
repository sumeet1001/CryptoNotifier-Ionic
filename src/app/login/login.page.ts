import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { GlobalService } from '../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  lastBack;
  buttonSub;
  showPass = false;
  loginForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
    // confirmPassword: new FormControl('', Validators.required)
  });
  loginInputs = [
    {
      label: 'Mobile Number',
      type: 'number',
      formControl: 'phoneNumber'
    },
    {
      label: 'Password',
      type: 'password',
      formControl: 'password'
    }
  ];
  constructor(
    private globalService: GlobalService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.globalService.clearStorage();
  }
  ionViewWillEnter(){
    this.globalService.backButtonSub();

  }
  ionViewWillLeave(){
    this.globalService.bacButtonUnsub();
  }
  login() {
    this.globalService.presentLoadingWithOptions({msg: 'Logging in'});
    this.loginService.login(this.loginForm.value).subscribe( res => {
      this.globalService.setUser(res);
      this.loginForm.reset();
      this.globalService.dismissLoader();
      this.router.navigateByUrl('tabs/home');
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  goto() {
    this.loginForm.reset();
    this.router.navigateByUrl('signup');
  }
  handleClick(item) {
    this.showPass = this.globalService.toggleEye(item, this.showPass);
  }
}
