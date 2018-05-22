import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { VARIABLES, PAGES } from 'app/constant';

import { DialogOperatorEdit } from '.././operator-detail/operator-detail.component';
import { LoginService } from '.././login/login.component';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  userName;
  role;
  constructor(public _LoginService:LoginService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem(VARIABLES.USERNAME);
    this.role = localStorage.getItem(VARIABLES.ROLE);
  }

  //view
  signOut(){
    localStorage.removeItem(VARIABLES.ISLOGIN);
    localStorage.removeItem(VARIABLES.USERNAME);
    localStorage.removeItem(VARIABLES.ROLE);
    this.router.navigate([PAGES.COMMON.LOGIN]);
    this._LoginService.login(false);
  }
  updateDetail() {
    let roleTitle : string = '';
    if (this.role == 'operator') {
      roleTitle = 'Operator';
    } else if (this.role == 'customer'){
      roleTitle = 'Customer';
    }
    let dialogRef = this.dialog.open(DialogOperatorEdit, {
      width: '50%',
      height: '90%',
      // height: '400px',
      data: {
        title: 'Edit ' + roleTitle + ' Information'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(true);
      }
    });
  }
}