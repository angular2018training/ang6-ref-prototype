import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-energy-consumption',
  templateUrl: './energy-consumption.component.html',
  styleUrls: ['./energy-consumption.component.scss']
})
export class EnergyConsumptionComponent implements OnInit {
  dataChartB: any = [6500, 5900, 8000, 8100, 5600, 5500, 13500,
    6500, 5900, 8000, 8100, 5600, 5500, 13500, 6500, 5900, 8000,
    8100, 5600, 5500, 13500, 6500, 5900, 8000, 8100, 5600, 5500,
    13500, 8100, 5600];
  dataChartA: any = [5800, 4800, 7000, 7900, 5600, 5700, 12000,
    8800, 5800, 7000, 8900, 5600, 5700, 13000, 6800, 4800, 7000,
    8900, 5600, 4700, 12000, 6800, 5800, 7000, 7900, 5600, 5700,
    12000, 8000, 6000];

  dataTable = [];
  filterData = [];
  paging = {
    currentPage: 1,
    rowPerPage: 10,
    maxPage: 10,
    totalPage: 3,
    startRow: 1,
    endRow: 1,
    pages: [],
  };
  // dataTable:any = [
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   },
  //   {
  //     date:'10/1/2017',
  //     weekday:'Sun',
  //     load: '800',
  //     baseline:'880',
  //     actual: '836',
  //     adjusted: '836'
  //   }
  // ];
  isShow = false;
  isHide = false;
  customer = [
    {
      label: 'Helios GCS Viet Nam',
      id: 1
    },
    {
      label: 'Helios GCS USA',
      id: 2
    }
  ];
  reportType= [
    {
      label: 'Daily',
      id: 1
    }
  ];
  constructor(
  ) { }

  ngOnInit() {
    this.dataTable = Array.apply(null, Array(1200)).map(function () {
      return {
        date: '10/1/2017',
        weekday: 'Sun',
        load: Math.round(Math.random() * 1000),
        baseline: Math.round(Math.random() * 1000),
        actual: Math.round(Math.random() * 1000),
        adjusted: Math.round(Math.random() * 1000),
      }
    });
    this.configTable();
    this.filterTable();
  }
  //chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8', '10/9', '10/10',
    '10/11', '10/12', '10/13', '10/14', '10/15', '10/16', '10/17', '10/18', '10/19', '10/20',
    '10/21', '10/22', '10/23', '10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '10/30'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public chartColors: Array<any> = [
    {
      backgroundColor: '#3265be',
    },
    {
      backgroundColor: '#AAA',
    }
  ];

  public barChartData: any[] = [
    { data: this.dataChartB, label: 'Baseline Energy Consumption' },
    { data: this.dataChartA, label: 'Adjusted Actual Energy Consumption' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //table
  configTable() {
    let totalPage = Math.ceil(this.dataTable.length / this.paging.rowPerPage);
    this.paging.totalPage = totalPage;
    if (totalPage > this.paging.maxPage) {
      totalPage = this.paging.maxPage;
    }
    if (totalPage > 0) {
      this.paging.pages.push('««');
      this.paging.pages.push('«');
      for (let i = 1; i <= totalPage; i++) {
        this.paging.pages.push(i);
      }
      this.paging.pages.push('»');
      this.paging.pages.push('»»');
    }
  }
  filterTable() {
    let start = (this.paging.currentPage - 1) * this.paging.rowPerPage;
    this.filterData = this.dataTable.slice(start, start + this.paging.rowPerPage);
    this.paging.startRow = start + 1;
    this.paging.endRow = start + this.filterData.length;
  }
  goToPage(item) {
    if (isNaN(item)) {
      let currentPage = this.paging.currentPage;
      let totalPage = this.paging.totalPage;

      if (item == '««') {
        if (this.paging.currentPage != 1) {
          if (this.paging.pages[2] != 1) {
            this.paging.pages.splice(2, this.paging.pages.indexOf('»') - 2);
            for (let i = 1; i <= this.paging.maxPage; i++) {
              this.paging.pages.splice(i + 1, 0, i);
            }
          }
          this.paging.currentPage = 1;
        }
      } else if (item == '»»') {
        if (this.paging.currentPage != this.paging.totalPage) {
          if (this.paging.pages[this.paging.pages.indexOf('»') - 1] != this.paging.totalPage) {
            this.paging.pages.splice(2, this.paging.maxPage);
            let numOfPageEnd = Math.floor(this.paging.totalPage / this.paging.maxPage) * this.paging.maxPage;
            let j = 2;
            if (numOfPageEnd == this.paging.totalPage) {
              numOfPageEnd -= this.paging.maxPage;
            }
            for (let i = numOfPageEnd; i < this.paging.totalPage; i++) {
              this.paging.pages.splice(j++, 0, i + 1);
            }
          }
          this.paging.currentPage = this.paging.totalPage;
        }
      }
      if (item == '»' && currentPage < totalPage) {
        this.paging.currentPage++;
        if (this.paging.currentPage > this.paging.pages[11]) {
          let pageEnd = this.paging.pages[11];
          this.paging.pages.splice(2, this.paging.maxPage);
          let arrPage = [];
          let numNextPage = this.paging.maxPage;
          if (this.paging.totalPage - pageEnd < numNextPage) {
            numNextPage = this.paging.totalPage - pageEnd;
          }
          for (let i = 1; i <= numNextPage; i++) {
            this.paging.pages.splice(1 + i, 0, pageEnd + i);
          }
        }
      } else if (item == '«' && currentPage > 1) {
        this.paging.currentPage--;
        if (this.paging.currentPage < this.paging.pages[2]) {
          let pageStart = this.paging.pages[2];
          let arrPage = [];
          let numPrevPage = this.paging.maxPage;
          this.paging.pages.splice(2, this.paging.pages.indexOf('»') - 2);
          for (let i = 1; i <= numPrevPage; i++) {
            this.paging.pages.splice(2, 0, pageStart - i);
          }
        }
      }
    } else {
      this.paging.currentPage = item;
    }
    this.filterTable();
  }
  showReport() {
    this.isShow = true;
  }
  showFilter() {
    this.isHide = !this.isHide;
  }
}