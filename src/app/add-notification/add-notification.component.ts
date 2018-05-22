import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit {

  // init
  createData: any = {
    nameCCT: '',
  }
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  // show add dialog
  showAddDialog() {
    const dialogRef = this.dialog.open(AddNotificationDialog, {
      width: '400px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createData = {
          // nameCCT: result.nameCCT,
        };
        // this.createAction();
      } else {
        this.createData = {};
      }
    });
  }
}

// component dialog add
@Component({
  selector: 'add-notification-dialog',
  templateUrl: 'add-notification-dialog.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNotificationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  types = [
    {
      id: 1,
      label: "SMS"
    },
    {
      id: 2,
      label: "Email"
    }
  ];
  ngOnInit() {
    this.data.type = this.types[1].id;
  }
}
