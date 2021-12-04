import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() page = '';
  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {}
  logout() {
    this.globalService.clearStorage();
    this.router.navigateByUrl('login');
  }
}
