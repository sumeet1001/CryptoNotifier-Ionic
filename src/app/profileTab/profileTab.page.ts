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
  constructor(
    private globalService: GlobalService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.user = this.globalService.currentUserValue.userDetails;
    this.name = this.user.name;
    console.log(this.user);
  }
  updateName() {
    const body = {
      firebaseToken: this.user.firebaseToken,
      name: this.name,
      subs: this.user.subs
    };
    this.homeService.saveDetails(body);
  }
}
