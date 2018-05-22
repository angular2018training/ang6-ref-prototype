import * as jsPDF from 'jspdf'
import * as html2canvas from "html2canvas";

import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'app/services/utilities.service';

@Component({
  selector: 'energy-saving',
  templateUrl: './energy-saving.component.html',
  styleUrls: ['./energy-saving.component.scss']
})
export class EnergySavingComponent implements OnInit {
  customerName: number = 1;
  customerNames = [
    { id: 1, label: 'Helios GCS VietNam' },
    { id: 2, label: 'Hitachi' },
  ];

  reportType: number = 1;
  reportTypes = [
    { id: 1, label: 'Daily' },
    { id: 3, label: 'Monthly' },
  ];

  each_row = {
    date: '10/1/2017',
    weekday: 'Sun',
    load: 800,
    baseline: 880,
    actual: 836,
    esNaviA: 3,
    esNaviB: 3,
    esNaviC: 0,
    duration: 0,
    adjusted: 836,
    energy: 44,
    cost: 6.6,
  };
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

  // isReport: boolean = false;
  isReport: boolean = false;
  isFilter: boolean = true;
  isShow = false;
  isHide = false;
  strFilter: string = 'Show Filter';
  srcImg: string = null;

  constructor(private _UtilitiesService: UtilitiesService) { }
  ngOnInit() {
    // for (let i = 0; i < 20; i++) {
    //   let temp = Math.floor((Math.random() * 1000) + 0);
    //   this.each_row.load=temp;
    //   this.dataTable.push(this.each_row);
    // }

    let i = 1;
    this.dataTable = Array.apply(null, Array(1200)).map(function () {

      return {
        date: '10/1/2017',
        // date: '10/'+(i++)+'/2017',
        weekday: 'Sun',
        load: Math.round(Math.random() * 1000),
        baseline: Math.round(Math.random() * 1000),
        actual: Math.round(Math.random() * 1000),
        esNaviA: Math.round(Math.random() * 100),
        esNaviB: Math.round(Math.random() * 100),
        esNaviC: Math.round(Math.random() * 100),
        duration: Math.round(Math.random() * 100),
        adjusted: Math.round(Math.random() * 1000),
        energy: Math.round(Math.random() * 100),
        // cost: Math.round(Math.random() * 10) + Math.round(Math.random()).toFixed(2),
        cost: (Math.round((Math.round(Math.random() * 200) + Math.random()) * 100) / 100).toFixed(2),
      };
    });
    this.configTable();
    this.filterTable();

    for (let i = 1; i <= 30; i++) {
      this.barChartLabels.push('10/' + i);
      this.barChartData[0].data.push(Math.floor((Math.random() * 1000) + 0));
    }

    // console.log(cytoscape);
    // var cy = cytoscape({
    //   container: document.getElementById('cy'), // container to render in
    //   elements: [
    //     { data: { id: 'a' } },
    //     { data: { id: 'b' } },
    //     {
    //       data: {
    //         id: 'ab',
    //         source: 'a',
    //         target: 'b'
    //       }
    //     }],
    //   style: [
    //     {
    //       selector: 'node',
    //       style: {
    //         shape: 'hexagon',
    //         'background-color': 'red'
    //       }
    //     }]
    // });
  }

  //excute
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

    // console.log(this.paging);
  }
  filterTable() {
    let start = (this.paging.currentPage - 1) * this.paging.rowPerPage;
    // this.filterData = this.dataTable.slice((this.paging.currentPage-1)*this.paging.rowPerPage, this.paging.currentPage*this.paging.rowPerPage+this.paging.rowPerPage);
    this.filterData = this.dataTable.slice(start, start + this.paging.rowPerPage);

    // let start = (this.paging.currentPage - 1) * this.paging.rowPerPage;
    this.paging.startRow = start + 1;
    this.paging.endRow = start + this.filterData.length;
  }

  //view
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

            // let numOfPageEnd=this.paging.totalPage-Math.floor(this.paging.totalPage/this.paging.maxPage);
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
    // let start = (this.paging.currentPage - 1) * this.paging.rowPerPage;
    // this.paging.startRow = start + 1;
    // this.paging.endRow = start + this.paging.rowPerPage;
    this.filterTable();

    // if(this.paging.pages.length<this.paging.totalPage && this.paging.pages[3]<this.paging.currentPage && this.paging.currentPage<this.paging.pages[10]){
    //   console.log('update row');
    // }
  }
  filter() {
    this.isFilter = !this.isFilter;
    this.strFilter = this.isFilter ? 'Hide Filter' : 'Show Filter';
  }
  showReport() {
    this.isReport = true;
    this.isFilter = false;
    this.strFilter = "Show Filter";
  }
  // showReport() {
  //   this.isShow = true;
  // }
  // showFilter() {
  //   this.isHide = !this.isHide;
  // }
  exportPDF() {
    // $('.element').css('position','initial'); // Change absolute to initial
    // $my_view = $('#my-view');
    // var useHeight = $('#my-view').prop('scrollHeight');
    // html2canvas($my_view[0], {
    //   height: useHeight,
    //   useCORS: true,
    //   allowTaint: true,
    //   proxy: "your proxy url",
    //   onrendered: function (canvas) {
    //       var imgSrc = canvas.toDataURL();
    //       var popup = window.open(imgSrc);
    //       $('.element').css('position','absolute');
    //   }
    // });

    // $('#energy_saving_table').css('position', 'initial'); // Change absolute to initial
    // let $my_view = $('#energy_saving_table');
    // var useHeight = $('#energy_saving_table').prop('scrollHeight');
    // html2canvas($my_view[0], {
    //   height: useHeight,
    //   useCORS: true,
    //   allowTaint: true,
    //   proxy: "your proxy url",
    //   onrendered: (canvas) => {
    //     var imgSrc = canvas.toDataURL();
    //     var popup = window.open(imgSrc);
    //     $('.element').css('position', 'absolute');
    //     console.log(imgSrc);
    //   }
    // });

    // let nameFile = "energy_saving_report.pdf";
    // const pdf = new jsPDF();

    // html2canvas($('#id_energy_saving_bound')[0], {
    //   onrendered: function (canvas) {
    //     let imgTable = canvas.toDataURL("image/png");
    //     pdf.addImage(imgTable, 'png', 10, 10, 200, 50);//left,top,width,height
    //     pdf.save(nameFile);
    //   }
    // });

    // $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    // setTimeout(function() {
    //   $(".energy_saving_bound").animate({ scrollTop: $('.energy_saving_bound').height()*2 }, 1000);  
    // }, 2000);

    // $(".energy_saving_bound").animate({ scrollTop: $('.energy_saving_bound').height()*2 }, 100);

    // html2canvas($('#infoCustomter')[0], {
    //   onrendered: (canvas) => {
    //     pdf.addImage(canvas.toDataURL("image/png"), 'png', 10, 10, 200, 50);//left,top,width,height
    //     pdf.addImage(document.getElementsByTagName('canvas')[0].toDataURL(), 'png', 15, 70, 180, 60);
    //     $(".energy_saving_bound").animate({ scrollTop: $('.energy_saving_bound').height() * 2 }, 100);
    //     setTimeout(()=>{
    //       html2canvas($('#energy_saving_table>table'), {
    //         onrendered: (canvas2) => {
    //           pdf.addImage(canvas2.toDataURL("image/png"), 'png', 15, 140, 180, 50);
    //           pdf.save(nameFile);
    //         }
    //       });
    //     }, 1000);
    //   }
    // });

    // function SnapShotDOM(target, call) {
    //   var data = target.className;
    //   target.className += " html2canvasreset";//set className - Jquery: $(target).addClass("html2canvasreset");
    //   html2canvas(target, {
    //     "onrendered": function (canvas) {
    //       target.className = data;//old className - Jquery: $(target).removeClass("html2canvasreset");
    //       call(canvas);
    //     }
    //   });
    // }

    // SnapShotDOM(document.body, (canvas) => {
    //   this.srcImg = canvas.toDataURL();
    // });

    // let nameFile = "energy_consumption_report.pdf";
    // var pdf = new jsPDF('p', 'pt', 'a4');
    // const heightBodyOld = document.body.style.height;
    // // document.body.style.height = '1700px';
    // document.body.style.height = '2000px';
    // html2canvas(document.getElementById('id_energy_saving_content'), {
    //   onrendered: (canvas) => {
    //     let img = canvas.toDataURL("image/png");
    //     // pdf.addImage(img, 'png', 20, 15, 255, 180);
    //     pdf.addImage(img, 'png', 40, 40, 510, 480);
    //     pdf.save(nameFile);
    //     document.body.style.height = heightBodyOld;
    //   },
    //   // width: 600,
    //   // height: 1000
    // });

    this._UtilitiesService.showConfirmDialog('Do you want export pdf file ?',
      (result) => {
        if (result) {
          let nameFile = "energy_saving_report.pdf";
          var pdf = new jsPDF('p', 'pt', 'a4');

          // let minWidth = 1100, minHeight = 1700;
          let minWidth = 1060, minHeight = 1700;
          const widthBodyOld = document.body.style.width;
          const heightBodyOld = document.body.style.height;
          let widthBody = document.body.clientWidth;
          let heightBody = document.body.clientHeight;

          if (widthBody < minWidth) {
            widthBody = minWidth;
            document.body.style.width = widthBody + 'px';
          }
          if (heightBody < minHeight) {
            heightBody = minHeight;
            document.body.style.height = heightBody + 'px';
          }

          html2canvas(document.getElementById('graph'), {
            onrendered: (canvas) => {
              let img = canvas.toDataURL("image/png");
              pdf.addImage(img, 'png', 40, 40, 510, 480);
              pdf.save(nameFile);
              document.body.style.width = widthBodyOld;
              document.body.style.height = heightBodyOld;
            },
          });

          /////////////////////
          // let nameFile = "energy_saving_report.pdf";
          // var pdf = new jsPDF('p', 'pt', 'a4');
          // const widthBodyOld = document.body.style.width;
          // document.body.style.width = '1700px';
          // const heightBodyOld = document.body.style.height;
          // document.body.style.height = '1700px';
          // html2canvas(document.getElementById('graph'), {
          //   onrendered: (canvas) => {
          //     let img = canvas.toDataURL("image/png");
          //     pdf.addImage(img, 'png', 40, 40, 510, 480);
          //     pdf.save(nameFile);
          //     document.body.style.width = widthBodyOld;
          //     document.body.style.height = heightBodyOld;
          //   },
          // });
        }
      });
  }

  //chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public chartColors: Array<any> = [
    {
      backgroundColor: '#3265be',
    },
  ];

  // public barChartLabels: string[] = ['10/1', '10/2', '10/3', '10/4', '10/5', '10/6', '10/7', '10/8'];
  // public barChartData: any[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Month 10' },
  // ];
  public barChartLabels: string[] = [];
  public barChartData: any[] = [
    { data: [], label: 'Daily Energy Savings' },
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // graphData = {
  //   nodes: [
  //     { data: { id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle' } },
  //     { data: { id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse' } },
  //     { data: { id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon' } },
  //     { data: { id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle' } }
  //   ],
  //   edges: [
  //     { data: { source: 'j', target: 'e', faveColor: '#6FB1FC' } },
  //     { data: { source: 'j', target: 'k', faveColor: '#6FB1FC' } },
  //     { data: { source: 'j', target: 'g', faveColor: '#6FB1FC' } },

  //     { data: { source: 'e', target: 'j', faveColor: '#EDA1ED' } },
  //     { data: { source: 'e', target: 'k', faveColor: '#EDA1ED' } },

  //     { data: { source: 'k', target: 'j', faveColor: '#86B342' } },
  //     { data: { source: 'k', target: 'e', faveColor: '#86B342' } },
  //     { data: { source: 'k', target: 'g', faveColor: '#86B342' } },

  //     { data: { source: 'g', target: 'j', faveColor: '#F5A45D' } }
  //   ]
  // };
}