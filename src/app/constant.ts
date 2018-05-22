export const VARIABLES = {
  USERNAME: 'username',
  ISLOGIN: 'isLogin',
  ROLE: 'role',
  PAGE_NOT_LOGIN: {
    LOGIN: 'login',
    CHANGE_PASSWORD: 'change_password',
    RESET_PASSWORD: 'reset_password',
  },
  OPERATOR: 'operator',
  CUSTOMER: 'customer',
  SECRET_KEY: 'es-navi-secret',
  ACCOUNT_INFO: 'es-navi-layout',
}

export const PAGES = {
  COMMON: {
    LOGIN: '/login',
    CHANGE_PASSWORD: '/change-password',
    RESET_PASSWORD: '/reset-password',
  },
  OPERATOR: {
    HOME: '/home',
    DASH_BOARD: '/home/dashboard',
    CUSTOMER_MANAGEMENT: '/customer-management',
    CUSTOMER_LIST: '/customer-management/customer-list',
    CUSTOMER_DETAIL: '/customer-management/customer-list/customer-detail',
    CUSTOMER_CREATE: '/customer-management/customer-list/create-customer',
    OPERATOR_MANAGEMENT: '/operator-management',
    OPERATOR_LIST: '/operator-management/operator-list',
    OPERATOR_ADD: '/operator-management/operator-list/operator-add',
    OPERATOR_DETAIL: '/operator-management/operator-list/operator-detail',
    CHILLER_PLANT: '/chiller-plants',
    CHILLER_PLANT_DETAIL: '/chiller-plants/chiller-plant-detail',
    PLAN_MODEL: '/plant-model',
    MONITORING: '/monitoring',
    MONITORING_EXCUTION_HISTORY: '/monitoring/monitoring-execution-history',
    EXECUTION_SENDING_DETAIL: '/monitoring/monitoring-execution-history/execution-sending-detail',
    SYSTEM_CONFIGURATION: '/system-configuration',
    DATA_RETENTION: '/system-configuration/data-retention',
    SMS_SERVICE: '/system-configuration/sms-service',
    EMAIL_SERVICE: '/system-configuration/email-service',
    SYSTEM_PARAMETER: '/system-configuration/system-parameter',

    ANALYSIS_TOOL: '/analysis-tool',
    ENERGY_SAVING: '/analysis-tool/energy-saving',
    ENERGY_CONSUMPTION: '/analysis-tool/energy-consumption'
  },
  CUSTOMER: {
    SMS_SETTING: '/sms-setting',
    NOTIFICATION_SETTING: '/notification-setting',
    SET_POINT_HISTORY: '/set-point-history',
    CUSTOMER_DETAIL: '/customer-management/customer-list/customer-detail',
    REPORT: '/report',
    ENERGY_REPORT: '/report/energy-report',
    EXCUTION_REPORT: '/report/excution-report',
    NAVIGATION_HISTORY: '/navigation-history',
  }
}

export const TITLE_OBJ = {
  TITLE_OBJ: {
    '/home': 'HOME TITLE',
    '/home/dashboard': 'List Dashboard',
    '/customer-management/customer-list': 'Customer List',
    '/customer-management/customer-list/customer-detail': 'Customer Details',
    '/customer-management/customer-list/create-customer': 'Create Customer',

    '/operator-management/operator-list': 'Operator List',
    '/operator-management/operator-list/operator-add': 'Create Operator',
    '/operator-management/operator-list/operator-detail': 'Operator Detail',
    '/monitoring/monitoring-execution-history': 'Execution-Sending-History',
    '/monitoring/monitoring-execution-history/execution-sending-detail': 'Execution-Sending Details',

    '/system-configuration/data-retention': 'Data Retention',
    '/system-configuration/sms-service': 'SMS Service',
    '/system-configuration/email-service': 'Email Service',
    '/system-configuration/system-parameter': 'System Parameter',

    '/plant-model': 'Plant Model',
    '/analysis-tool/energy-saving': 'Energy Saving Report',
    '/analysis-tool/energy-consumption': 'Energy Consumption Report',

    //customer
    '/sms-setting': 'SMS Setting',
    '/notification-setting': 'Notification Setting',
    '/set-point-history': 'Navigation History',
    '/report': 'Report',
    '/report/energy-report': 'Energy Report',
    '/report/excution-report': 'Excution Report',
  },

  PARRENT_OBJ: {
    '/customer-management/customer-list': PAGES.OPERATOR.CUSTOMER_MANAGEMENT,
    '/customer-management/customer-list/customer-detail': PAGES.OPERATOR.CUSTOMER_MANAGEMENT,
    '/customer-management/customer-list/create-customer': PAGES.OPERATOR.CUSTOMER_MANAGEMENT,

    '/operator-management/operator-list': PAGES.OPERATOR.OPERATOR_MANAGEMENT,
    '/operator-management/operator-list/operator-detail': PAGES.OPERATOR.OPERATOR_MANAGEMENT,
    '/operator-management/operator-list/operator-add': PAGES.OPERATOR.OPERATOR_MANAGEMENT,

    '/monitoring/monitoring-execution-history': PAGES.OPERATOR.MONITORING,
    '/monitoring/monitoring-execution-history/execution-sending-detail': PAGES.OPERATOR.MONITORING,

    '/analysis-tool/energy-saving': PAGES.OPERATOR.ANALYSIS_TOOL,

    '/system-configuration/data-retention': PAGES.OPERATOR.SYSTEM_CONFIGURATION,
    '/system-configuration/sms-service': PAGES.OPERATOR.SYSTEM_CONFIGURATION,
    '/system-configuration/email-service': PAGES.OPERATOR.SYSTEM_CONFIGURATION,
  }
}



export const APP_URL = {
  COMMON: [PAGES.COMMON.LOGIN, PAGES.COMMON.CHANGE_PASSWORD, PAGES.COMMON.RESET_PASSWORD],
  OPERATOR: [
    PAGES.OPERATOR.HOME,
    PAGES.OPERATOR.DASH_BOARD,
    PAGES.OPERATOR.CUSTOMER_MANAGEMENT,
    PAGES.OPERATOR.CUSTOMER_LIST,
    PAGES.OPERATOR.CUSTOMER_DETAIL,
    PAGES.OPERATOR.CUSTOMER_CREATE,

    PAGES.OPERATOR.OPERATOR_MANAGEMENT,
    PAGES.OPERATOR.OPERATOR_LIST,
    PAGES.OPERATOR.OPERATOR_ADD,
    PAGES.OPERATOR.OPERATOR_DETAIL,
    PAGES.OPERATOR.MONITORING,
    PAGES.OPERATOR.MONITORING_EXCUTION_HISTORY,
    PAGES.OPERATOR.EXECUTION_SENDING_DETAIL,
    PAGES.OPERATOR.DATA_RETENTION,
    PAGES.OPERATOR.SMS_SERVICE,
    PAGES.OPERATOR.EMAIL_SERVICE,
    PAGES.OPERATOR.SYSTEM_PARAMETER,
    PAGES.OPERATOR.SYSTEM_CONFIGURATION,

    PAGES.OPERATOR.ANALYSIS_TOOL,
    PAGES.OPERATOR.ENERGY_SAVING,
    PAGES.OPERATOR.ENERGY_CONSUMPTION,
    PAGES.OPERATOR.PLAN_MODEL,
  ],
  CUSTOMER: [
    PAGES.CUSTOMER.SMS_SETTING,
    PAGES.CUSTOMER.NOTIFICATION_SETTING,
    PAGES.CUSTOMER.CUSTOMER_DETAIL,
    PAGES.CUSTOMER.SET_POINT_HISTORY,
    PAGES.CUSTOMER.REPORT,
    PAGES.CUSTOMER.ENERGY_REPORT,
    PAGES.CUSTOMER.EXCUTION_REPORT,
  ]
}

export const MENUS_OF_ROLE = {
  MENU_FOR_OPERATOR: [
    {
      "id": "10",
      "label": "CUSTOMER MANAGEMENT",
      "type": "toggle",
      "pages": [
        {
          "id": "11",
          "label": "Customer List",
          "url": PAGES.OPERATOR.CUSTOMER_MANAGEMENT,
          "type": "page"
        }
      ]
    },
    {
      "id": "20",
      "label": "OPERATOR MANAGEMENT",
      "type": "toggle",
      "pages": [
        {
          "id": "21",
          "label": "Operator List",
          "url": PAGES.OPERATOR.OPERATOR_MANAGEMENT,
          "type": "page"
        }
      ]
    },
    {
      "id": "30",
      "label": "MONITORING",
      "type": "toggle",
      "pages": [
        {
          "id": "21",
          "label": "Monitoring Execution History",
          "url": PAGES.OPERATOR.MONITORING,
          "type": "page"
        }
      ]
    },
    {
      "id": "40",
      "label": "ANALYSIS TOOL",
      "type": "toggle",
      "pages": [
        {
          "id": "41",
          "label": "Energy Consumption",
          "url": PAGES.OPERATOR.ENERGY_CONSUMPTION,
          "type": "page"
        },
        {
          "id": "42",
          "label": "Energy Saving",
          "url": PAGES.OPERATOR.ENERGY_SAVING,
          "type": "page"
        },
        {
          "id": "43",
          "label": "Execution Report",
          "url": PAGES.OPERATOR.CUSTOMER_LIST,
          "type": "page"
        },
      ]
    },
    {
      "id": "50",
      "label": "SYSTEM CONFIGURATION",
      "type": "toggle",
      "pages": [
        {
          "id": "51",
          "label": "Data Retention",
          "url": PAGES.OPERATOR.DATA_RETENTION,
          "type": "page"
        },
        {
          "id": "52",
          "label": "SMS Service",
          "url": PAGES.OPERATOR.SMS_SERVICE,
          "type": "page"
        },
        {
          "id": "53",
          "label": "Email Service",
          "url": PAGES.OPERATOR.EMAIL_SERVICE,
          "type": "page"
        },
        {
          "id": "54",
          "label": "System Parameter",
          "url": PAGES.OPERATOR.SYSTEM_PARAMETER,
          "type": "page"
        },
      ]
    }
  ],

  MENU_FOR_CUSTOMER: [
    //unuse
    // {
    //   "id": "80",
    //   "label": "CUSTOMER INFORMATION",
    //   "type": "toggle",
    //   "pages": [
    //     {
    //       "id": "11",
    //       "label": "Customer Detail",
    //       "url": PAGES.CUSTOMER.CUSTOMER_DETAIL,
    //       "type": "page"
    //     }
    //   ]
    // },
    {
      "id": "90",
      "label": "NAVIGATION",
      "type": "toggle",
      "pages": [
        {
          "id": "91",
          "label": "Navigation History",
          "url": PAGES.CUSTOMER.SET_POINT_HISTORY,
          "type": "page"
        }
      ]
    },

    {
      "id": "110",
      "label": "REPORT",
      "type": "toggle",
      "pages": [
        {
          "id": "111",
          "label": "Energy Report",
          "url": PAGES.CUSTOMER.ENERGY_REPORT,
          "type": "page"
        },
        {
          "id": "112",
          "label": "Excution Report",
          "url": PAGES.CUSTOMER.EXCUTION_REPORT,
          "type": "page"
        }
      ]
    },
    {
      "id": "100",
      "label": "NOTIFICATION SETTING",
      "type": "toggle",
      "pages": [
        {
          "id": "102",
          "label": "Notification Setting",
          "url": PAGES.CUSTOMER.NOTIFICATION_SETTING,
          "type": "page"
        }
      ]
    }
  ]
}

export class API_CONFIGURATION {
  public static SERVER = 'http://172.18.15.18:9090/';
  public static SERVER1 = 'http://172.18.15.9:9099/';

  public static API_VERSION = 'api/v1/';

  public static SERVER_WITH_API_VERSION = API_CONFIGURATION.SERVER + API_CONFIGURATION.API_VERSION;
  public static SERVER1_WITH_API_VERSION = API_CONFIGURATION.SERVER1 + API_CONFIGURATION.API_VERSION;


  public static API_URLS = {
    CBM_FIRST_TIME: API_CONFIGURATION.SERVER1_WITH_API_VERSION + 'realtime/cbm/query',
  }
}