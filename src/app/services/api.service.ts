import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getCryptoList() {
    return this.http.get(`${environment.baseUrl}/crypto-list`);
  }
  updateSubs(body) {
    return this.http.put(`${environment.baseUrl}/update-subscription`, body);
  }
  updateUserVerified(body) {
    return this.http.put(`${environment.baseUrl}/update-verified`, body);
  }
}
