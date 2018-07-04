import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthenticatedHttpService implements HttpInterceptor {
	
	constructor( private router : Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('token')){
      const clonedRequest = req.clone({ headers: req.headers.set('authToken',localStorage.getItem('token')) });
      return next.handle(clonedRequest).do(event => {}, err => {
            if (err instanceof HttpErrorResponse && (err.status == 401 || err.status == 403)) {
                console.log("error");
                window.localStorage.clear();
                this.router.navigate(['home']);
            }
        });
    }
    return next.handle(req);
  }
}
