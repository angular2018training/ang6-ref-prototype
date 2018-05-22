import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilitiesService } from 'app/services/utilities.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})


export class CustomerDetailComponent implements OnInit {

  countries = [];

  arrayProvinces = [
    {
      countryID: 0,
      provinces: [
        { id: 0, name: '- Select an option -' },
        { id: 1, name: 'Vietnam' },
        { id: 2, name: 'Japan' },
      ]
    },
    {
      countryID: 0,
      provinces: [
        { id: 0, name: '- Select an option -' },
        { id: 1, name: 'Ha Noi' },
        { id: 2, name: 'Ho Chi Minh' },
      ]
      //,"Binh Thuan","Ca Mau","Can Tho","Cao Bang","Dac Lak","Da Nang","Dong Nai","Dong Thap","Gia Lai","Ha Giang","Hai Duong","Hai Phong","Ha Nam","Ha Noi","Ha Tay","Ha Tinh","Hoa Binh","Ho Chi Minh","Hung Yen","Khanh Hoa","Kien Giang","Kon Tum","Lai Chau","Lam Dong","Lang Son","Lao Cai","Long An","Nam Dinh","Nghe An","Ninh Binh","Ninh Thuan","Phu Tho","Phu Yen","Quang Binh","Quang Nam","Quang Ngai","Quang Ninh","Quang Tri","Soc Trang","Son La","Tay Ninh","Thai Binh","Thai Nguyen","Thanh Hoa","Thua Thien-Hue","Tien Giang","Tra Vinh","Tuyen Quang","Vinh Long","Vinh Phuc","Yen Bai"
    }
  ];
  timeZones = [
    {
      uct: '+7',
      label: '(UTC+07:00) Ha Noi, Viet Nam'
    },
    {
      uct: '+9',
      label: '(UTC+09:00) Tokyo, Japan'
    }
  ];


  customerID = 'CL_001';
  customerName;
  selectedCountry;
  selectedProvince;
  provinces;
  address;
  email;
  phoneNumber;
  userName;
  password;
  confirmPassword;
  selectedTimeZone;

  isCreatedScreen: boolean;
  idSelectedCP: number;
  isDetail = false;
  selectedTabIndex = 0;

  changeCountry(event) {
    this.selectedCountry = event.value;
    //set province with selected country
    this.provinces = this.arrayProvinces[this.selectedCountry].provinces;
    // change country -> clear selected province
    this.selectedProvince = '';
  }

  changeProvince(event) {
    this.selectedProvince = event.value;
  }

  constructor(private activatedRoute: ActivatedRoute, private _UtilitiesService: UtilitiesService) { }

  getListCountries() {
    this.countries = [
      { id: 0, name: "Singapore" },
      { id: 1, name: "Viet Nam" }
    ];
  }

  getCustomerInfomation() {
    //mock object
    this.customerName = 'GCS Viet Nam';
    this.selectedCountry = this.countries[0].id
    this.provinces = this.arrayProvinces[this.selectedCountry].provinces;
    this.selectedProvince = this.arrayProvinces[this.selectedCountry].provinces[0].id;
    this.address = ' 9 Raffles Place, #39-00, Republic Plaza';
    this.email = 'admin@gcs-vn.com';
    this.phoneNumber = '1800 4722 669';
    this.userName = 'gcsvn001';
    this.password = '123456';
    this.confirmPassword = '123456';
    this.selectedTimeZone = this.timeZones[0].uct;
  }

  ngOnInit() {
    this.getListCountries();
    if (this.activatedRoute.snapshot.data) {
      this.isCreatedScreen = this.activatedRoute.snapshot.data.isCreated;
    }

    if (!this.isCreatedScreen) {
      this.getCustomerInfomation();
    }
  }

  showSuccess() {
    if (this.email && this.phoneNumber && this.customerName) {
      this._UtilitiesService.showSuccess('Saved success');
    } else {
      this._UtilitiesService.showWarning('Please fill on required field');
    }
  }
}
