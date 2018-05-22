import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class ScheduleCreateComponent implements OnInit {
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
    const dialogRef = this.dialog.open(CreateScheduleDialog, {
      width: '50%',
      disableClose: true,
      data: {
        type: 1
      }
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
  selector: 'create-schedule-dialog',
  templateUrl: 'create-schedule-dialog.html',
  styleUrls: ['./schedule-create.component.scss']
})
export class CreateScheduleDialog {
  hour: number = 1;
  hours = [];

  minute: number = 0;
  minutes = [];
  startTimes = [0];
  dayInMonth = [0];
  dayInYear = [0];
  statusList = [
    'Active',
    'InActive'
  ];
  days = [];
  months = [];
  textSelect: string = null;

  types = [
    { id: 1, label: 'Data Connection' },
    { id: 2, label: ' Optimization Execution' },
    { id: 3, label: 'Report Generation' },
  ];
  default = {
    type: 1,
  }

  constructor(
    public dialogRef: MatDialogRef<CreateScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
  addItem(arr,index) {
    arr.splice(index + 1, 0, Math.max(...arr) + 1);
  }
  removeItem(arr,index) {
    arr.splice(index, 1);
  }
  ngOnInit() {
    this.createTime();
  }

  chooseRecurrence(e) {
    if (e.value == 2) {
      this.textSelect = 'Every';
    } else if (e.value == 3) {
      this.textSelect = 'Days';
    } else if (e.value == 4) {
      this.textSelect = 'Dates';
    }
    // console.log(e);
    this.textSelect
  }
}