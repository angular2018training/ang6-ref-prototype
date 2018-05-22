import { Component, OnInit, Inject, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from '../services/utilities.service';

import * as _ from 'lodash';

@Component({
    selector: 'unit-price',
    templateUrl: './unit-price.component.html',
    styleUrls: ['./unit-price.component.scss']
})

export class UnitPriceComponent implements OnInit {


    constructor(
        public dialog: MatDialog,
        private _dataTableService: TdDataTableService,
        private _UtilitiesService: UtilitiesService,

    ) { }


    ngOnInit() {
        this.filter();
    }


    columns: ITdDataTableColumn[] = [
        { name: 'priceId', label: 'Price ID', sortable: true, filter: true, },
        { name: 'fromDate', label: 'From Date' },
        { name: 'toDate', label: 'To Date' },
        { name: 'status', label: 'Status', sortable: true },
        { name: 'delete', label: 'Delete' },
    ];

    data: any[] = [
        {
            'priceId': '01',
            'fromDate': '2016-11-06',
            'toDate': '2017-12-06',
            'status': 1,
            'type': 2,
            'currency': 2,
            'unitPriceValue': [{
                'unitValue': '1.20',
                'fromTime': '04:20',
                'toTime': '21:43',
            }]
        },
        {
            'priceId': '02',
            'fromDate': '2017-10-30',
            'toDate': '2017-12-06',
            'status': 2,
            'type': 2,
            'currency': 1,
            'unitPriceValue': [{
                'unitValue': '1.20',
                'fromTime': '03:26',
                'toTime': '22:14',
            }]
        },
        {
            'priceId': '03',
            'fromDate': '2016-09-17',
            'toDate': '2017-12-06',
            'status': 1,
            'type': 2,
            'currency': 3,
            'unitPriceValue': [{
                'unitValue': '3.20',
                'fromTime': '05:20',
                'toTime': '20:23',
            }]
        },
        {
            'priceId': '04',
            'fromDate': '2017-05-20',
            'toDate': '2017-12-06',
            'status': 2,
            'type': 2,
            'currency': 2,
            'unitPriceValue': [{
                'unitValue': '6.45',
                'fromTime': '06:24',
                'toTime': '18:32',
            }]
        },
    ];


    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;

    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSizes: number[] = [5, 10, 20, 50];
    pageSize: number = this.pageSizes[0];
    sortBy: string = 'status';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;


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

    resultData: any;

    // show add dialog
    showAddDialog() {
        let dialogRef = this.dialog.open(CreateUnitPriceDialog, {
            width: '50%',
            disableClose: true,
            data: {
                priceId: '0',
                fromDate: '',
                toDate: '',
                status: 0,
                type: 0,
                currency: 0,
                unitPriceValue: [
                    {
                        unitValue: '1.00',
                        fromTime: '00:01',
                        toTime: '23:59',
                    }
                ]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.resultData = result;
            console.log('Result: ', this.resultData);
        });
    }


}

@Component({
    selector: 'create-unit-price',
    templateUrl: 'create-unit-price.html',
    styleUrls: ['./unit-price.component.scss']
})

export class CreateUnitPriceDialog implements OnInit {

    notifyRemove = false;
    notifyTimeLimit = false;
    notifyCompareTime = false;

    unitPriceValueTemp = [
        {
            unitValue: '1.00',
            fromTime: '00:01',
            toTime: '23:59',
        }
    ]

    constructor(
        public dialogRef: MatDialogRef<CreateUnitPriceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }



    ngOnInit() {
        console.log('Origin Data: ', this.data);
        console.log('unitPriceValueTemp: ', this.unitPriceValueTemp);
    }


    ngDoCheck() {
        this.disableTime();
        this.disableSaveButton();
    }

    //disable time field when choose all day
    disableTime() {
        if (this.data.type === 1 || this.data.type === 0) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
    }

    disableSaveButton() {
        if (this.data.priceId === '' ||
            this.data.fromDate === '' ||
            this.data.toData === '' ||
            this.data.status === 0 ||
            this.data.type === 0 ||
            this.data.currency === 0) {
            this.disabledSave = true;
        } else {
            this.disabledSave = false;
        }
    }


    files: any['csv'];
    disabled: boolean = false;
    disabledSave: boolean = false;

    status = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'Active' },
        { id: 2, label: 'Inactive' },
    ];

    types = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'All day' },
        { id: 2, label: 'From Time - To Time' },
    ];

    currency = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'SGD' },
        { id: 2, label: 'USD' },
        { id: 3, label: 'VND' },
    ];

    //Add - remove  unitPriceValue


    //Format Time
    addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
    createTimeFormat(day: Date): string {
        let h = this.addZero(day.getHours());
        let m = this.addZero(day.getMinutes());
        let Time = h + ':' + m;
        return Time;
    }

    compareTimes(fromTime: String, toTime: String): boolean {

        let partFrom = fromTime.match(/(\d+)\:(\d+)/);
        let partTo = toTime.match(/(\d+)\:(\d+)/);

        let hoursFrom = parseInt(partFrom[1], 10);
        let hoursTo = parseInt(partTo[1], 10);

        let minutesFrom = parseInt(partFrom[2], 10);
        let minutesTo = parseInt(partTo[2], 10);

        if (hoursFrom === hoursTo && minutesFrom >= minutesTo) {
            return false;
        } else if (hoursFrom > hoursTo) {
            return false;
        } else {
            return true;
        }
    }

    addUnit() {

        let day = new Date();
        let lastFromTime = this.unitPriceValueTemp[this.unitPriceValueTemp.length - 1].fromTime;
        let lastToTime = this.unitPriceValueTemp[this.unitPriceValueTemp.length - 1].toTime;
        let parts = lastToTime.match(/(\d+)\:(\d+)/);
        let hours = parseInt(parts[1], 10);
        let minutes = parseInt(parts[2], 10);
        day.setHours(hours);
        day.setMinutes(minutes + 1);
        let newFromTime = this.createTimeFormat(day);

        let compareValue = this.compareTimes(lastFromTime, lastToTime);

        if (compareValue == true) {
            if (hours === 23 && minutes === 59) {
                this.notifyTimeLimit = true;
                setTimeout(() => {
                    this.notifyTimeLimit = false;
                }, 3000);
            } else {
                this.unitPriceValueTemp.push({
                    unitValue: '0.00',
                    fromTime: newFromTime,
                    toTime: '23:59',
                });
            }
        } else {
            this.notifyCompareTime = true;
            setTimeout(() => {
                this.notifyCompareTime = false;
            }, 3000);
        }
    };

    removeUnit() {
        if (this.unitPriceValueTemp.length > 1) {
            this.unitPriceValueTemp.pop();
        } else {
            this.notifyRemove = true;
            setTimeout(() => {
                this.notifyRemove = false;
            }, 3000);
            return;
        }
    };

    toggleDisabled(): void {
        this.disabled = !this.disabled;
    };

    closeDialog() {
        if (this.data.type === 2) {
            this.data.unitPriceValue = this.unitPriceValueTemp;
        }
        this.dialogRef.close(this.data);
    }
}
