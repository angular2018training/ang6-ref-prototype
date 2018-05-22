import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';
// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.scss']
})
export class NotificationSettingComponent implements OnInit {
  listState = ['schedule-list', 'schedule-create', 'schedule-detail'];
  currentState: string = this.listState[0];

  columns: ITdDataTableColumn[] = [
    { name: 'no', label: 'No', sortable: true },
    { name: 'type', label: 'Type', sortable: true },
    { name: 'phone', label: 'Phone Number/Email', sortable: true },
    { name: 'setPoint', label: 'Set Points Notification', sortable: true },
    { name: 'report', label: 'Report Notification', sortable: true },
    { name: 'action', label: 'Delete' },
  ];

  data = [];
  types = [
    { id: 1, label: 'SMS' },
    { id: 2, label: 'Email' },
  ];
  ischeck: boolean = true;
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'no';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  // @ViewChild('filterL') filterEle: ElementRef;
  // @ViewChild('filter') filterEle;
  // @ViewChildren('filter', { read: ViewContainerRef }) viewContainerRefs;

  private filterEle: ElementRef;
  @ViewChild('filter') set content(content: ElementRef) {
    if (content != undefined) {
      this.filterEle = content;
      Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          this.search(this.filterEle.nativeElement.value);
        });
    }
  }

  constructor(private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService) { }

  ngOnInit() {


    // for (let i = 0; i < 20; i++) {
    //   this.data.push({
    //     no: '001',
    //     type: 'Weekly',
    //     phone: 'Mon - Tue',
    //     setPoint: '23:59',
    //     report: '23:59',
    //   });
    // }

    let i = 1;

    for (var index = 0; index < 50; index++) {
      let type = Math.floor((Math.random() * 2) + 1)      
      let data = {
        no: index,
        type : type,
        phone : type == 1 ? Math.floor((Math.random() * 99999999999) + 1000000000) : 'hccno' + index + '@hitachi.com',
        setPoint: Math.round(Math.random()) ? true : false,
        report: Math.round(Math.random()) ? true : false        
      }
      this.data.push(data);
    }

    // this.data = Array.apply(null, Array(50)).map(function () {
    //   return {
    //     no: i++,
    //     type: Math.floor((Math.random() * 2) + 1),
    //     phone: Math.floor((Math.random() * 99999999999) + 1000000000),
    //     setPoint: Math.round(Math.random()) ? true : false,
    //     // setPoint: Math.round(Math.random()),
    //     report: Math.round(Math.random()) ? true : false,
    //   };
    // });
    this.filter();
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

  filter(isSort: boolean = true): void {
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
    if (isSort) {
      newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    }
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
  handleReturn(e) {
    // console.log(e);
    if (e) {
      this.currentState = this.listState[0];
      // Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
      //   .debounceTime(150)
      //   .distinctUntilChanged()
      //   .subscribe(() => {
      //     this.search(this.filterEle.nativeElement.value);
      //   });
    }
  }

  //view
  modelChangeText(e, row) {
    let temp = e.srcElement.value;
    if (row.phone != temp) {
      row.phone = e.srcElement.value;
      this.showSuccess("Edit record successfull !");
      console.log(row.phone);
    }
  }
  changeText($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  clickText($event) {
    // console.log(1);
    $event.preventDefault();
    $event.stopPropagation();
  }
  add(row) {
    // add(index) {
    let index = _.indexOf(this.filteredData, row);
    this.data.splice(index, 0, {
      no: this.data.slice(-1)[0].no++,
      type: 1,
      phone: '',
      setPoint: false,
      report: false,
    });
    this.filter(false);
    this.showSuccess("Add record successfull !");
  }
  remove(row) {
    this.deleteAction(row);
    this.showSuccess("Delete record successfull !");
  }
}