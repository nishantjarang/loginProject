import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SellerapiService {
  registerData: any;
  registerSave: any = false;
  userIdInformation: any;
  baseUrl = 'https://shop-api.ngminds.com';
  limit: any = 8;
  page: any = 1;
  name: any = '';

  profileAvailable: any = false;

  constructor(
    private httpObject: HttpClient
  ) {}

  get(normalUrl: any) {
    return this.httpObject.get(`${this.baseUrl}${normalUrl}`);
  }

  patch(normalUrl: any, payload: object) {
    return this.httpObject.patch(`${this.baseUrl}${normalUrl}`, payload);
  }

  post(normalUrl: string, payload: object) {
    return this.httpObject.post(`${this.baseUrl}${normalUrl}`, payload);
  }

  delete(normalUrl: any) {
    return this.httpObject.delete(`${this.baseUrl}${normalUrl}`);
  }

  // put(normalUrl: any, payload: object) {
  //   return this.httpObject.put(`${this.baseUrl}${normalUrl}`, payload);
  // }
}
