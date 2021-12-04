import { GlobalService } from 'src/app/services/global.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  saveDetails(body) {
    this.globalService.presentLoadingWithOptions({msg: 'Updating'});
    this.updateUser(body).subscribe( res => {
      this.globalService.dismissLoader();
    }, (error) => {
      console.log(error);
      this.globalService.dismissLoader();
    });
  }
  updateUser(body) {
    return this.http.post(`${environment.baseUrl}/update`, body);
  }

  getSubsList() {
    return this.http.get(`${environment.baseUrl}/subs-list`);
  }
}
