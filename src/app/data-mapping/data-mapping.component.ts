import { Component, Inject, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router } from '@angular/router';
import { PAGES } from 'app/constant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilitiesService } from 'app/services/utilities.service';
import * as _ from 'lodash';

@Component({
  selector: 'add-mapping-ct-dialog',
  templateUrl: 'add-mapping-ct-dialog.html',
  styleUrls: ['./data-mapping.component.scss']
})
export class DataMappingAddMCTDialog implements OnInit {
  model;
  tagNames = [];
  ngOnInit(): void {
    this.model = this.data["model"];
    this.tagNames = this.data["tagNames"];
  }

  constructor(public dialogRef: MatDialogRef<DataMappingAddMCTDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}

// component dialog add
@Component({
  selector: 'import-dialog',
  templateUrl: 'import-dialog.html',
  styleUrls: ['./data-mapping.component.scss']
})
export class DataMappingImportDialog implements OnInit {
  type;
  ngOnInit(): void {
    this.type = this.data["type"];
  }

  file = {
    fileName: 'No file selected yet.',
    fileSize: 'No file selected yet.',
    fileContent: ''
  }

  selectEvent(file: File): void {
    this.file.fileName = file.name;
    this.file.fileSize = (file.size / 1024).toFixed(2) + ' KB';

    let self = this;
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      self.file.fileContent = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadEvent(file: File): void {
  }

  cancelEvent(): void {
    this.file.fileContent = '';
    this.file.fileName = 'No file selected yet.';
    this.file.fileSize = 'No file selected yet.';
  }

  constructor(
    public dialogRef: MatDialogRef<DataMappingImportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}

@Component({
  selector: 'data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.scss']
})
export class DataMappingComponent implements OnInit {
  mappingType = 1;
  listMappingType = [{ name: 'Data Collector', value: 1 }, { name: 'Weather Data', value: 2 }];
  outdoorTemperatures = [{ name: 'Temperature', value: 1 }];
  outdoorHumidities = [{ name: 'Humidity', value: 1 }];
  weatherServices= [{ name: 'Weather Service 1', value: 1 }, { name: 'Weather Service 2', value: 2 }, { name: 'Weather Service 3', value: 3 }];
  locations = [{ name: 'Tokyo, Japan', value: 1 }, { name: 'Seoul, Korea', value: 2 } , { name: 'New York, USA', value: 3 }];
  weatherModel = {
    usingType: 1,
    temperature: 1,
    humidity: 1,
    weatherService: 1,
    location: 1
  }
  columns: ITdDataTableColumn[] = [
    { name: 'category', label: 'Category', filter: true, sortable: false },
    { name: 'type', label: 'Type', sortable: false },
    { name: 'simulatorIndex', label: 'Simulator Index', sortable: false },
    { name: 'equimentName', label: 'Customer\'s equiment name', sortable: false },
    { name: 'tagName', label: 'Green Koncepts tag name prefix', sortable: false },
  ];
  data: any[] = [];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = 1000;
  sortBy: string = 'category';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  private dummyCatetory = ['Chiller', 'Chiller', 'Chiller', 'Chiller', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Pump', 'Cooling Tower', 'Cooling Tower', 'Cooling Tower', 'Cooling Tower', 'Cooling Tower'];
  private dummyType = ['-', '-', '-', '-', 'CHWP', 'CHWP', 'CHWP', 'CHWP', 'CDWP', 'CDWP', 'CDWP', 'CDWP', 'Backup-CHWP', 'Backup-CDWP', 'CCT', 'CCT', 'CT', 'CT', 'Backup-CT'];
  private dummySimulatorIndex = [1, 2, 3, 4, 1, 3, 5, 7, 2, 4, 6, 8, 9, 10, 1, 2, 1, 2, 3];
  private dummyEquimentName = ['Chiller 1', 'Chiller 2', 'Chiller 3', 'Chiller 4', 'CHWP-1', 'CHWP-2', 'CHWP-3', 'CHWP-4', 'CWP-1', 'CWP-2', 'CWP-3', 'CWP-4', 'CHWP-5', 'CWP-5', 'CT-Header-1', 'CT-Header-2', 'CT5-1', 'CT6-1', 'CT7-1'];
  private dummyTagName = ['CH-1', 'CH-2', 'CH-3', 'CH-4', 'CHWP-1 ', 'CHWP-2', 'CHWP-3', 'CHWP-4', 'CDWP-1', 'CDWP-2', 'CDWP-3', 'CDWP-4', 'CHWP-5', 'CDWP-5', 'HDR-1', 'HDR-2', 'CT-1', 'CT-3', 'CT-5'];
  private tagNames = ['CT-1', 'CT-2', 'CT-3', 'CT-4', 'CT-5', 'CT-6', 'CT-7', 'CT-8', 'CT-9']

  constructor(public dialog: MatDialog, private router: Router, private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.buildDummyData();
  }

  buildDummyData() {
    // create dummy data
    for (let i = 0; i < this.dummyCatetory.length; i++) {
      this.data.push({
        'category': this.dummyCatetory[i],
        'type': this.dummyType[i],
        'simulatorIndex': this.dummySimulatorIndex[i],
        'equimentName': [this.dummyEquimentName[i]],
        'tagName': [this.dummyTagName[i]],
      });
    }
    // this.filter();
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

  changeMappingType(args) {
  }

  clearHandler() {
    let msg = 'Do you want to clear data table?';
    this._UtilitiesService.showConfirmDialog(msg, (result) => {
      if (result) {
        // handle here
        this.data = [];
        this.filter();
      }
    });
  }

  importHandler() {
    let type = _.find(this.listMappingType, { value: this.mappingType });
    let dialogRef = this.dialog.open(DataMappingImportDialog, {
      width: '400px',
      disableClose: true,
      data: { type: type.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // handle here
        this.data = [];
        this.buildDummyData();
      }
    });
  }

  exportHandler() {
    let csvContent = '',
      columnDelimiter = ',',
      lineDelimiter = '\n';

    csvContent += 'Category,Type,Simulator Index,Customer\'s equiment name,Green Koncepts tag name prefix' + lineDelimiter;
    this.data.forEach((row) => {
      csvContent += _.values(row).join(columnDelimiter) + lineDelimiter;
    });

    this.downloadCSV('export_data.csv', csvContent);
  }

  /**
       * export csv file handler
       * @param {string} filename [[Description]]
       * @param {Array} data     [[Description]]
       */
  downloadCSV(filename, data) {
    if (!data)
      return;

    filename = filename || 'filename.csv';

    let blob = new Blob([data], {
      type: "text/csv;charset=utf-8;"
    });

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename)
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {

        // feature detection, Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        // link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  showMCTDialog(item) {
    // get list non-added tag name
    let existTagNames = [],
      existEquimentNames = [];
    _.filter(this.data, (row) => { return row.type === 'CT' || row.type === 'Backup-CT'; }).forEach((row) => {
      existTagNames = _.concat(existTagNames, row.tagName);
      existEquimentNames = _.concat(existEquimentNames, row.equimentName);
    });

    let tagNames = _.difference(this.tagNames, existTagNames);

    // if have any non-added tag name => show dialog
    if (tagNames.length > 0) {
      let dialogRef = this.dialog.open(DataMappingAddMCTDialog, {
        width: '400px',
        disableClose: true,
        data: {
          model: {
            simulatorIndex: item.simulatorIndex,
            equimentName: '',
            tagName: tagNames[0]
          },
          tagNames: tagNames,
          existEquimentNames: existEquimentNames
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (existEquimentNames.indexOf(result.equimentName) === -1) {
            item.equimentName.push(result.equimentName);
            item.tagName.push(result.tagName);
            this._UtilitiesService.showSuccess('Add successfully.');
          } else {
            this._UtilitiesService.showError('Customer\'s equiment name is existent.');
          }
        }
      });
    } else {
      this._UtilitiesService.showInfo('There is no tag name to add.');
    }
  }

  deleteMCT(item, index) {
    this._UtilitiesService.showConfirmDialog('Do you want to delete this mapping cooling tower ?', (result) => {
      if (result && item) {
        item.equimentName.splice(index, 1);
        item.tagName.splice(index, 1);
        this._UtilitiesService.showSuccess('Delete successfully.');
      }
    });
  }

  editEquimentName(newValue, item, index) {
    item.equimentName[index] = newValue;
  }
}
