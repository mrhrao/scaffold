
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VerificationService {
    constructor(private http: HttpClient) {
 }

    verificationMail(token) {
        return this.http.get("http://180.151.84.102/api-auth/api/v1/verify?token=" + token);
    }

    securityQuestions(){
    	return this.http.get("http://180.151.84.102/api-auth/api/v1/security/questions");
    }

    saveSecurityQuestion(obj ,token){
        let number =token;
        console.log(number);
       if(number.toString().length == 6){
           let otp = token;
        return this.http.put("http://180.151.84.102/api-auth/api/v1/match/security/question?otp=" + otp, obj);
       }else{
        console.log("kjdhfd");
        return this.http.post("http://180.151.84.102/api-auth/api/v1/security/questions?token=" + token, obj);
       }
    }

    accountRecovery(data,token){
        return this.http.put("http://180.151.84.102/api-auth/v1/api/reset/password?otp=" + token, data);
    }

}
