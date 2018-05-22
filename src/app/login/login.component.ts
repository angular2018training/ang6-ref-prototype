import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Injectable, HostBinding } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { VARIABLES, APP_URL, PAGES } from 'app/constant';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class LoginService implements CanActivateChild {
  constructor(private router: Router) { }

  public static subject = new Subject<any>();
  public getStatus(): Observable<any> {
    return LoginService.subject.asObservable();
  }
  public login(isLogin: boolean) {
    LoginService.subject.next({ isLogin: isLogin });
  }
  public changePage(pageName: string) {
    LoginService.subject.next({ pageName: pageName });
  }
  public isLogin() {
    return localStorage.getItem(VARIABLES.ISLOGIN) == 'true';
  }
  public getUserInfo() {
    return {
      username: null,
      password: null,
      role: localStorage.getItem(VARIABLES.ROLE),
    };
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.checkPermission(state.url);
    return this.checkLogin(state) && this.checkPermission(state.url);
  }

  checkLogin(state) {
    let isCommon = APP_URL.COMMON.includes(state.url);
    if (this.isLogin()) {
      if (isCommon) {
        let role = this.getUserInfo().role;
        if (role == VARIABLES.OPERATOR) {
          this.router.navigate([PAGES.OPERATOR.CUSTOMER_LIST]);
        } else if (role == VARIABLES.CUSTOMER) {
          this.router.navigate([PAGES.CUSTOMER.SET_POINT_HISTORY]);
        }
        return false;
      }
      return true;
    } else {
      if (!isCommon) {
        this.router.navigate([PAGES.COMMON.LOGIN]);
        return false;
      }
      return true;
    }
  }

  checkPermission(url) {
    // let role = localStorage.getItem(VARIABLES.ROLE);
    // let result = false;
    // let screenList = APP_URL.OPERATOR;
    // if (role == VARIABLES.OPERATOR) {
    //   screenList = APP_URL.OPERATOR;
    // } else if (role == VARIABLES.CUSTOMER) {
    //   screenList = APP_URL.CUSTOMER;
    // }
    // screenList.forEach(element => {
    //   if (element === url) {
    //     result = true;
    //   }
    // });
    // // this.router.navigate([""]);
    // return result;

    let role = localStorage.getItem(VARIABLES.ROLE);
    let result = false;
    let screenList = APP_URL.COMMON;
    if (role == VARIABLES.OPERATOR) {
      screenList = screenList.concat(APP_URL.OPERATOR);
    } else if (role == VARIABLES.CUSTOMER) {
      screenList = screenList.concat(APP_URL.CUSTOMER);
    }
    screenList.forEach(element => {
      if (element === url) {
        return result = true;
      }
    });
    if (!result) {
      if (role == VARIABLES.OPERATOR) {
        this.router.navigate([PAGES.OPERATOR.CUSTOMER_LIST]);
      } else if (role == VARIABLES.CUSTOMER) {
        this.router.navigate([PAGES.CUSTOMER.SET_POINT_HISTORY]);
      }
    }
    return result;
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class.login_content') true;

  @Output() checkLogin = new EventEmitter();

  account = {
    username: null,
    password: null,
  }
  isRemember: boolean = false;
  constructor(public _LoginService: LoginService, private router: Router) { }
  ngOnInit() {
    let saveData = localStorage.getItem(VARIABLES.ACCOUNT_INFO);
    if (saveData) {
      let decryped = CryptoJS.AES.decrypt(saveData, VARIABLES.SECRET_KEY);
      this.account = JSON.parse(decryped.toString(CryptoJS.enc.Utf8));
      this.isRemember = true;
    }
  }

  //view
  signIn() {
    // if (this.account.username == 'admin@hitachi.com' && this.account.password == 'admin') {
    //   localStorage.setItem(VARIABLES.ISLOGIN, true.toString());
    //   localStorage.setItem(VARIABLES.USERNAME, this.account.username);
    //   localStorage.setItem(VARIABLES.ROLE, 'operator');
    //   this.checkLogin.emit(true);
    // } else if (this.account.username == 'user' && this.account.password == 'user') {
    //   localStorage.setItem(VARIABLES.ISLOGIN, true.toString());
    //   localStorage.setItem(VARIABLES.USERNAME, this.account.username);
    //   localStorage.setItem(VARIABLES.ROLE, 'customer');
    //   this.checkLogin.emit(true);
    // }

    if (this.account.username == 'admin@hitachi.com' && this.account.password == 'admin') {
      if (this.isRemember) {
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.account), VARIABLES.SECRET_KEY);
        localStorage.setItem(VARIABLES.ACCOUNT_INFO, ciphertext.toString());
      } else if (localStorage.getItem(VARIABLES.ACCOUNT_INFO)) {
        localStorage.removeItem(VARIABLES.ACCOUNT_INFO);
      }

      localStorage.setItem(VARIABLES.ISLOGIN, true.toString());
      localStorage.setItem(VARIABLES.USERNAME, this.account.username);
      localStorage.setItem(VARIABLES.ROLE, 'operator');
      this.router.navigate([PAGES.OPERATOR.CUSTOMER_LIST]);
      this._LoginService.login(true);
    } else if (this.account.username == 'user' && this.account.password == 'user') {
      if (this.isRemember) {
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.account), VARIABLES.SECRET_KEY);
        localStorage.setItem(VARIABLES.ACCOUNT_INFO, ciphertext.toString());
      } else if (localStorage.getItem(VARIABLES.ACCOUNT_INFO)) {
        localStorage.removeItem(VARIABLES.ACCOUNT_INFO);
      }
      localStorage.setItem(VARIABLES.ISLOGIN, true.toString());
      localStorage.setItem(VARIABLES.USERNAME, this.account.username);
      localStorage.setItem(VARIABLES.ROLE, 'customer');
      this.router.navigate([PAGES.CUSTOMER.SET_POINT_HISTORY]);
      this._LoginService.login(true);
    }
  }
  forgotPassword() {
    this._LoginService.changePage(VARIABLES.PAGE_NOT_LOGIN.CHANGE_PASSWORD);
  }
}