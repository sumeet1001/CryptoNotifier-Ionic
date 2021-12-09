import { GlobalService } from 'src/app/services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() page = '';
  constructor(
    private globalService: GlobalService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}
  logout() {
    this.globalService.clearStorage();
    this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
  }
}
