import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule,Http  } from '@angular/http';
import {Response, Headers, RequestOptions } from '@angular/http';
import{Router} from '@angular/router'
import{ Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
    constructor(private http:Http) {
 }

 getTokenizationKey(){
    let url ='http://192.168.43.38:7080/api/v1/client/token';
        let headers      = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
           
         return this.http.get(url, options).map(res => res.json());
        // return this.http.get("http://192.168.43.38:7077/api/v1/client/token");
      }
}