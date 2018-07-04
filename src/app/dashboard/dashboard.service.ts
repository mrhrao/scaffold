import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Injectable()
export class DashboardService {
    headers:any;
    constructor(private http: HttpClient,private router : Router) {
    }

    logout(userEmail) {  
        return this.http.delete("http://192.168.9.52:1117/api/v1/logout?userEmail=" + userEmail);
    }


    getCryptoCurrency(currencyType){
        return this.http.get("http://192.168.9.52:1117/metadata/api/v1/currency?currencyType=" + currencyType);
    }

    apiCurrencyPair(countryId){
        return this.http.get("http://192.168.9.52:1117/metadata/api/v1/currency/pair?countryId=" + countryId);
    }


    placeOrder(data){
        return this.http.post("http://192.168.9.52:1117/api-order/api/v1/order/validate",data);
    }

    
}