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
        name: 'Alerts',
        route: 'home',
        icon: 'notifications'
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
