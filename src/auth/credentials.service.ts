import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CredentialsService {
     
    constructor(private http: HttpClient) {}
            
    isAuthenticated(): boolean {
        const token = localStorage.getItem("jwt");
        if(!!token && !this.tokenExpired(token)) {
            return true;
        } else {
            return false;
        }
    }

    tokenExpired(token: string) {
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
}
