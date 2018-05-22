import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { UtilitiesService } from 'app/services/utilities.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-chiller-plant-detail',
  templateUrl: './chiller-plant-detail.component.html',
  styleUrls: ['./chiller-plant-detail.component.scss']
})
export class ChillerPlantDetailComponent implements OnInit {
  @Input('cpSelected') cpSelected : object;
  @Output('isCancel') isCancel = new EventEmitter<boolean>();
  data: any[] = [
    {
      'id': 1,
      'nameCP': 'Chiller Plant 01',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        },
        {
          id: 'CCT02',
          name: 'CCT 02'
        },
        {
          id: 'CCT03',
          name: 'CCT 03'
        }
      ]
    },
    {
      'id': 2,
      'nameCP': 'Chiller Plant 02',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        },
        {
          id: 'CCT02',
          name: 'CCT 02'
        }
      ]
    },
    {
      'id': 3,
      'nameCP': 'Chiller Plant 03',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        },
        {
          id: 'CCT02',
          name: 'CCT 02'
        },
        {
          id: 'CCT03',
          name: 'CCT 03'
        }
      ]
    },
    {
      'id': 4,
      'nameCP': 'Chiller Plant 04',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        }
      ]
    },
    {
      'id': 5,
      'nameCP': 'Chiller Plant 05',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        }
      ]
    },
    {
      'id': 6,
      'nameCP': 'Chiller Plant 06',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        },
        {
          id: 'CCT02',
          name: 'CCT 02'
        }
      ]
    },
    {
      'id': 7,
      'nameCP': 'Chiller Plant 07',
      'nameBuilding': 'QJSC 9',
      'ccts': [
        {
          id: 'CCT01',
          name: 'CCT 01'
        },
        {
          id: 'CCT02',
          name: 'CCT 02'
        },
        {
          id: 'CCT03',
          name: 'CCT 03'
        }
      ]
    }
  ];
  public dataCollector = {
    username: 'username',
    password: 'abcdef',
    restAPIURL: 'http://weatherservice.com/data ...',
  }
  itemSelectedCP = {};
  arrayProvinces = [
    {
      countryID: 8,
      provinces: [
        { id: 0, name: "Afghanistan" },
        { id: 1, name: "Armenia" },
        { id: 2, name: "Brunei" },
        { id: 3, name: "Cambodia" },
        { id: 4, name: "China" },
        { id: 5, name: "Indonesia" },
        { id: 6, name: "Iran" },
        { id: 7, name: "Japan" },
        { id: 8, name: "Vietnam" }
      ]
    },
    {
      countryID: 10,
      provinces: [
        { id: 0, name: "Hanoi" },
        { id: 1, name: "An Giang" },
        { id: 2, name: "Bac Giang" },
        { id: 3, name: "Bac Kan" },
        { id: 4, name: "Bac Lieu" },
        { id: 5, name: "Bac Ninh" },
        { id: 6, name: "Ba Ria-Vung Tau" },
        { id: 7, name: "Ben Tre" },
        { id: 8, name: "Binh Dinh" },
        { id: 9, name: "Binh Duong" },
        { id: 10, name: "Ho Chi Minh" }
      ]
    }
  ];
  selectedTabIndex = 0;
  isShowInfo = true;
  constructor(
    private _UtilitiesService: UtilitiesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.onReloadData(this.cpSelected);
    // setTimeout(()=>{ this.selectedTabIndex = 0; }, 1000);
  }
  ngAfterViewInit() {
  }

  // realoadData
  onReloadData(chillerPlant) {
    if (chillerPlant) {
      this.itemSelectedCP = _.find(this.data, (item) => {
        return item.id == chillerPlant.id;
      });
    }
    // console.log('Chiller Plant Detail', this.itemSelectedCP);
  }
  
  // show massage
  showError() {
    this._UtilitiesService.showError('Error message');
  }
  showSuccess(message) {
    this._UtilitiesService.showSuccess(message);
  }
  // show confirm save
  showSaveConfirm(item) {
    this._UtilitiesService.showConfirmDialog('Do you want save this information ?', (result) => {
      if (result) {
        this.showSuccess('Information saved successfull');
      }
    });
  }
  showInformation() {
    this.isShowInfo = !this.isShowInfo;
  }
  cancelDetail() {
    this.isCancel.emit(false);
  }
}
