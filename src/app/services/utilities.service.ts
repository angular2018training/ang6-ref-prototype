import { Injectable, NgModule } from '@angular/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core';
import * as moment from 'moment'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from 'app/common/dialogs/confirm-dialog.component';

@Injectable()
export class UtilitiesService {
  private loadingCount = 0;
  private toastOpts = {
    toastLife: 2000,
    maxShown: 5,
    showCloseButton: true,
    enableHTML: true
  };
  constructor(private _loadingService: TdLoadingService, private toastr: ToastsManager, private dialog: MatDialog) { 
  }

  public formatTime(time) {
    return moment(time).format("YYYY/MM/DD HH:mm:ss");
  };

  public showLoading() {
    this.loadingCount++;
    this._loadingService.register();
  }

  public hideLoading() {
    setTimeout(() => {
      this.loadingCount--;
      if (this.loadingCount <= 0) {
        this._loadingService.resolve();
      }
    }, 100);
  }

  public showSuccess(message) {
    this.toastr.success(message, undefined, this.toastOpts);
  }

  public showError(message) {
    let opts = _.cloneDeep(this.toastOpts);
    opts.toastLife = 7000;
    this.toastr.error(message, undefined, opts);
  }

  public showWarning(message) {
    let opts = _.cloneDeep(this.toastOpts);
    opts.toastLife = 5000;
    this.toastr.warning(message, undefined, opts);
  }

  public showInfo(message) {
    let opts = _.cloneDeep(this.toastOpts);
    opts.toastLife = 4000;
    this.toastr.info(message, undefined, opts);
  }

  public showConfirmDialog(message, callback) {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { 
        title: 'Confirmation',
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(callback);
  }
}
