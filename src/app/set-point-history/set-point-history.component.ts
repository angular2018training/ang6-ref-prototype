import { ActivatedRoute, Params } from '@angular/router';
import { Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';


@Component({
    selector: 'set-point-history',
    templateUrl: './set-point-history.component.html',
    styleUrls: ['./set-point-history.component.scss']
})
export class SetPointHistoryComponent implements OnInit {

    columns: ITdDataTableColumn[] = [
        { name: 'navigationTime', label: 'Navigation Time', sortable: true },
        { name: 'chillerPlantName', label: 'Chiller Plant Name' },
        { name: 'type', label: 'Type',width: 100 },
        { name: 'equipmentName', label: 'Equipment Name', hidden: false },
        { name: 'setPoint', label: 'Set-Point', filter: true, sortable: true, width: 300 },
        { name: 'navigationValue', label: 'Navigation Value' },
        { name: 'measureUnit', label: 'Unit' },
    ];

    data: any[] = [
        {
            'navigationTime': '2017-10-23 10:20:00',
            'chillerPlantName': '330 - Chiller Plant 01',
            'type': 'CT',
            'equipmentName': 'Cooling Tower 01',
            'setPoint': 'Cooling Tower Water Leaving Temperature',
            'navigationValue': '53.1',
            'measureUnit': 'C',
        },
        {
            'navigationTime': '2017-10-23 10:20:00',
            'chillerPlantName': '330 - Chiller Plant 01',
            'type': 'CDWP',
            'equipmentName': 'CDWP 01',
            'setPoint': 'Variable Speed Drive',
            'navigationValue': '80',
            'measureUnit': 'Hz or %',
        },
        {
            'navigationTime': '2017-10-23 10:20:00',
            'chillerPlantName': '330 - Chiller Plant 02',
            'type': 'CT',
            'equipmentName': 'Cooling Tower 01',
            'setPoint': 'Cooling Tower Water Leaving Temperature',
            'navigationValue': '53.1',
            'measureUnit': 'C',
        },
        {
            'navigationTime': '2017-10-23 10:20:00',
            'chillerPlantName': '330 - Chiller Plant 02',
            'type': 'CDWP',
            'equipmentName': 'CDWP 01',
            'setPoint': 'Variable Speed Drive',
            'navigationValue': '80',
            'measureUnit': 'Hz or %',
        },

    ];

    filteredData: any[] = this.data;
    filteredTotal: number = this.data.length;

    searchTerm: string = '';
    fromRow: number = 1;
    currentPage: number = 1;
    pageSizes: number[] = [5, 10, 20, 50];
    pageSize: number = this.pageSizes[0];
    sortBy: string = 'navigationTime';
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

    chillerPlants = [
        { id: 0, value: 'All' },
        { id: 1, value: 'Chiller plant 1' },
        { id: 2, value: 'Chiller plant 2' },
        { id: 3, value: 'Chiller plant 3' }
    ];

    types = [
        { id: 0, value: 'All' },
        { id: 1, value: 'CT' },
        { id: 2, value: 'CDWP' }
    ];


    equipments = [
        { id: 0, value: 'All' },
        { id: 1, value: 'Cooling Tower 01' },
        { id: 2, value: 'CDWP 01' }
    ];

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

}
