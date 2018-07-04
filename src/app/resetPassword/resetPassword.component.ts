

import { Component , OnInit , TemplateRef, ViewChild ,ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService , BsModalRef} from 'ngx-bootstrap/modal';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { ResetPasswordService } from './resetPassword.service';

@Component({
  selector: 'resetPassword',
  templateUrl:'./resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})

export class  ResetPasswordComponent implements OnInit{ 
modalRef: BsModalRef; 
successData:any;
user={};
resetPasswordData:any;
token:any;
	
	constructor(private ac: ActivatedRoute , private modalService: BsModalService , vcr: ViewContainerRef ,private toasterService: ToastsManager , private ResetPasswordService:ResetPasswordService ){
		 this.toasterService.setRootViewContainerRef(vcr);
		 var self = this;
  	   ac.params.forEach(function(param: any) {
        self.token = param['token'];
        
    });
	}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}


resetPasswordForm(form){
	this.ResetPasswordService.resetPassword(this.user,this.token).subscribe(
  successData => {
     this.resetPasswordData=successData;
     this.toasterService.success(this.resetPasswordData.message);
    }, errorData => {
      console.log(errorData);
      this.toasterService.error(errorData.error.message, "Error!")
      });

}

   	ngOnInit() {}

}