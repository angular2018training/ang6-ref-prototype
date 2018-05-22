import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { PhoneObject } from './model/phone';

@Component({
  selector: 'sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrls: ['./sms-setting.component.scss']
})
export class SMSSettingComponent implements OnInit {
  selectedTime;
  countID = 1;
  times = ['weakly', 'monthly'];

  listPhone: PhoneObject[] = [];

  constructor(
    private _UtilitiesService: UtilitiesService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.listPhone.push({
      id: this.countID,
      phoneNumber: 0,
    });
    //this.toggleDefaultFullscreenDemo();
  }

  showConfirmDialog() {
    this._UtilitiesService.showConfirmDialog('Do you want to delete this customer?', (result) => {
      if (result) {
        // handle here
      }
    });
  }

  toggleDefaultFullscreenDemo(): void {
    this._UtilitiesService.showLoading();
    setTimeout(() => {
      this._UtilitiesService.hideLoading();
    }, 500);
  }

  showError() {
    this._UtilitiesService.showError('Error message');
  }

  showSuccess() {
    this._UtilitiesService.showSuccess('Saved success');
  }

  /*Control List Phone*/

  addPhone() {
    this.countID++;
    this.listPhone.push({
      id: this.countID,
      phoneNumber: 0,
    });
  }

  removePhone() {
    if (this.countID > 1) {
      this.countID--;
      this.listPhone.pop();
    }else{
      return;
    }
  }

}
