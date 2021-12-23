import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router,
    private globalService: GlobalService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.globalService.currentUserValue && this.globalService.currentUserValue.token || null;
    if (token) {
      this.router.navigate(['tabs/home']);
      return false;
    }
    return true;
  }
}
