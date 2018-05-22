import * as $ from 'jquery';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from "./app.routing";
import { MatNativeDateModule, MatDatepickerModule, MatTabsModule, MatSidenavModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as _ from "lodash";
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';
import { CovalentDataTableModule, CovalentPagingModule, CovalentLoadingModule } from '@covalent/core';
import { MomentModule } from 'angular2-moment';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { CovalentFileModule } from '@covalent/core';
import { RecaptchaModule } from 'ng-recaptcha';

// services
import { UtilitiesService } from "./services/utilities.service";

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadingComponent } from './heading/heading.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ChillerPlantsComponent } from './chiller-plants/chiller-plants.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { LoginComponent, LoginService } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { OperatorManagementComponent } from './operator-management/operator-management.component';
import { OperatorListComponent } from './operator-list/operator-list.component';
import { OperatorDetailComponent, DialogOperatorEdit } from './operator-detail/operator-detail.component';
import { OperatorAddComponent } from './operator-add/operator-add.component';

import { ChillerPlantDetailComponent } from './chiller-plant-detail/chiller-plant-detail.component';
import { PlantModelComponent } from './plant-model/plant-model.component';
import { EditableInputComponent } from './common/components/editable-input.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { WeatherServiceComponent } from './weather-service/weather-service.component';

import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';

import { ConnectionListComponent } from './connection-list/connection-list.component';

import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringExecutionHistoryComponent } from './monitoring-execution-history/monitoring-execution-history.component';
import { MonitoringExecutionDetailComponent } from './monitoring-execution-detail/monitoring-execution-detail.component';
import { SMSSettingComponent } from './sms-setting/sms-setting.component';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { SetPointHistoryComponent } from './set-point-history/set-point-history.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { DataRetentionComponent } from './data-retention/data-retention.component';
import { SMSServiceComponent } from './sms-service/sms-service.component';
import { EmailServiceComponent } from './email-service/email-service.component';
import { SystemParameterComponent } from './system-parameter/system-parameter.component';
import { PerformanceCurveComponent, PerformanceCurveAddDialog, PerformanceCurveDetailDialog } from './performance-curve/performance-curve.component';
import { ExcutionReportComponent } from './report/excution-report/excution-report.component';
import { EnergyReportComponent } from './report/energy-report/energy-report.component';

import { AnalysisToolComponent } from './analysis-tool/analysis-tool.component';
import { EnergySavingComponent } from './energy-saving/energy-saving.component';
import { BMSScreenComponent } from './bms-screen/bms-screen.component';
import { UnitPriceComponent } from './unit-price/unit-price.component'
import { BaseLineComponent } from './base-line/base-line.component';
import { UnitPriceDetailComponent } from './unit-price/unit-price-detail/unit-price-detail.component';


// dialogs
import { ConfirmDialog } from './common/dialogs/confirm-dialog.component';
import { AddChillerPlantDialog } from './chiller-plants/chiller-plants.component';
// import { ChillerPlantEquipmentComponent } from './chiller-plant-equipment/chiller-plant-equipment.component';
// import { AddChillerComponent } from './add-chiller/add-chiller.component';
// import { AddChillerDialog } from './add-chiller/add-chiller.component';
// import { AddCoolingTowerComponent } from './add-cooling-tower/add-cooling-tower.component';
// import { AddCoolingDialog } from './add-cooling-tower/add-cooling-tower.component';
// import { UpdateCoolingTowerComponent } from './update-cooling-tower/update-cooling-tower.component';
// import { UpdateCoolingDialog } from './update-cooling-tower/update-cooling-tower.component';
import { UpdateCoolingDialog } from './plant-model/plant-model.component';
// import { UpdateChillerComponent } from './update-chiller/update-chiller.component';
// import { UpdateChillerDialog } from './update-chiller/update-chiller.component';
import { UpdateChillerDialog } from './plant-model/plant-model.component';
// import { AddCctComponent } from './add-cct/add-cct.component';
// import { AddCctDialog } from './add-cct/add-cct.component';
import { CreateScheduleDialog } from './schedule-create/schedule-create.component';
import { AddBMSImageDialog } from './bms-screen/bms-screen.component';
import { CreateUnitPriceDialog } from './unit-price/unit-price.component';
import { ErrorMessageMonitoringDialog } from './monitoring-execution-history/monitoring-execution-history.component';
import { DataMappingAddMCTDialog } from './data-mapping/data-mapping.component';
import { UpdateCHWPDialog } from './plant-model/plant-model.component';
import { UpdateCDWPDialog, BackupCDWPDialog, BackupCHWPDialog, BackupCCTDialog } from './plant-model/plant-model.component';
import { AddCctDialog } from './plant-model/plant-model.component';
import { UnitPriceDialog } from './unit-price/unit-price-detail/unit-price-detail.component';
// remove later
export class CustomToastOption extends ToastOptions { // can create separate .ts file for class
  positionClass = 'toast-bottom-right';
}

import { PhoneObject } from '../app/sms-setting/model/phone';
import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import * as html2canvas from "html2canvas";
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { AddNotificationDialog } from './add-notification/add-notification.component';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';
import { UpdateNotificationDialog } from './update-notification/update-notification.component';
import { CreateConnectionComponent } from './create-connection/create-connection.component';
import { CreateConnectionDialog } from './create-connection/create-connection.component';
import { UpdateConnectionComponent } from './update-connection/update-connection.component';
import { UpdateConnectionDialog } from './update-connection/update-connection.component';
import { ScheduleUpdateComponent } from './schedule-update/schedule-update.component';
import { UpdateScheduleDialog } from './schedule-update/schedule-update.component';
import { DataMappingComponent } from './data-mapping/data-mapping.component';

//service
import { TestService } from './api-service/test.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeadingComponent,
    NavigationComponent,
    FooterComponent,
    ChillerPlantsComponent,
    CustomerListComponent,
    ConfirmDialog,
    AddChillerPlantDialog,
    PerformanceCurveAddDialog,
    PerformanceCurveDetailDialog,

    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,

    OperatorManagementComponent,
    OperatorListComponent,
    OperatorDetailComponent,
    OperatorAddComponent,
    DialogOperatorEdit,

    ChillerPlantDetailComponent,
    EditableInputComponent,
    WeatherServiceComponent,

    ScheduleListComponent,
    ScheduleCreateComponent,

    ConnectionListComponent,

    CustomerDetailComponent,
    MonitoringExecutionHistoryComponent,
    MonitoringExecutionDetailComponent,
    // ChillerPlantEquipmentComponent,
    PlantModelComponent,
    SMSSettingComponent,
    NotificationSettingComponent,
    SetPointHistoryComponent,
    EnergyReportComponent,
    ExcutionReportComponent,
    // AddChillerComponent,
    // AddChillerDialog,
    // AddCoolingTowerComponent,
    // AddCoolingDialog,
    // UpdateCoolingTowerComponent,
    UpdateCoolingDialog,
    // UpdateChillerComponent,
    UpdateChillerDialog,
    SMSServiceComponent,
    DataRetentionComponent,
    // AddCctComponent,
    AddCctDialog,
    CustomerManagementComponent,
    MonitoringComponent,
    SystemConfigurationComponent,
    EmailServiceComponent,
    SystemParameterComponent,
    PerformanceCurveComponent,
    EnergyConsumptionComponent,
    AnalysisToolComponent,
    EnergySavingComponent,
    ExportPDFComponent,
    AddNotificationComponent,
    AddNotificationDialog,
    UpdateNotificationComponent,
    UpdateNotificationDialog,
    CreateConnectionComponent,
    CreateConnectionDialog,
    UpdateConnectionComponent,
    UpdateConnectionDialog,
    CreateScheduleDialog,
    ScheduleUpdateComponent,
    BMSScreenComponent,
    AddBMSImageDialog,
    UpdateScheduleDialog,
    BaseLineComponent,
    ErrorMessageMonitoringDialog,
    DataMappingComponent,
    DataMappingAddMCTDialog,
    UnitPriceComponent,
    CreateUnitPriceDialog,
    UpdateCHWPDialog,
    UpdateCDWPDialog,
    BackupCDWPDialog,
    BackupCHWPDialog,
    BackupCCTDialog,
    UnitPriceDetailComponent,
    UnitPriceDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule, MatPaginatorModule,
    MatSortModule, MatSelectModule,
    MatDialogModule, MatCheckboxModule,
    MatRadioModule,
    FlexLayoutModule,
    // BreadcrumbsModule,
    Ng2BreadcrumbModule.forRoot(),
    CovalentDataTableModule, CovalentPagingModule, CovalentLoadingModule,
    MomentModule,
    ChartsModule,
    ToastModule.forRoot(),
    HttpModule,
    CovalentFileModule,
    RecaptchaModule.forRoot(),
    MatGridListModule,
  ],
  providers: [
    UtilitiesService, {
      provide: ToastOptions,
      useClass: CustomToastOption
    },
    LoginService,
    PhoneObject,
    TestService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialog,
    AddChillerPlantDialog,
    DialogOperatorEdit,
    // AddChillerDialog,
    // AddCoolingDialog,
    UpdateCoolingDialog,
    UpdateChillerDialog,
    AddCctDialog,
    AddNotificationDialog,
    UpdateNotificationDialog,
    CreateConnectionDialog,
    UpdateConnectionDialog,
    CreateScheduleDialog,
    AddBMSImageDialog,
    UpdateScheduleDialog,
    ErrorMessageMonitoringDialog,
    DataMappingAddMCTDialog,
    CreateUnitPriceDialog,
    UpdateCHWPDialog,
    UpdateCDWPDialog,
    BackupCDWPDialog,
    BackupCHWPDialog,
    BackupCCTDialog,
    UnitPriceDialog,

    PerformanceCurveAddDialog, PerformanceCurveDetailDialog,
  ]
})
export class AppModule { }