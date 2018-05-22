import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';
import { VARIABLES } from './constant';

import { LoginService } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // public isLogin: boolean = true;
  public isLogin: boolean = false;
  public isFirstTime: boolean = true;

  public currentPage: string = VARIABLES.PAGE_NOT_LOGIN.LOGIN;
  public pageNotLogin = VARIABLES.PAGE_NOT_LOGIN;
  title = 'app';
  constructor(private vcr: ViewContainerRef, private toastr: ToastsManager, private _LoginService: LoginService, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this._LoginService.getStatus().subscribe(message => {
      if (message.isLogin != undefined) {
        this.isLogin = message.isLogin;
        if (this.isLogin) {
          // document.location.href='abc';
          // window.history.pushState('page2', 'Title', '/login');

          // if(this.isFirstTime){
          //   this.isFirstTime=false;
          // }else{
          //   window.history.pushState(null, null, '/login');
          // }
          // this.router.navigate([PAGES.OPERATOR.HOME]);
        }
      } else if (message.pageName != undefined) {
        this.currentPage = message.pageName;
      }
    });
    // this.router.events.subscribe((event: NavigationStart) => {
    //   if (event['error'] != undefined) {
    //     return this._LoginService.checkLogin(event) && this._LoginService.checkPermission(event['url']);
    //   }
    // });
    // if (localStorage.getItem(VARIABLES.ISLOGIN) == 'true') {
    //   this.isLogin = true;
    // }
    this.isLogin = this._LoginService.isLogin();
  }

  //view
  handleLogin(isLogin) {
    this.isLogin = isLogin;
  }
}