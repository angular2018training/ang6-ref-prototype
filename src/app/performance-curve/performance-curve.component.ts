import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'performance-curve',
  templateUrl: './performance-curve.component.html',
  styleUrls: ['./performance-curve.component.scss']
})
export class PerformanceCurveComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'performanceCurveName', label: 'Performance Curve Name', sortable: true },
    { name: 'fileName', label: 'File Name', sortable: true },
    { name: 'note', label: 'Note', sortable: true },
    { name: 'createdDate', label: 'Created Date', sortable: true },
    { name: 'action', label: 'Delete' }
  ];

  data = [];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'performanceCurveName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  @ViewChild('filter') filterEle: ElementRef;

  constructor(
    private _dataTableService: TdDataTableService,
    private _UtilitiesService: UtilitiesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    let i = 1;
    this.data = Array.apply(null, Array(50)).map(function () {
      return {
        performanceCurveName: 'Type ' + (i++),
        fileName: 'PC_1.csv',
        note: '',
        createdDate: '2017-10-04',
      };
    });

    // this.getAllOperator();
    this.filter();
    this.toggleDefaultFullscreenDemo();

    // input search event
    Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.search(this.filterEle.nativeElement.value);
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
    this._UtilitiesService.showSuccess('Success message');
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

  //excute
  deleteAction(item) {
    let index = _.indexOf(this.data, item);
    this.data.splice(index, 1);
    this.filter();
    this._UtilitiesService.showSuccess("Delete record successfull !");
  }

  //view
  showDeleteConfirm(row) {
    this._UtilitiesService.showConfirmDialog('Do you want delete this record ?', (result) => {
      if (result) {
        // deleteAction
        // this.showSuccess("Delete record successfull !");
        this.deleteAction(row);
      }
    });
  }
  addPerformanceCurveValue() {
    let dialogRef = this.dialog.open(PerformanceCurveAddDialog, {
      width: '30%',
      disableClose: true,
      data: {
        // isImport: isImportFile,
        // country: 0,
        // province: 0,
        // chillerPlantName: 'Chiller Plant New',
        // chilerNumber: 1,
        // cctNumber: 1
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.createData = result;
        // console.log(this.createData);
        // this.createAction();
      }
    });
  }
  detailPerformanceCurve(row) {
    let dialogRef = this.dialog.open(PerformanceCurveDetailDialog, {
      width: '30%',
      disableClose: true,
      data: {
        // isImport: isImportFile,
        // country: 0,
        // province: 0,
        // chillerPlantName: 'Chiller Plant New',
        // chilerNumber: 1,
        // cctNumber: 1
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  //service
  // getAllOperator() {
  //   this._OperatorService.getAllOperator().then(response => {
  //     this.data = response._embedded.operatorDtoes;
  //     this.filter();
  //   }, error => {

  //   })
  // }
}

@Component({
  selector: 'performance-curve-add-dialog',
  templateUrl: 'dialog/performance-curve-add-dialog.html',
  styleUrls: ['./performance-curve.component.scss']
})
export class PerformanceCurveAddDialog implements OnInit {
  dataOld: any = {};
  files: any['csv'];
  disabled: boolean = false;

  countries = [
    { id: 0, label: '- Select an option -' },
    { id: 1, label: 'Vietnam' },
    { id: 2, label: 'Japan' },
  ];

  province: number = 0;
  provinces = [
    { id: 0, label: '- Select an option -' },
    { id: 1, label: 'Ha Noi' },
    { id: 2, label: 'Ho Chi Minh' },
  ];

  constructor(
    public dialogRef: MatDialogRef<PerformanceCurveAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.data = {
      imageName: '',
      fileName: '',
      note: '',
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'performance-curve-detail-dialog',
  templateUrl: 'dialog/performance-curve-detail-dialog.html',
  styleUrls: ['./performance-curve.component.scss']
})
export class PerformanceCurveDetailDialog implements OnInit {
  dataOld: any = {};
  files: any['csv'];
  disabled: boolean = false;

  countries = [
    { id: 0, label: '- Select an option -' },
    { id: 1, label: 'Vietnam' },
    { id: 2, label: 'Japan' },
  ];

  province: number = 0;
  provinces = [
    { id: 0, label: '- Select an option -' },
    { id: 1, label: 'Ha Noi' },
    { id: 2, label: 'Ho Chi Minh' },
  ];

  constructor(
    public dialogRef: MatDialogRef<PerformanceCurveDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.data = {
      imageName: 'Type A',
      fileName: '',
      note: '',
    };
    this.dataOld = _.cloneDeep(this.data);
  }

  // handle disable button 'save'
  compareData() {
    if (_.isEqual(this.data, this.dataOld)) {
      return true;
    }
    return false;
  }
}