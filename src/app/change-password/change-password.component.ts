import { Component, OnInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';

import { VARIABLES, PAGES } from '.././constant';

import { LoginService } from '.././login/login.component';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @HostBinding('class.login_content') true;
  email: string = '';

  constructor(public _LoginService: LoginService, private router: Router) { }
  ngOnInit() { 
    
  }

  //view
  send() {
    if (this.email != '') {
      // this._LoginService.changePage(VARIABLES.PAGE_NOT_LOGIN.RESET_PASSWORD);
      this.router.navigate([PAGES.COMMON.RESET_PASSWORD]);
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}