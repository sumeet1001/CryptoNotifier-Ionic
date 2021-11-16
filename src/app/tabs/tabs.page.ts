import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs = [];
  constructor() {
    this.tabs = [
      {
        name: 'Dashboard',
        route: 'home',
        icon: 'home'
      },
      {
        name: 'Cryptos',
        route: 'all-crypto-list',
        icon: 'stats-chart-outline'
      },
      {
        name: 'Profile',
        route: 'profile',
        icon: 'person-circle'
      }
    ];
  }

}
