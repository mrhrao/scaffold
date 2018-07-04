

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResetPasswordService {
    constructor(private http: HttpClient) {
 }

    resetPassword(resetPasswordForm,token) {
        return this.http.put('/api/v1/resetpassword/mail/verify?token='+token,resetPasswordForm);
    }

}