import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.scss']
})
export class UpdateNotificationComponent implements OnInit {
  @Input('selectedNoti') itemSelected = {};

  updateData: any = {};
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  // show dialog
  showUpdateDialog(item) {
    console.log('item', item);
    const configDialog: any = {
      width: '400px',
      disableClose: true,
      data: item,
    };
    let dialogRef: any;
    dialogRef = this.dialog.open(UpdateNotificationDialog, configDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateData = {
          // nameNotification: result.nameNotification,
        };
        // this.createAction();
      }
    });
  }
}

// component dialog update
@Component({
  selector: 'update-notification-dialog',
  templateUrl: 'update-notification-dialog.html',
  styleUrls: ['./update-notification.component.scss']
})
export class UpdateNotificationDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateNotificationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.dataOld = _.cloneDeep(this.data);
  }
  types = [
    { id: 1, label: 'SMS' },
    { id: 2, label: 'Email' },
  ];
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}