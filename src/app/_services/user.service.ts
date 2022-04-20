import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    PATH_OF_API = 'http://localhost:9090';
    PATH_OF_USER_SERVICE_API = ''
    PATH_OF_FLIGHT_DETAILS_API = 'http://localhost:8080/flights/'

    requestHeader = new HttpHeaders({ 'No-Auth': 'True', responseType: 'text' });
    constructor(
        private httpclient: HttpClient,
        private userAuthService: UserAuthService
    ) { }

    public login(loginData: any) {
        return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
            headers: this.requestHeader,
        });
    }

    public forUser() {
        return this.httpclient.get(this.PATH_OF_API + '/forUser', {
            responseType: 'text',
        });
    }


    public forAdmin() {
        return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
            responseType: 'text',
        });
    }

    public roleMatch(allowedRoles: string | any[]) {
        let isMatch = false;
        const userRoles: any = this.userAuthService.getRoles();
        if (userRoles != null && userRoles) {
            for (let i = 0; i < userRoles.length; i++) {
                for (let j = 0; j < allowedRoles.length; j++) {
                    if (userRoles[i].roleName === allowedRoles[j]) {
                        isMatch = true;
                    }
                }
            }
        }
        return isMatch;
    }

    public addUser(userData: any) {
        return this.httpclient.post(this.PATH_OF_API + '/authenticate', userData, {
            headers: this.requestHeader,
        });
    }

    public getFlights() {
        return this.httpclient.get(this.PATH_OF_FLIGHT_DETAILS_API, {
            headers: this.requestHeader
        });
    }

    public addFlight(flightData: any) {
        return this.httpclient.post(this.PATH_OF_FLIGHT_DETAILS_API, flightData, {
            headers: this.requestHeader
        });
    }
}
