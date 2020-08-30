import { CanLoad, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements 
CanLoad, CanActivate
{

    user = {
        admin: true,
        logged: true
    }

    canLoad() {
        return this.user.admin
    }
    
    canActivate()
    {
        return this.user.logged 
    }
}