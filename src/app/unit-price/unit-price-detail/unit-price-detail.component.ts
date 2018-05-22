import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
    selector: 'app-unit-price-detail',
    templateUrl: './unit-price-detail.component.html',
    styleUrls: ['./unit-price-detail.component.scss']
})

export class UnitPriceDetailComponent implements OnInit {

    @Input('selectedUnit') itemSelected = {};
    updateData: any = {};

    constructor(
        public dialog: MatDialog,
    ) {

    }

    ngOnInit() {

    }

    //showDialog
    showUnitDialog(item) {
        const configDialog: any = {
            width: '50%',
            disableClose: true,
            data: item,
        };
        let dialogRef: any;
        dialogRef = this.dialog.open(UnitPriceDialog, configDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateData = result;
                console.log('result', this.updateData);
            }
        });
    }
}

//component for Dialog

@Component({
    selector: 'app-unit-price-dialog',
    templateUrl: './unit-price-dialog.component.html',
    styleUrls: ['./unit-price-detail.component.scss']
})

export class UnitPriceDialog implements OnInit {

    notifyRemove = false;
    notifyTimeLimit = false;
    notifyCompareTime = false;
    dataTemp: any;

    constructor(
        public dialogRef: MatDialogRef<UnitPriceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.dataTemp = _.cloneDeepWith(this.data);
    }

    ngDoCheck() {
        this.disableTime();
        this.disableSaveButton();
    }


    disableTime() {
        if (this.dataTemp.type === 1) {
            this.disabled = true;

        } else {
            this.disabled = false;
        }
    }


    onNoSaveClick(): void {
        this.dialogRef.close();
    }

    files: any['csv'];
    disabled: boolean = false;
    disabledSave: boolean = false;

    status = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'Active' },
        { id: 2, label: 'Inactive' },
    ];


    types = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'All day' },
        { id: 2, label: 'From Time - To Time' },
    ];

    currency = [
        { id: 0, label: '- Select an option -' },
        { id: 1, label: 'SGD' },
        { id: 2, label: 'USD' },
        { id: 3, label: 'VND' },
    ];

    disableSaveButton() {
        if (this.dataTemp.priceId === '' ||
            this.dataTemp.fromDate === '' ||
            this.dataTemp.toDate === '' ||
            this.dataTemp.status === 0 ||
            this.dataTemp.type === 0 ||
            this.dataTemp.currency === 0) {
            this.disabledSave = true;
        } else {
            this.disabledSave = false;
        }
    }

    //Add - remove  unitPriceValue

    //Format Time
    addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
    createTimeFormat(day: Date): string {
        let h = this.addZero(day.getHours());
        let m = this.addZero(day.getMinutes());
        let Time = h + ':' + m;
        return Time;
    }

    compareTimes(fromTime: String, toTime: String): boolean {

        let partFrom = fromTime.match(/(\d+)\:(\d+)/);
        let partTo = toTime.match(/(\d+)\:(\d+)/);

        let hoursFrom = parseInt(partFrom[1], 10);
        let hoursTo = parseInt(partTo[1], 10);

        let minutesFrom = parseInt(partFrom[2], 10);
        let minutesTo = parseInt(partTo[2], 10);

        if (hoursFrom === hoursTo && minutesFrom >= minutesTo) {
            return false;
        } else if (hoursFrom > hoursTo) {
            return false;
        } else {
            return true;
        }
    }


    addUnit() {

        let day = new Date();
        let lastFromTime = this.dataTemp.unitPriceValue[this.dataTemp.unitPriceValue.length - 1].fromTime;
        let lastToTime = this.dataTemp.unitPriceValue[this.dataTemp.unitPriceValue.length - 1].toTime;
        let parts = lastToTime.match(/(\d+)\:(\d+)/);
        let hours = parseInt(parts[1], 10);
        let minutes = parseInt(parts[2], 10);
        day.setHours(hours);
        day.setMinutes(minutes + 1);
        let newFromTime = this.createTimeFormat(day);

        let compareValue = this.compareTimes(lastFromTime, lastToTime);

        if (compareValue == true) {
            if (hours === 23 && minutes === 59) {
                this.notifyTimeLimit = true;
                setTimeout(() => {
                    this.notifyTimeLimit = false;
                }, 3000);
            } else {
                this.dataTemp.unitPriceValue.push({
                    unitValue: '0.00',
                    fromTime: newFromTime,
                    toTime: '23:59',
                });
            }
        } else {
            this.notifyCompareTime = true;
            setTimeout(() => {
                this.notifyCompareTime = false;
            }, 3000);
        }
    };

    removeUnit() {
        if (this.dataTemp.unitPriceValue.length > 1) {
            this.dataTemp.unitPriceValue.pop();
        } else {
            this.notifyRemove = true;
            setTimeout(() => {
                this.notifyRemove = false;
            }, 3000);
            return;
        }
    };

    toggleDisabled(): void {
        this.disabled = !this.disabled;
    };

    //view
    changeType(e) {
        if (e.value == 1) {
            // console.log(1);
            console.log(this.data);
            this.data.unitPriceValue[0].fromTime = "01:00";
            this.data.unitPriceValue[0].toTime = "23:59";
        }
    }
}