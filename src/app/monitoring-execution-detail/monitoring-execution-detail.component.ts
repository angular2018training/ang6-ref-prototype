import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from '../services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);
import { Router } from '@angular/router';
import * as moment from "moment";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ErrorMessageMonitoringDialog} from '../monitoring-execution-history/monitoring-execution-history.component';

@Component({
  selector: 'monitoring-execution-detail',
  templateUrl: './monitoring-execution-detail.component.html',
  styleUrls: ['./monitoring-execution-detail.component.scss']
})
export class MonitoringExecutionDetailComponent implements OnInit {

  customer = {
    id: '001',
    customerName: 'Helios GCS VietNam',
    chillerPlantName: 'Chiller Plant 01',
    category:'Execution Data',
    startTime: '',
    endTime: '',
    status:'Failure',
  }

  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'Equipment ID', filter: true, sortable: true, width:150 },
    { name: 'equipmentName', label: 'Equipment Name', filter: true, sortable: true },
    { name: 'type', label: 'Type' },
    { name: 'setPoint', label: 'Set-Point', hidden: false },
    { name: 'measuredValue', label: 'Measured Value' },
    { name: 'measuredUnit', label: 'Measured Unit' },
  ];

  data: any[] = [
    {
      'id': 'CDWP-01',
      'equipmentName': 'Pump CDWP 01',
      'type': 'CDWP',
      'setPoint': 'Variable Speed Drive',
      'measuredValue': '80',
      'measuredUnit': '%',
    },
    {
      'id': 'CDWP-02',
      'equipmentName': 'Pump CDWP 02',
      'type': 'CDWP',
      'setPoint': 'Variable Speed Drive',
      'measuredValue': '75',
      'measuredUnit': '%',
    },
    {
      'id': 'CT-01',
      'equipmentName': 'Cooling Tower 01',
      'type': 'CDWP',
      'setPoint': 'Cooling Tower Water Leaving Temperature',
      'measuredValue': '35',
      'measuredUnit': 'C',
    },
    {
      'id': 'CT-02',
      'equipmentName': 'Cooling Tower 02',
      'type': 'CDWP',
      'setPoint': 'Cooling Tower Water Leaving Temperature',
      'measuredValue': '40',
      'measuredUnit': 'C',
    },
    
  ];

  customerNames = ['Helious GCS VietName', 'HCC JP'];
  ListStatus = ['All', 'Success', 'Failure'];
  category = ['All', 'Data Collection', 'Execution Data', 'Report Generation'];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'id';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(public dialog: MatDialog, private _UtilitiesService: UtilitiesService,
    private router: Router, private _dataTableService: TdDataTableService) {
  }

  ngOnInit() {
    this.toggleDefaultFullscreenDemo();
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
  /**
   * format datetime
   * @param dt : number = datetime in millisecond
   * @param withMillisecond : boolean =  format with millisecond
   */
  formatDatetime(dt) {
    let formatStr = 'MM/DD/YYYY/';
    return moment(dt).format(formatStr);
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  showDialogErrorMessage() {
    if (this.customer.status === 'Failure') {
      let dialogRef = this.dialog.open(ErrorMessageMonitoringDialog, {
        width: '400px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
}
