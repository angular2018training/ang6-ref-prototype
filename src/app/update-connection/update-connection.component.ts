import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-connection',
  templateUrl: './update-connection.component.html',
  styleUrls: ['./update-connection.component.scss']
})
export class UpdateConnectionComponent implements OnInit {
  @Input('selectedConnection') itemSelected = {};
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
      width: '500px',
      disableClose: true,
      data: item,
    };
    let dialogRef: any;
    dialogRef = this.dialog.open(UpdateConnectionDialog, configDialog);
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
  selector: 'update-connection-dialog',
  templateUrl: 'update-connection-dialog.html',
  styleUrls: ['./update-connection.component.scss']
})
export class UpdateConnectionDialog implements OnInit {
  dataOld: any = {};
  constructor(
    public dialogRef: MatDialogRef<UpdateConnectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.dataOld = _.cloneDeep(this.data);
  }
  categorys = [
    'Data Collector',
    'Data Sender',
    'Data Collector - Data Sender',
  ];
  connectionTypes = [
    'JDBC',
    'API'
  ];
  statusList = [
    'Active',
    'InActive'
  ];
  typeDataSources = [
    'MS Sql server',
    'MySQL'
  ]
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}
