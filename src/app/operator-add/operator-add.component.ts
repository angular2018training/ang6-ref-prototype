import { Component, OnInit } from '@angular/core';
// import { PAGES } from 'app/constant';
import { PAGES } from '.././constant';

@Component({
  selector: 'operator-add',
  templateUrl: './operator-add.component.html',
  styleUrls: ['./operator-add.component.scss']
})
export class OperatorAddComponent implements OnInit {
  public isActive: boolean = true;

  public ROUTERLINK={
    OPERATOR_LIST: PAGES.OPERATOR.OPERATOR_LIST
  }
  public data={
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  constructor() { }

  ngOnInit() {
  }
}
