import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

@Component({
    selector: 'excution-report',
    templateUrl: './excution-report.component.html',
    styleUrls: ['./excution-report.component.scss']
})

export class ExcutionReportComponent implements OnInit {
    
        newData: any[] = [];
        columns: ITdDataTableColumn[] = [
            { name: 'reportCreationDate', label: 'Time', filter: true, sortable: true },
            { name: 'chillerPlantName', label: 'Chiller Plant Name' },
            { name: 'buildingName', label: 'Building Name' },
            { name: 'reportName', label: 'Report Name', hidden: false },
            // { name: 'view', label: 'Action', width: 120 },
            { name: 'download', label: 'Action', width: 120 },
    
        ];
    
        data: any[] = [
            {
                'reportCreationDate': '2017-10-12',
                'chillerPlantName': 'Chiller Plant 01',
                'buildingName': 'Helios',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-14',
                'chillerPlantName': 'Chiller Plant 02',
                'buildingName': 'QTSC9',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-17',
                'chillerPlantName': 'Chiller Plant 02',
                'buildingName': 'QTSC9',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-20',
                'chillerPlantName': 'Chiller Plant 01',
                'buildingName': 'Helios',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-22',
                'chillerPlantName': 'Chiller Plant 02',
                'buildingName': 'QTSC9',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-24',
                'chillerPlantName': 'Chiller Plant 01',
                'buildingName': 'Helios',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
            {
                'reportCreationDate': '2017-10-25',
                'chillerPlantName': 'Chiller Plant 02',
                'buildingName': 'QTSC9',
                'reportName': '20171023_ExcutionReport.pdf',
                'view': 'View',
                'download': 'Download',
            },
        ];

        chiller_note = 0;
        chillerData: any[] = [
            { id: 0, label: '- Select an option -' },
            { id: 1, label: 'Chiller Plant 01' },
            { id: 2, label: 'Chiller Plant 02' },
        ];
    
        filteredData: any[] = this.data;
        filteredTotal: number = this.data.length;
    
        searchTerm: string = '';
        fromRow: number = 1;
        currentPage: number = 1;
        pageSizes: number[] = [8, 16, 30];
        pageSize: number = this.pageSizes[0];
        sortBy: string = 'reportCreationDate';
        selectedRows: any[] = [];
        sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
    
        constructor(
            private router: Router,
            private _dataTableService: TdDataTableService,
        ) {
    
        }
    
    
    
        ngOnInit() {
            this.filter();
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
            this.newData = this.filteredData;
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