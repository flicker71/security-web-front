import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CredentialsService } from "./credentials.service";

@Injectable({
    providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
     
    constructor(
        private router: Router,
        private credentialsService: CredentialsService
        ) {}
            
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = route.queryParamMap.get('jwt');
        if(token) {
            localStorage.getItem("jwt");
        }

        if(this.credentialsService.isAuthenticated()) {
            return true;
        }
        
        return false;
    }
}
