import {
  Component, OnInit, ViewChild, ElementRef,
  Inject, HostBinding, Output, EventEmitter, Input
} from '@angular/core';
import { Router } from '@angular/router';
import { IPageChangeEvent } from '@covalent/core';

import { PAGES } from 'app/constant';

import {
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent,
  ITdDataTableColumn
} from '@covalent/core';

import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { UtilitiesService } from 'app/services/utilities.service';
import * as _ from "lodash";

@Component({
  selector: 'app-chiller-plants',
  templateUrl: './chiller-plants.component.html',
  styleUrls: ['./chiller-plants.component.scss']
})
export class ChillerPlantsComponent implements OnInit {
  // column name
  columns: ITdDataTableColumn[] = [
    { name: 'id', label: 'Chiller Plant ID', sortable: true },
    { name: 'nameCP', label: 'Chiller Plant Name', sortable: true },
    { name: 'nameBuilding', label: 'Building Name', sortable: true },
    { name: 'numOfChillers', label: 'Number of Chillers', sortable: true },
    { name: 'numOfCCTs', label: 'Number of CTTs', sortable: true },
    { name: 'numOfCTs', label: 'Number of CTs', sortable: true },
    { name: 'status', label: 'Status', sortable: true },
    { name: 'modifiedTime', label: 'Modified Time', sortable: true },
    { name: 'action', label: '', sortable: false }
  ];
  // data table
  data: any[] = [
    {
      "id": 1,
      "nameCP": "Chiller Plant 01",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 2,
      "nameCP": "Chiller Plant 02",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 3,
      "nameCP": "Chiller Plant 03",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 4,
      "nameCP": "Chiller Plant 04",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 5,
      "nameCP": "Chiller Plant 05",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 6,
      "nameCP": "Chiller Plant 06",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    },
    {
      "id": 7,
      "nameCP": "Chiller Plant 07",
      "nameBuilding": "QJSC 9",
      "numOfChillers": 4,
      "numOfCCTs": 2,
      "numOfCTs": 4,
      "status": "Completed",
      "modifiedTime": "2017-10-09 09:54:54"
    }
  ];
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

  // createData
  createData: any = {
    nameCP: '',
    nameBuilding: '',
    numOfChillers: '',
    numOfCCTs: '',
  }
  //id of chiller Plant secleted 
  itemSelected: {};
  isDetail = false;

  
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

  constructor(
    private _dataTableService: TdDataTableService,
    private _UtilitiesService: UtilitiesService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.filter();
    this.toggleDefaultFullscreenDemo();
  }  

  toggleDefaultFullscreenDemo(): void {
    this._UtilitiesService.showLoading();
    setTimeout(() => {
      this._UtilitiesService.hideLoading();
    }, 500);
  }

  // show massage
  showError() {
    this._UtilitiesService.showError('Error message');
  }
  showSuccess(message) {
    this._UtilitiesService.showSuccess(message);
  }
  // sort data Table
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }
  // search data table
  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }
  // page loading
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  //reload data
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
  // show confirm
  showDeleteConfirm(item) {
    this._UtilitiesService.showConfirmDialog('Do you want delete this record ?', (result) => {
      if (result) {
        this.deleteAction(item);
        this.showSuccess("Delete record successfull !");
      }
    });
  }

  // show add dialog
  showAddDialog(type) {
    let isImportFile: boolean;
    if (type === 'import') {
      isImportFile = true;
    } else {
      isImportFile = false;
    }
    let dialogRef = this.dialog.open(AddChillerPlantDialog, {
      width: '30%',
      disableClose: true,
      data: {
        isImport: isImportFile
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createData = {
          nameCP: result.nameCP,
          nameBuilding: result.nameBuilding,
          numOfChillers: result.numOfChillers,
          numOfCCTs: result.numOfCCTs
        };
        this.createAction();
      } else {
        this.createData = {};
      }
    });
  }
  // action add new chiller plant
  createAction() {
    let createData = this.prepareCreateData();
    this.data.push(createData);
    this.filter();
    this.showSuccess("Create record successfull !");
    // this.router.navigate([PAGES.OPERATOR.PLAN_MODEL]);
  }

  deleteAction(item) {
    let index = _.indexOf(this.filteredData, item);
    this.data.splice(index, 1);
    this.filter();
  }
  prepareCreateData() {
    let data = {
      id: this.filteredTotal + 1,
      nameCP: this.createData.nameCP,
      nameBuilding: this.createData.nameBuilding,
      numOfChillers: 0,
      numOfCCTs: 0,
      numOfCTs: 0,
      status: 'Incompleted',
      modifiedTime: "2017-10-09 09:54:54"
    }
    return data;
  }
  showDetail(item) {
    this.itemSelected = item;
    this.isDetail = true;
  }
  updateIsDetail(e) {
    this.isDetail = e;
  }
}

// component dialog add
@Component({
  selector: 'add-chiller-plant-dialog',
  templateUrl: 'add-chiller-plant-dialog.html',
  styleUrls: ['./chiller-plants.component.scss']
})
export class AddChillerPlantDialog {
  files: any['csv'];
  disabled: boolean = false;

  country: number = 0;
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
    public dialogRef: MatDialogRef<AddChillerPlantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
}