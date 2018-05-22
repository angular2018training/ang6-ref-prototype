import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';

const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'operatorId', label: 'Operator ID', sortable: true },
    // { name: 'username', label: 'Username', sortable: true },
    { name: 'firstName', label: 'First Name', sortable: true },
    { name: 'lastName', label: 'Last Name', sortable: true },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'lastLogin', label: 'Last Login', sortable: true },
    { name: 'createdDate', label: 'Created Date', sortable: true },
    { name: 'phoneNumber', label: 'Phone Number', sortable: true },
    { name: 'email', label: 'Email', sortable: true },
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
  sortBy: string = 'operatorId';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  @ViewChild('filter') filterEle: ElementRef;

  constructor(private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService) { }

  ngOnInit() {
    let i = 1;
    this.data = Array.apply(null, Array(1200)).map(function () {
      return {
        'operatorId': '00' + (i++),
        'username': 'Operator ' + (i++),
        'firstName': 'Justin',
        'lastName': 'Timberlake',
        'status': 'Active',
        'lastLogin': '2017-10-16 09:00',
        'createdDate': '2017-10-16 09:00',
        'phoneNumber': '1800 4722 669',
        'email': 'direct@hsbc.com.sg',
      };
    });

    // this.getAllOperator();
    this.filter();
    // this.toggleDefaultFullscreenDemo();

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

  //exucte
  // showSuccess(message) {
  //   this._UtilitiesService.showSuccess(message);
  // }

  //view
  showDeleteConfirm() {
    this._UtilitiesService.showConfirmDialog('Do you want delete this record ?', (result) => {
      if (result) {
        // deleteAction
        // this.showSuccess("Delete record successfull !");
      }
    });
  }

  //service
  // getAllOperator() {
  //   // let request;
  //   this._OperatorService.getAllOperator().then(response => {
  //     // console.log(response);
  //     this.data = response._embedded.operatorDtoes;
  //     this.filter();
  //   }, error => {

  //   })
  // }
}