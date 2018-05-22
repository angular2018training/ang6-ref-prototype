import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
export class StartTime {
  id: number;
  startTime: string;
}

export class Monthly {
  id: number;
  day: string;
}

export class Yearly {
  id: number;
  day: string;
  month: string;
}

@Component({
  selector: 'data-retention',
  templateUrl: './data-retention.component.html',
  styleUrls: ['./data-retention.component.scss']
})
export class DataRetentionComponent implements OnInit {
  data = {
    scheduleName: '',
    status: 0,
    type: 0,
  }

  listSelectedStartTime: StartTime[] = [];

  listSelectedMonthlyData: Monthly[] = [];

  listSelectedYearlyData: Yearly[] = [];
  lsStartTime = [0];
  statusList = [
    'Active',
    'InActive'
  ];
  types = [
    { id: 1, label: 'Data Connection' },
    { id: 2, label: ' Optimization Execution' },
    { id: 3, label: 'Data Generation' },
  ];

  count = 0;
  inputDataRetention;
  timeUnits = ['year', 'month', 'day'];
  startTimes = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00', '24:00'];

  dayInMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  monthInYears = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  selectedSequence = 'weekly';
  selectedTime;
  selectedTimeUnit;
  isDisabled;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.listSelectedStartTime.push({
      id: this.count,
      startTime: ''
    });

    this.listSelectedMonthlyData.push({
      id: this.count,
      day: ''
    });

    this.listSelectedYearlyData.push({
      id: this.count,
      day: '',
      month: ''
    });
  }

  //view
  addItem(type, index) {
    if (type == 'starttime') {
      this.count++;
      this.listSelectedStartTime.push({
        id: this.count,
        startTime: ''
      });
    } else if (type == 'monthly') {
      this.count++;
      this.listSelectedMonthlyData.push({
        id: this.count,
        day: ''
      });
    } else if (type == 'yearly') {
      this.count++;
      this.listSelectedYearlyData.push({
        id: this.count,
        day: '',
        month: ''
      });
    }

  }

  deleteItem(type, index) {
    if (type == 'starttime') {
      if (this.listSelectedStartTime.length > 1) {
        this.listSelectedStartTime.splice(index, 1);
      }
    } else if (type == 'monthly') {
      if (this.listSelectedMonthlyData.length > 1) {
        this.listSelectedMonthlyData.splice(index, 1);
      }
    } else if (type == 'yearly') {
      if (this.listSelectedYearlyData.length > 1) {
        this.listSelectedYearlyData.splice(index, 1);
      }
    }
  }

  addStartTime(index) {
    this.lsStartTime.splice(index + 1, 0, Math.max(...this.lsStartTime) + 1);
  }
  removeStartTime(index) {
    this.lsStartTime.splice(index, 1);
  }

}
