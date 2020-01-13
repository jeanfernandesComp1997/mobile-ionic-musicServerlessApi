import { UtilService } from './util.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MusicService {

    constructor(public http: HttpClient, public util: UtilService) {

    }

    public async getReleases(accessToken: string) {
        let host: string = this.util.getHostApi();

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json').set('x-access-token', accessToken);

        let response: any = await this.http.get(host + 'dev/releases', { headers: headers }).toPromise();
        return response;
    }
}
