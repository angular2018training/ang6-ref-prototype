import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sms-service',
  templateUrl: './sms-service.component.html',
  styleUrls: ['./sms-service.component.scss']
})
export class SMSServiceComponent implements OnInit {
  keyId: string = 'AKIGID9LDNS93KDE8S754KJ';
  secretKey: string = 'AKIGID9LDNS93KDE8S754KJ';
  smsFormControl = new FormControl('', [
    Validators.required]);

  constructor(private _UtilitiesService: UtilitiesService){}
  
  ngOnInit() {
  }

  onTestKeyClick() {
    this._UtilitiesService.showSuccess('Test key successfully!');
  }

  onSaveClick() {
    this._UtilitiesService.showSuccess('Save successfully!');
  }
}