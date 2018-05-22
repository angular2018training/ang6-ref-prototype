import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { UtilitiesService } from 'app/services/utilities.service';
import { LoginComponent, LoginService } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChillerPlantsComponent } from './chiller-plants/chiller-plants.component';
import { PlantModelComponent } from './plant-model/plant-model.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';

import { OperatorManagementComponent } from './operator-management/operator-management.component';
import { OperatorListComponent } from './operator-list/operator-list.component';
import { OperatorAddComponent } from './operator-add/operator-add.component';
import { OperatorDetailComponent } from './operator-detail/operator-detail.component';
import { ChillerPlantDetailComponent } from './chiller-plant-detail/chiller-plant-detail.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { MonitoringExecutionHistoryComponent } from './monitoring-execution-history/monitoring-execution-history.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringExecutionDetailComponent } from './monitoring-execution-detail/monitoring-execution-detail.component';
import { SMSSettingComponent } from './sms-setting/sms-setting.component';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { SetPointHistoryComponent } from './set-point-history/set-point-history.component';
import { EnergyReportComponent } from './report/energy-report/energy-report.component';
import { ExcutionReportComponent } from './report/excution-report/excution-report.component';

import { DataRetentionComponent } from './data-retention/data-retention.component';
import { SystemConfigurationComponent } from './system-configuration/system-configuration.component';
import { SMSServiceComponent } from './sms-service/sms-service.component';
import { EmailServiceComponent } from './email-service/email-service.component';
import { SystemParameterComponent } from './system-parameter/system-parameter.component';

import { AnalysisToolComponent } from './analysis-tool/analysis-tool.component';
import { EnergySavingComponent } from './energy-saving/energy-saving.component';
import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';

import { BMSScreenComponent } from './bms-screen/bms-screen.component';

import { PAGES } from './constant';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [LoginService],
    children: [
      { path: "", redirectTo: "/customer-management/customer-list", pathMatch: "full" },
      {
        path: "customer-management", children: [
          { path: "", component: CustomerManagementComponent },
          {
            path: "customer-list", children: [
              { path: "", component: CustomerListComponent },
              { path: "customer-detail", component: CustomerDetailComponent, data: { isCreated: false } },
              { path: "create-customer", component: CustomerDetailComponent, data: { isCreated: true } }
            ]
          }
        ]
      },
      {
        path: "chiller-plants", children: [
          { path: "", component: ChillerPlantsComponent },
          { path: "chiller-plant-detail", component: ChillerPlantDetailComponent }
        ]
      },
      {
        path: "home", children: [
          { path: "", component: HomeComponent },
          { path: "dashboard", component: DashboardComponent },
        ]
      },
      {
        path: "operator-management", children: [
          { path: "", component: OperatorManagementComponent },
          {
            path: "operator-list", children: [
              { path: "", component: OperatorListComponent },
              { path: "operator-add", component: OperatorAddComponent },
              { path: "operator-detail", component: OperatorDetailComponent },
            ]
          }
        ]
      },
      {
        path: "monitoring", children: [
          { path: "", component: MonitoringComponent },
          {
            path: "monitoring-execution-history", children: [
              { path: "", component: MonitoringExecutionHistoryComponent },
              { path: "execution-sending-detail", component: MonitoringExecutionDetailComponent }
            ]
          },
        ]
      },
      {
        path: "sms-setting", children: [
          { path: "", component: SMSSettingComponent }
        ]
      },
      {
        path: "notification-setting", children: [
          { path: "", component: NotificationSettingComponent }
        ]
      },
      {
        path: "report", children: [
          { path: "energy-report", component: EnergyReportComponent },
          { path: "excution-report", component: ExcutionReportComponent },
        ]
      },
      // {
      //   path: "analysis-tool", children: [
      //     { path: "", component: AnalysisToolComponent }
      //   ]
      // },
      {
        path: "analysis-tool", children: [
          { path: "", component: AnalysisToolComponent },
          { path: "energy-consumption", component: EnergyConsumptionComponent },
          { path: "energy-saving", component: EnergySavingComponent },
        ]
      },
      {
        path: "set-point-history", children: [
          { path: "", component: SetPointHistoryComponent }
        ]
      },
      {
        path: "plant-model", children: [
          { path: "", component: PlantModelComponent }
        ]
      },
      { path: "login", component: LoginComponent },
      { path: "change-password", component: ChangePasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      {
        path: "system-configuration", children: [
          { path: "", component: SystemConfigurationComponent },
          {
            path: "data-retention", children: [
              { path: "", component: DataRetentionComponent }
            ]
          },
          {
            path: "sms-service", children: [
              { path: "", component: SMSServiceComponent }
            ]
          },
          {
            path: "email-service", children: [
              { path: "", component: EmailServiceComponent }
            ]
          },
          {
            path: "system-parameter", children: [
              { path: "", component: SystemParameterComponent }
            ]
          },
        ]
      },
      { path: '**', redirectTo: '/login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private breadcrumbService: BreadcrumbService, private UtilitiesService: UtilitiesService) {
    router.events.subscribe((event) => {
      // if (event instanceof NavigationStart) {}
    });
    breadcrumbService.addFriendlyNameForRoute(PAGES.COMMON.LOGIN, 'Login');
    breadcrumbService.addFriendlyNameForRoute(PAGES.COMMON.RESET_PASSWORD, 'Reset Password');
    breadcrumbService.addFriendlyNameForRoute(PAGES.COMMON.CHANGE_PASSWORD, 'Change Password');

    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.HOME, 'Home');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.DASH_BOARD, 'Dashboard');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CUSTOMER_MANAGEMENT, 'Customer Management');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CUSTOMER_LIST, 'Customer List');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CUSTOMER_CREATE, 'Create Customer');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CUSTOMER_DETAIL, 'Customer Detail');

    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.OPERATOR_MANAGEMENT, 'Operator Management');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.OPERATOR_LIST, 'Operator List');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.OPERATOR_ADD, 'Create Operator');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.OPERATOR_DETAIL, 'Operator Detail');

    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CHILLER_PLANT, 'Chiller Plant');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.CHILLER_PLANT_DETAIL, 'Chiller Plant Detail');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.MONITORING, 'Monitoring');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.MONITORING_EXCUTION_HISTORY, 'Monitoring Execution History');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.EXECUTION_SENDING_DETAIL, 'Execution-Sending Details');

    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.SYSTEM_CONFIGURATION, 'System Configuration');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.DATA_RETENTION, 'Data Retention');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.SMS_SERVICE, 'SMS Service');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.EMAIL_SERVICE, 'Email Service');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.SYSTEM_PARAMETER, 'System Parameter');

    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.ANALYSIS_TOOL, 'Analysis Tool');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.ENERGY_SAVING, 'Energy Saving');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.ENERGY_CONSUMPTION, 'Energy Consumption');
    breadcrumbService.addFriendlyNameForRoute(PAGES.OPERATOR.PLAN_MODEL, 'Plant Model');

    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.REPORT, 'Report');
    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.ENERGY_REPORT, 'Energy Report');
    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.EXCUTION_REPORT, 'Excution Report');
    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.SMS_SETTING, 'SMS Setting');
    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.NOTIFICATION_SETTING, 'Notification Setting');
    breadcrumbService.addFriendlyNameForRoute(PAGES.CUSTOMER.SET_POINT_HISTORY, 'Navigation History');

  }
}