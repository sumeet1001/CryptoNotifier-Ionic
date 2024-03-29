import { AlertController, LoadingController } from '@ionic/angular';
import { GlobalService } from './global.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private globalService: GlobalService,
    private alertController: AlertController
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.globalService.currentUserValue;
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          'auth-token': `${user.token}`
        }
      });
    }
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.globalService.dismissLoader();
        this.errorHandler(error);
        return throwError(error);
      })
    );
  }
  async errorHandler(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      message: `${error.error.message && error.error.message.length? error.error.message : error.statusText}`,
      buttons: [{
          text: 'Okay'
        }
      ],
    });
    const presentedAlert = await alert.present();
    if (this.globalService.loadingObj) {
      this.globalService.dismissLoader();
    }
  }
}
