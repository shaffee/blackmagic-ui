import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {EditorService} from './editor.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CircuitsGuardGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private editorservice: EditorService , private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this.editorservice.isLoggedin() )
      {
          if( state.url == '/register' || state.url == '/login')
            return this.router.parseUrl('/');

          return true;
      }
      else
      {
          if( state.url == '/register' || state.url == '/login')
          {
            return true;
          }

          return false;

      }
    }
    
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    alert(2);
      return true;
  }
  
}

