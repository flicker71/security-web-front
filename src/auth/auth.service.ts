import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { baseUrl } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    login(data: any): Observable<any> {
        return this.httpClient.post(`${baseUrl}athena/login`, data);
    }

    logout() {
        localStorage.removeItem('jwt');
        if (window.location.href.includes('/home')) {
            window.location.reload();
        }
        else {
            this.router.navigate(['/home']);
        }
    }

    register(first_name: string, last_name: string, username: string, mail: string, password: string): Observable<any> {

        return this.httpClient.post(`${baseUrl}athena/user/register`, {
            first_name: first_name,
            last_name: last_name,
            username: username,
            mail: mail,
            password: password
        })
    };
}
