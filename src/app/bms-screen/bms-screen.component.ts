import { Inject, Input, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router } from '@angular/router';
import { PAGES } from 'app/constant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilitiesService } from 'app/services/utilities.service';


// component dialog add
@Component({
  selector: 'add-bms-image-dialog',
  templateUrl: 'add-bms-image-dialog.html',
  styleUrls: ['./bms-screen.component.scss']
})
export class AddBMSImageDialog implements OnInit {
  type;
  ngOnInit(): void {
    this.type = this.data["type"];
    if (this.type == 'view') {
      this.imageName = 'bms';
      this.fileName = 'bms.png';
      this.uploadedImage = "assets/img/bms-screen.png";
    }
  }
  
  imageName = '';
  fileName = '';
  uploadedImage = '';
  note;
  fileSelectMsg: string = 'No file selected yet.';
  fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
    this.fileName = file.name;

    let self = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      self.uploadedImage = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
   
    this.fileUploadMsg = file.name;
  }

  randomImageData() {
    let ramdomNumber = Math.floor((Math.random() * 10) + 1);
    this.imageName = 'bms' + ramdomNumber ;
    this.fileName = 'bms' + ramdomNumber + '.png';
    this.uploadedImage = "assets/img/bms-screen.png";
  }

  nextImage() {
    this.randomImageData();
  }

  previousImage() {
    this.randomImageData();
  }

  uploadEvent(file: File): void {

  }

  saveImage() {
  }

  cancelEvent(): void {
    this.uploadedImage = '';
    this.fileSelectMsg = 'No file selected yet.';
    this.fileUploadMsg = 'No file uploaded yet.';
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  constructor(
    public dialogRef: MatDialogRef<AddBMSImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

}


@Component({
  selector: 'bms-screen',
  templateUrl: './bms-screen.component.html',
  styleUrls: ['./bms-screen.component.scss']
})

export class BMSScreenComponent implements OnInit {
  constructor(private _UtilitiesService: UtilitiesService, public dialog: MatDialog, private router: Router, private _dataTableService: TdDataTableService) { }

  ngOnInit() {
    this.filter();    
  }


  openBMSImageDialog(): void {

    let dialogRef = this.dialog.open(AddBMSImageDialog, {
      width: '800px',
      disableClose: true,
      data: { type: 'add' }      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  columns: ITdDataTableColumn[] = [
    { name: 'imageName', label: 'Image Name', sortable: false},
    { name: 'fileName', label: 'File Name', filter: true, sortable: true },
    { name: 'note', label: 'Note', sortable: false },
    { name: 'createdDate', label: 'Created Date', sortable: false },
    { name: 'action', label: 'Delete', width: 100 }
  ];

  data: any[] = [
    {
      'imageName': 'Image01',
      'fileName': 'Image01.png',
      'note': 'image 01',
      'createdDate': '2017-10-09 09:54:54',
    },
    {
      'imageName': 'Image02',
      'fileName': 'Image02.png',
      'note': 'image 02',
      'createdDate': '2017-11-09 09:54:54',
    },
    {
      'imageName': 'Image03',
      'fileName': 'Image03.png',
      'note': 'image 03',
      'createdDate': '2017-12-09 09:54:54',
    }
  ];
  uploadedImage = "assets/img/bms-screen.png";

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizes[0];
  sortBy: string = 'fileName';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

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

  viewImageDetail() {
    let dialogRef = this.dialog.open(AddBMSImageDialog, {
      width: '800px',
      disableClose: true,
      data: { type: 'view' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showConfirmDialog() {
    this._UtilitiesService.showConfirmDialog('Do you want to delete this image?', (result) => {
      if (result) {
        // handle here
      }
    });
  }
}