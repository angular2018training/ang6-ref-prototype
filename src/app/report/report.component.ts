import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

    newData: any[] = [];
    columns: ITdDataTableColumn[] = [
        { name: 'time', label: 'Time', filter: true, sortable: true },
        { name: 'reportType', label: 'Report Type' },
        { name: 'reportName', label: 'Report Name', hidden: false },
        { name: 'view', label: 'Action', width: 120 },
        { name: 'download', label: '', width: 120 },

    ];

    data: any[] = [
        {
            'time': '2017-10-23',
            'reportType': 'Enegry Consumption',
            'reportName': '20171023_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-23',
            'reportType': 'Enegry Saving',
            'reportName': '20171023_Energy_Saving.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-22',
            'reportType': 'Enegry Consumption',
            'reportName': '20171022_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-22',
            'reportType': 'Enegry Saving',
            'reportName': '20171022_Energy_Saving.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-21',
            'reportType': 'Enegry Consumption',
            'reportName': '20171021_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-21',
            'reportType': 'Enegry Saving',
            'reportName': '20171021_Energy_Saving.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-20',
            'reportType': 'Enegry Consumption',
            'reportName': '20171023_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-20',
            'reportType': 'Enegry Consumption',
            'reportName': '20171023_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-20',
            'reportType': 'Enegry Consumption',
            'reportName': '20171023_Energy_Consumption.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-20',
            'reportType': 'Enegry Saving',
            'reportName': '20171023_Energy_Saving.pdf',
            'view': 'View',
            'download': 'Download',
        },
        {
            'time': '2017-10-20',
            'reportType': 'Enegry Saving',
            'reportName': '20171023_Energy_Saving.pdf',
            'view': 'View',
            'download': 'Download',
        },


    ];

    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;

    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSizes: number[] = [8, 16, 30];
    pageSize: number = this.pageSizes[0];
    sortBy: string = 'time';
    selectedRows: any[] = [];
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    filteredECData: any[] = [];
    filteredESData: any[] = [];

    constructor(
        private router: Router,
        private _dataTableService: TdDataTableService,
    ) {

    }

    filterEC() {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].reportType === "Enegry Consumption") {
                this.filteredECData.push(this.data[i]);
            }
        }
    }

    filterES() {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].reportType === "Enegry Saving") {
                this.filteredESData.push(this.data[i]);
            }
        }
    }

    softStatus = 0;
    onClickEC() {
        this.softStatus = 1;
        this.filter();
    }
    onClickES() {
        this.softStatus = 2;
        this.filter();
    }
    onClickAll() {
        this.softStatus = 0;
        this.filter();
    }


    ngOnInit() {
        this.filter();
        this.filterEC();
        this.filterES();
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

        if (this.softStatus === 0) {
            this.newData = this.data;
        } else if (this.softStatus === 1) {
            this.newData = this.filteredECData;
        } else {
            this.newData = this.filteredESData;
        }

        let excludedColumns: string[] = this.columns
            .filter((column: ITdDataTableColumn) => {
                return ((column.filter === undefined && column.hidden === true) ||
                    (column.filter !== undefined && column.filter === false));
            }).map((column: ITdDataTableColumn) => {
                return column.name;
            });
        this.newData = this._dataTableService.filterData(this.newData, this.searchTerm, true, excludedColumns);
        this.filteredTotal = this.newData.length;
        this.newData = this._dataTableService.sortData(this.newData, this.sortBy, this.sortOrder);
        this.newData = this._dataTableService.pageData(this.newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = this.newData;

    }
}