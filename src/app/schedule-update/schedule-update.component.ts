import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styleUrls: ['./schedule-update.component.scss']
})
export class ScheduleUpdateComponent implements OnInit {

  @Input('selectedSchedule') itemSelected = {};
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
      width: '50%',
      disableClose: true,
      data: item,
    };
    let dialogRef: any;
    dialogRef = this.dialog.open(UpdateScheduleDialog, configDialog);
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
  selector: 'update-schedule-dialog',
  templateUrl: 'update-schedule-dialog.html',
  styleUrls: ['./schedule-update.component.scss', '.././schedule-create/schedule-create.component.scss']
})
export class UpdateScheduleDialog implements OnInit {
  dataOld: any = {};

  hour: number = 1;
  minute: number = 0;

  textSelect: string = null;

  hours = [];
  minutes = [];
  days = [];
  months = [];

  startTimes = [0];
  dayInMonth = [0];
  dayInYear = [0];

  statusList = [
    'Active',
    'InActive'
  ];
  types = [
    { id: 1, label: 'Data Connection' },
    { id: 2, label: 'Optimization Execution' },
    { id: 3, label: 'Report Generation' },
  ];

  item = {
    // type: 1,
    type: this.data.scheduleType,
  }

  constructor(
    public dialogRef: MatDialogRef<UpdateScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.dataOld = _.cloneDeep(this.data);
    this.createTime();
    console.log(this.data);
  }

  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
  log() {
    console.log(this.data.days.mon);
  }
  createTime() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
  }
  addStartTime(index) {
    this.startTimes.splice(index + 1, 0, Math.max(...this.startTimes) + 1);
  }
  removeStartTime(index) {
    this.startTimes.splice(index, 1);
  }
  addItem(arr, index) {
    arr.splice(index + 1, 0, Math.max(...arr) + 1);
  }
  removeItem(arr, index) {
    arr.splice(index, 1);
  }

  chooseRecurrence(e) {
    if (e.value == 2) {
      this.textSelect = 'Every';
    } else if (e.value == 3) {
      this.textSelect = 'Days';
    } else if (e.value == 4) {
      this.textSelect = 'Dates';
    }
    this.textSelect
  }
}