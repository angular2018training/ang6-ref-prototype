import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


// component dialog add
@Component({
  selector: 'error-message-monitoring-dialog',
  templateUrl: 'error-message-monitoring-dialog.html',
  styleUrls: ['./monitoring-execution-history.component.scss']
})
export class ErrorMessageMonitoringDialog implements OnInit {

  ngOnInit(): void {
  }

}


@Component({
  selector: 'monitoring-execution-history',
  templateUrl: './monitoring-execution-history.component.html',
  styleUrls: ['./monitoring-execution-history.component.scss']
})
export class MonitoringExecutionHistoryComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'ID', sortable: true, width: 100 },
    { name: 'customerName', label: 'Customer Name', filter: true, sortable: true },
    { name: 'chillerPlantName', label: 'Chiller Plant Name' },
    { name: 'startTime', label: 'Start Time', hidden: false },
    { name: 'endTime', label: 'End Time' },
    { name: 'category', label: 'Category' },
    { name: 'status', label: 'Status' },
  ];

  data: any[] = [
    {
      'id': '001',
      'customerName': 'HSBC Singapore',
      'chillerPlantName': 'Chiller Plant 01',
      'startTime': '2017-10-13 20:00',
      'endTime': '2017-10-13 21:00',
      'category': 'Data Collection',
      'status': 'Success'
    },
    {
      'id': '002',
      'customerName': 'HUAWEI',
      'chillerPlantName': 'Chiller Plant 02',
      'startTime': '2017-10-13 20:00',
      'endTime': '2017-10-13 21:00',
      'category': 'Execution Data',
      'status': 'Failure'
    },
    {
      'id': '003',
      'customerName': 'Sony',
      'chillerPlantName': 'Chiller Plant 03',
      'startTime': '2017-10-13 20:00',
      'endTime': '2017-10-13 21:00',
      'category': 'Report Generation',
      'status': 'Success'
    },
  ];

  customerNames = ['Helious GCS VietName', 'HCC JP'];
  chillerPlantNames = ['Chiller Plant 01', 'Chiller Plant 02', 'Chiller Plant 03'];
  ListStatus = ['All', 'Success', 'Failure'];
  category = ['All', 'Data Collection', 'Execution Data', 'Report Generation'];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'customerName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  @ViewChild('filter') filterEle: ElementRef;

  constructor(public dialog: MatDialog, private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService, private router: Router) {
  }

  ngOnInit() {
    this.filter();
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

  showSuccess() {
    this._UtilitiesService.showSuccess('Saved success');
  }

  showDialogErrorMessage(value) {
    if (value === 'Failure') {
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
