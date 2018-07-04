

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeaderService {
    constructor(private http: HttpClient) {
 }

    signup(user) {
        return this.http.post("http://180.151.84.102/api-auth/api/v1/register",user);
    }

     signin(user) {
        return this.http.post("http://180.151.84.102/api-auth/api/v1/login",user);
    }

    forgetApi(through,data){
        console.log(data);
       
        if(data.email){
            let encodedName = encodeURI(data.email).replace(/%20/g,'+');
           return this.http.get("http://180.151.84.102/api/v1/forgotpassword?through=" + through +'&email='+encodedName);
        }else if(data.mobile){
            let mobile=data.mobile;
            return this.http.get("http://180.151.84.102/api/v1/forgotpassword?through=" + through +'&mobile='+mobile);
        }
    
    }

    submitOTP(email,otp){
        let data={
            email:email,
            otp:otp
        }
        return this.http.put("http://180.151.84.102/api/v1/match/reset/otp",data);
       
    }
}