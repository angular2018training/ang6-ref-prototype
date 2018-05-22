import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CommonService } from './common.service';
import {API_CONFIGURATION} from '../constant';
@Injectable()
export class TestService extends CommonService {

    getCBMFirstTime(requestData) {
        let requestDataSend = {
            machine: requestData.machine,
            isFirstTime: requestData.isFirstTime,
            startTime: requestData.startTime,
            timeSpan: requestData.timeSpan,
            beginTime: requestData.beginTime,
            t: Date.now()
        }
        return this.getRequest(API_CONFIGURATION.API_URLS.CBM_FIRST_TIME, this.getHeaderDefault(), requestDataSend);
    }
}