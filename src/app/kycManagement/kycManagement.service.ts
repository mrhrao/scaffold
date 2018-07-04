import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule,Http  } from '@angular/http';
import {Response, Headers, RequestOptions } from '@angular/http';
import{Router} from '@angular/router'
import{ Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class KycManagementService {
    constructor(private http:Http) {
 }


//  getCustomerId(user){
//     let url ='https://p3.cynopsis.co/artemis_bitexglobal_uat/api/individual_customer_report';
//     let headers      = new Headers({ 'Content-Type': 'application/json', 'WEB2PY-USER-TOKEN':localStorage.getItem('token')}); // ... Set content type to JSON
//     let options       = new RequestOptions({ headers: headers }); // Create a request option
       
//     return this.http.post(url,user,options).map(res => res.json());

//  }

//  getFormSubmitted(information){
//     let url ='https://p3.cynopsis.co/artemis_bitexglobal_uat/default/individual_risk';
//     let headers      = new Headers({ 'Content-Type': 'application/json', 'WEB2PY-USER-TOKEN':localStorage.getItem('token')}); // ... Set content type to JSON
//     let options       = new RequestOptions({ headers: headers }); // Create a request option
       
//     return this.http.post(url,information,options).map(res => res.json());
//  }

   
}