import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';
// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  listState = ['schedule-list', 'schedule-create', 'schedule-detail'];
  currentState: string = this.listState[0];
  types = [
    { id: 1, label: 'Data Connection' },
    { id: 2, label: ' Optimization Execution' },
    { id: 3, label: 'Report Generation' },
  ];

  columns: ITdDataTableColumn[] = [
    { name: 'scheduleName', label: 'Schedule Name', sortable: true },
    { name: 'scheduleType', label: 'Schedule Type', sortable: true },
    { name: 'recurrence', label: 'Recurrence', sortable: true },
    { name: 'days', label: 'Days', sortable: true },
    { name: 'time', label: 'Time', sortable: true },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'delete', label: 'Delete' },
  ];

  data: any[] = [
    {
      scheduleName: '001',
      scheduleType: 1,
      // scheduletypeDisplay: this.types[0].label,
      recurrence: {
        type: 'Weekly',
        value: {
          mon: true,
          tue: true,
          wed: false,
          thu: false,
          fri: true,
          sat: false,
          sun: true
        }
      },
      type: {
        id: '1',
        value: '12:00'
      },
      days: 'None',
      time: 'Every 30 minutes',
      status: 'Active'
    },
    {
      scheduleName: '002',
      scheduleType: 2,
      // scheduletypeDisplay: this.types[1].label,
      recurrence: {
        type: 'Weekly',
        value: {
          mon: true,
          tue: false,
          wed: false,
          thu: true,
          fri: true,
          sat: false,
          sun: false
        }
      },
      type: {
        id: '2',
        value: {
          hour: 1,
          minutes: 30
        }
      },
      days: 'None',
      time: 'Every 2 hours',
      status: 'Active'
    },
    {
      scheduleName: '003',
      scheduleType: 3,
      // scheduletypeDisplay: this.types[2].label,
      recurrence: {
        type: 'Weekly',
        value: {
          mon: true,
          tue: false,
          wed: false,
          thu: true,
          fri: true,
          sat: false,
          sun: false
        }
      },
      type: {
        id: '2',
        value: {
          hour: 1,
          minutes: 30
        }
      },
      days: 1,
      time: '07:00',
      status: 'Active'
    },
  ];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'scheduleName';
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
  displaySchedule(id) {
    return this.types.filter(item => {
      return item.id == id;
    })[0].label;
  }
}