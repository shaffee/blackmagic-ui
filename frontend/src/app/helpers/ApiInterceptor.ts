import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        console.log("intercepted ");
        console.log(request);
        let token = localStorage.getItem('token'); 
        let URL = '';

        URL = environment.APIURL + request.url 

        request = request.clone({
            setHeaders: { 
                'x-access-token': `${token}`
            },
            url : URL
        });
        
        /*
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }
        */

        return next.handle(request);
    }
}