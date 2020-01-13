import { UtilService } from './util.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public http: HttpClient, public util: UtilService) {

    }

    public async registerUser(request: any) {
        let host: string = this.util.getHostApi();

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let response: any = await this.http.post(host + 'dev/createuser', request, { headers: headers }).toPromise();
        return response;
    }

    public async login(request: any) {
        let host: string = this.util.getHostApi();

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let response: any = await this.http.post(host + 'dev/generatetoken', request, { headers: headers }).toPromise();
        console.log(response);
        return response;
    }
}
