import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';
// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.scss']
})
export class ConnectionListComponent implements OnInit {
  listState = ['connection-list', 'connection-create', 'connection-detail'];
  currentState: string = this.listState[0];

  columns: ITdDataTableColumn[] = [
    { name: 'connectionName', label: 'Connection Name', sortable: true },
    { name: 'category', label: 'Category', sortable: true },
    { name: 'connectionType', label: 'Connection Type', sortable: true },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'delete', label: 'Delete' },
  ];

  each_data = {
    connectionName: 'GK Collector',
    category: 'Data Collector',
    connectionType: 'JDBC',
    status: 'Active'
  };
  data = [];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  isResetFilter: boolean = true;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'connectionName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  // @ViewChild('filterL') filterEle: ElementRef;
  // @ViewChild('filter') filterEle;
  // @ViewChildren('filter', { read: ViewContainerRef }) viewContainerRefs;

  private filterEle: ElementRef;
  @ViewChild('filter') set content(content: ElementRef) {
    // if (this.filterEle == undefined && content != undefined) {
    //   this.filterEle = content;
    //   Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       this.search(this.filterEle.nativeElement.value);
    //     });
    // }
    if (this.filterEle == undefined || this.isResetFilter) {
      if (content != undefined) {
        this.filterEle = content;
        this.isResetFilter = false;
        Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            this.search(this.filterEle.nativeElement.value);
          });
        this.filter();
      }
    } else if (content == undefined) {
      this.isResetFilter = true;
    }
    // if (content != undefined) {
    //   // this.filterEle = content;
    //   Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
    //     .debounceTime(150)
    //     .distinctUntilChanged()
    //     .subscribe(() => {
    //       this.search(this.filterEle.nativeElement.value);
    //     });
    // }
  }

  constructor(private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService) { }

  ngOnInit() {
    for (let i = 1; i <= 7; i++) {
      this.data.push({
        connectionName: 'GK Collector ' + i,
        category: 'Data Collector',
        connectionType: 'JDBC',
        status: 'Active',
        nameDataSource: 'Cloud JDBC',
        typeDataSource: 'MS Sql server',
        host: 'GreenKoncept.ChillerData.ODBC',
        port: '21050',
        database: 'ChilerDB',
        username:  'db_user' + i,
        password: '123456'
      });
    }
    this.filter();
    // this.toggleDefaultFullscreenDemo();

    // input search event
    // Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     this.search(this.filterEle.nativeElement.value);
    //   });
  }
  // ngAfterViewInit() {
  // // ngDoChecked() {
  //   Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
  //     .debounceTime(150)
  //     .distinctUntilChanged()
  //     .subscribe(() => {
  //       this.search(this.filterEle.nativeElement.value);
  //     });
  //   // console.log('abc');
  //   // this.viewContainerRefs.changes.subscribe(item => {
  //   //   if (this.viewContainerRefs.length > 0) {
  //   //     // this.viewContainerRefs.first.createComponent(this.contentFactory, 0);
  //   //   }
  //   // })
  // }

  toggleDefaultFullscreenDemo(): void {
    this._UtilitiesService.showLoading();
    setTimeout(() => {
      this._UtilitiesService.hideLoading();
    }, 500);
  }

  showError() {
    this._UtilitiesService.showError('Error message');
  }
  showSuccess(message: string) {
    this._UtilitiesService.showSuccess(message);
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
    // let newData: any[] = this.filteredData;
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

  deleteAction(item) {
    // let index = _.indexOf(this.filteredData, item);
    // this.data.splice(index, 1);
    // this.filter();
    let index = _.indexOf(this.data, item);
    this.data.splice(index, 1);
    this.filter();
  }

  //view
  showDeleteConfirm(item) {
    this._UtilitiesService.showConfirmDialog('Do you want delete this record?', (result) => {
      if (result) {
        this.deleteAction(item);
        this.showSuccess("Delete record successfull !");
      }
    });
  }
}