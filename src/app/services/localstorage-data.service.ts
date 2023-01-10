import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageDataService {
  constructor(private routerObject: Router) {}

  setTokenInLocalStorage(tokenInfo: any) {
    localStorage.setItem('tokenList', tokenInfo['token']);
  }

  getTokenInLocalStorage() {
    var tempToken = localStorage.getItem('tokenList');
    return tempToken;
  }

  removeToken() {
    localStorage.removeItem('tokenList');
    localStorage.removeItem('currentUser');

  }


}
