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
    console.log(user)
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
        this.errorHandler(error);
        return throwError(error);
      })
    );
  }
  async errorHandler(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      message: `${error.error.message}`,
      buttons: [{
          text: 'Okay'
        }
      ]
    });

    await alert.present();
  }
}
