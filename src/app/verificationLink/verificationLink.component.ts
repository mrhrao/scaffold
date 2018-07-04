

import { Component, OnInit ,TemplateRef ,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { VerificationService } from './verificationLink.service';
import { BsModalService , BsModalRef} from 'ngx-bootstrap/modal';


@Component({
  selector: 'verificationLink',
  styleUrls: ['./verificationLink.component.css'],
  templateUrl:'verificationLink.component.html'
})

export class VerificationComponent implements OnInit {

  public token: string;
  modalRef: BsModalRef; 
  showVerifyWindow:any=true;
  verifyMailData:any;

  constructor(private router: Router, private ac: ActivatedRoute ,vcr: ViewContainerRef, private modalService: BsModalService , private toasterService: ToastsManager ,
    private VerificationService:VerificationService  ) {
    this.toasterService.setRootViewContainerRef(vcr);
      var self = this;
  	   ac.params.forEach(function(param: any) {
        self.token = param['token'];
    });
       this.verifyEmail(self.token);
  }
  openModal(template: TemplateRef<any>,value) {
    this.modalRef = this.modalService.show(template);
}

verifyEmail(token){
this.VerificationService.verificationMail(token).subscribe(
  successData => {
     this.verifyMailData=successData;
     this.toasterService.success(this.verifyMailData.message);
    }, errorData => {
      console.log(errorData);
      });
}
  ngOnInit() {
     // this.verifyEmail(self.token);
   
  }


}
