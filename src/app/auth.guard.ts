import {Inject } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard : CanActivateFn=(route,state)=>{
  
 const router = Inject(Router)

if (localStorage.getItem("userID")) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
}

