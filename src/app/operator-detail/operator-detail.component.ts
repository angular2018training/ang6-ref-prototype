import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VARIABLES } from 'app/constant';

@Component({
  selector: 'dialog-operator-edit',
  templateUrl: 'dialog-operator-edit/dialog-operator-edit.component.html',
  styleUrls: ['dialog-operator-edit/dialog-operator-edit.component.scss']
})
export class DialogOperatorEdit implements OnInit{
  role;
  ngOnInit(): void {
    this.role = localStorage.getItem(VARIABLES.ROLE);
  }

  // @HostBinding('class.component-content') true;
  public operator = {
    firstName: 'Justin',
    lastName: 'Timberlake',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  
  constructor(
    public dialogRef: MatDialogRef<DialogOperatorEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.scss']
})
export class OperatorDetailComponent implements OnInit {
  public isActive: boolean = true;
  public operator = {
    firstName: 'Justin',
    lastName: 'Timberlake',
    email: 'jtimberlake@gcs-vn.com',
    phone: '1800 4722 669',
    currentPassword: '',
    newPassword: '12345',
    confirmNewPassword: '12345',
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  //view
  updateDetail() {
    let dialogRef = this.dialog.open(DialogOperatorEdit, {
      width: '50%',
      height: '90%',
      // height: '400px',
      data: {
        title: 'Edit Operator Information'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(true);
      }
    });
  }
}