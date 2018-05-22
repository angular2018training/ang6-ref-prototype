// import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { UtilitiesService } from 'app/services/utilities.service';
import { Observable } from 'rxjs/Observable';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'system-parameter',
  templateUrl: './system-parameter.component.html',
  styleUrls: ['./system-parameter.component.scss']
})

export class SystemParameterComponent implements OnInit {
  // countries = [];

  // arrayProvinces = [
  //   {
  //     countryID: 0,
  //     provinces: [
  //       { id: 0, name: '- Select an option -' },
  //       { id: 1, name: 'Vietnam' },
  //       { id: 2, name: 'Japan' },
  //     ]
  //   },
  //   {
  //     countryID: 0,
  //     provinces: [
  //       { id: 0, name: '- Select an option -' },
  //       { id: 1, name: 'Ha Noi' },
  //       { id: 2, name: 'Ho Chi Minh' },
  //     ]
  //     //,"Binh Thuan","Ca Mau","Can Tho","Cao Bang","Dac Lak","Da Nang","Dong Nai","Dong Thap","Gia Lai","Ha Giang","Hai Duong","Hai Phong","Ha Nam","Ha Noi","Ha Tay","Ha Tinh","Hoa Binh","Ho Chi Minh","Hung Yen","Khanh Hoa","Kien Giang","Kon Tum","Lai Chau","Lam Dong","Lang Son","Lao Cai","Long An","Nam Dinh","Nghe An","Ninh Binh","Ninh Thuan","Phu Tho","Phu Yen","Quang Binh","Quang Nam","Quang Ngai","Quang Ninh","Quang Tri","Soc Trang","Son La","Tay Ninh","Thai Binh","Thai Nguyen","Thanh Hoa","Thua Thien-Hue","Tien Giang","Tra Vinh","Tuyen Quang","Vinh Long","Vinh Phuc","Yen Bai"
  //   }
  // ];
  // timeZones = [
  //   {
  //     uct: '+7',
  //     label: '(UTC+07:00) Ha Noi, Viet Nam'
  //   },
  //   {
  //     uct: '+9',
  //     label: '(UTC+09:00) Tokyo, Japan'
  //   }
  // ];


  // customerID = 'CL_001';
  // customerName;
  // selectedCountry;
  // selectedProvince;
  // provinces;
  // address;
  // email;
  // phoneNumber;
  // userName;
  // password;
  // confirmPassword;
  // selectedTimeZone;

  // isCreatedScreen: boolean;
  // idSelectedCP: number;
  // isDetail = false;
  // selectedTabIndex = 0;

  // changeCountry(event) {
  //   this.selectedCountry = event.value;
  //   //set province with selected country
  //   this.provinces = this.arrayProvinces[this.selectedCountry].provinces;
  //   // change country -> clear selected province
  //   this.selectedProvince = '';
  // }

  // changeProvince(event) {
  //   this.selectedProvince = event.value;
  // }

  // constructor(private activatedRoute: ActivatedRoute, private _UtilitiesService: UtilitiesService) { }

  // getListCountries() {
  //   this.countries = [
  //     { id: 0, name: "Singapore" },
  //     { id: 1, name: "Viet Nam" }
  //   ];
  // }

  // getCustomerInfomation() {
  //   //mock object
  //   this.customerName = 'GCS Viet Nam';
  //   this.selectedCountry = this.countries[0].id
  //   this.provinces = this.arrayProvinces[this.selectedCountry].provinces;
  //   this.selectedProvince = this.arrayProvinces[this.selectedCountry].provinces[0].id;
  //   this.address = ' 9 Raffles Place, #39-00, Republic Plaza';
  //   this.email = 'admin@gcs-vn.com';
  //   this.phoneNumber = '1800 4722 669';
  //   this.userName = 'gcsvn001';
  //   this.password = '123456';
  //   this.confirmPassword = '123456';
  //   this.selectedTimeZone = this.timeZones[0].uct;
  // }

  // ngOnInit() {
  //   this.getListCountries();
  // }

  // showSuccess() {
  //   if (this.email && this.phoneNumber && this.customerName) {
  //     this._UtilitiesService.showSuccess('Saved success');
  //   } else {
  //     this._UtilitiesService.showWarning('Please fill on required field');
  //   }
  // }

  //table
  // units = ['','kW/RT', '%', '-', 'C','J/g/k','m3/min/kW','mAq','Hz',''];
  // units = ['kW/RT', '%', '-', 'C','J/g/k','m3/min/kW','mAq','Hz'];
  units = [
    'kW/RT',
    '-',
    'J/g/k',
    '-',
    'm3/min/kW',
    'm3/min/kW',
    'C',
    'C',
    'C',
    'C',
    'mAq',
    '%',
    '%',
    'C',
    '%',
    '%',
    'Hz',
  ]
  parameterNames = [
    'Conversion factor from RT to kW',
    'Conversion factor for Chiller’s "Input Power [kW]"',
    'Water heat capacity',
    'Conversion factor for CT’s Capacity [kW]"',
    'Conversion factor for CT’s "Water Flow Rate [m3/min]"',
    'Conversion factor for CT’s "Air Volume [m3/min]"',
    'Chiller’s default parameter "Entering Chilled Water Temperature"',
    'Chiller’s default parameter "Leaving Chilled Water Temperature"',
    'Chiller’s default parameter "Entering Condenser Water Temperature"',
    'Chiller’s default parameter "Leaving Condenser Water Temperature"',
    'Pump’s default parameter "Head(Proportional factor)"',
    'Pump’s default parameter "Maximum Flow Rate Ratio"',
    'Pump’s default parameter "Minimum Flow Rate Ratio"',
    'CT’s default parameter "Outdoor Wet-bulb Temperature"',
    'CT’s default parameter "Maximum Air Volume Rate"',
    'CT’s default parameter "Minimum Air Volume Rate"',
    'CT’s default parameter "Rated Frequency"',
  ]

  columns: ITdDataTableColumn[] = [
    { name: 'parameterName', label: 'Parameter Name', sortable: true },
    { name: 'unit', label: 'Unit', sortable: true },
    { name: 'value', label: 'Value', sortable: true },
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
  // pageSize: number = this.pageSizes[0];
  pageSize: number = 20;
  sortBy: string = 'parameterName';
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
    let i = 1;
    for (let index = 0; index < 17; index++) {
      let type = Math.floor((Math.random() * 2) + 1)
      let data = {
        // parameterName: this.parameterNames[index],
        // unit: this.units[Math.floor((Math.random() * (this.units.length - 1)) + 0)],
        // value: Math.floor((Math.random() * 100) + 0),
        parameterName: this.parameterNames[index],
        unit: this.units[index],
        value: Math.floor((Math.random() * 100) + 0),
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
      // this.currentState = this.listState[0];
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
      // this.showSuccess("Edit record successfull !");
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
  remove(row) {
    this.deleteAction(row);
    this.showSuccess("Delete record successfull !");
  }
  save() {
    this.showSuccess("Edit record successfull !");
  }
  preventText(e) {
    if (isNaN(e.key) && e.key!='.') {
      e.preventDefault();
    }
    // console.log(e);
  }
}
