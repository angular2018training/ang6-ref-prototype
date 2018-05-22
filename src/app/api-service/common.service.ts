import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Subject } from "rxjs/Subject";
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class CommonService {
    constructor(protected http: Http) { }
    protected extractData(res: Response) {
        let body = res.json();
        return body;
    }

    public handleErrorPromise(error: Response | any) {
        console.error(error);
        return Promise.reject(error);
    }

    protected getHeaderDefault() {
        return new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + Tokens.getAccessToken(),
            }
        );
    }

    protected getRequest(url, headers = null, params = null) {
        if (!headers) {
            headers = this.getHeaderDefault();
        }
        let urlParams = new URLSearchParams();
        for (var prop in params) {
            if (params.hasOwnProperty(prop)) {
                urlParams.set(prop, params[prop]);
            }
        }

        return this.http.get(url, new RequestOptions({ headers: headers, params: urlParams })).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    protected deleteRequest(url, headers = null) {
        if (!headers) {
            headers = this.getHeaderDefault();
        }

        return this.http.delete(url, new RequestOptions({ headers: headers })).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    protected postRequest(url, body = null, headers = null) {
        if (!headers) {
            headers = this.getHeaderDefault();
        }
        return this.http.post(url, body, new RequestOptions({ headers: headers })).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    protected putRequest(url, body = null, headers = null) {
        if (!headers) {
            headers = this.getHeaderDefault();
        }
        return this.http.put(url, body, new RequestOptions({ headers: headers })).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
}