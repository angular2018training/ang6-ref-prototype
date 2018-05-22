import { Input, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'customerID', label: 'Customer ID', sortable: true, width: 100 },
    { name: 'customerName', label: 'Customer Name', filter: true, sortable: true },
    { name: 'address', label: 'Address', sortable: true },
    { name: 'province', label: 'Province', sortable: true },
    { name: 'country', label: 'Country', sortable: true},
    { name: 'phoneNumber', label: 'PhoneNumber', sortable: true },
    { name: 'email', label: 'Email', sortable: true },
    { name: 'action', label: '', width: 100 }
  ];

  data: any[] = [
    {
      'customerID': 'CL_001',
      'customerName': 'HSBC Singapore',
      'address': '320 Orchard Rd',
      'province': 'Singapore',
      'country': 'Singapore',
      'phoneNumber': '1800 4722 669',
      'email': 'direct@hsbc.com.sg'
    },
    {
      'customerID': 'CL_002',
      'customerName': 'HUAWEI',
      'address': 'Shenzhen',
      'province': 'Shenzhen',
      'country': 'China',
      'phoneNumber': '1800 9999 258',
      'email': 'huaweiconnect@huawei.com'
    },
    {
      'customerID': 'CL_003',
      'customerName': 'Dentsu(Japan)',
      'address': 'Tokyo',
      'province': 'Tokyo',
      'country': 'Japan',
      'phoneNumber': '1800 5427 276',
      'email': 'denstu@dentsu.com.jp'
    },
    {
      'customerID': 'CL_004',
      'customerName': 'HSBC Singapore',
      'address': '320 Orchard Rd',
      'province': 'Singapore',
      'country': 'Singapore',
      'phoneNumber': '1800 4722 669',
      'email': 'direct@hsbc.com.sg'
    },
    {
      'customerID': 'CL_005',
      'customerName': 'HUAWEI',
      'address': 'Shenzhen',
      'province': 'Shenzhen',
      'country': 'China',
      'phoneNumber': '1800 9999 258',
      'email': 'huaweiconnect@huawei.com'
    },
    {
      'customerID': 'CL_006',
      'customerName': 'Dentsu(Japan)',
      'address': 'Tokyo',
      'province': 'Tokyo',
      'country': 'Japan',
      'phoneNumber': '1800 5427 276',
      'email': 'denstu@dentsu.com.jp'
    },
    {
      'customerID': 'CL_007',
      'customerName': 'Dentsu(Japan)',
      'address': 'Tokyo',
      'province': 'Tokyo',
      'country': 'Japan',
      'phoneNumber': '1800 5427 276',
      'email': 'denstu@dentsu.com.jp'
    }
  ];

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'customerName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  @ViewChild('filter') filterEle: ElementRef;
  
  constructor(private _dataTableService: TdDataTableService, private _UtilitiesService: UtilitiesService, private router: Router) { 
  }

  ngOnInit() {
    this.filter();
    this.toggleDefaultFullscreenDemo();
    // input search event
    Observable.fromEvent(this.filterEle.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      this.search(this.filterEle.nativeElement.value);
    });
  }

  showConfirmDialog(event) {
    event.preventDefault();
    event.stopPropagation();
    this._UtilitiesService.showConfirmDialog('Do you want to delete this customer?', (result) => {
      if (result) {
        // handle here
      }
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

  onRowClick(event) {
    let row = event.row;
    this.router.navigate(['/customer-management/customer-list/customer-detail']);
  }
}
