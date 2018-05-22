import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent implements OnInit {

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
    const dialogRef = this.dialog.open(CreateConnectionDialog, {
      width: '500px',
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
  selector: 'create-connection-dialog',
  templateUrl: 'create-connection-dialog.html',
  styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionDialog {

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
  constructor(
    public dialogRef: MatDialogRef<CreateConnectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}

