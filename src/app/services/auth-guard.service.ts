import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private globalService: GlobalService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.globalService.currentUserValue && this.globalService.currentUserValue.token || null;
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
