import { Component, OnInit ,TemplateRef ,ViewChild , ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { VerificationService } from '../verificationLink/verificationLink.service';
import {SelectItem} from 'primeng/api';
import * as $ from 'jquery';


@Component({
  selector: 'security',
  styleUrls: ['./securityQuestion.component.css'],
  templateUrl:'securityQuestion.component.html'
})

export class SecurityComponent implements OnInit {
    token: string;
    forgetMailVerify:any=false;
    show404Window:any=false;
    verifyMail:any=true;
    modalRef: BsModalRef; 
    public ques:any={};
    verifyMailData:any={};
    spinner:any;
    quesNum:any;
    data:any={};
    securityQuestionData:any;
    saveQuestionData:any;
    getToken:any;
    questions:any=[];
    populateQues={};
    public user:any={};

    @ViewChild('accountRecovery') public accountRecovery;
   
	constructor(private router: Router, private modalService: BsModalService,private ac: ActivatedRoute ,vcr: ViewContainerRef,private toasterService: ToastsManager ,
    private VerificationService:VerificationService  ) {
    this.toasterService.setRootViewContainerRef(vcr);
      var self = this;
      let data = JSON.parse(sessionStorage.getItem('otpdata')) 
      if(data){
        this.bindSecurityQuestions(data);
        this.forgetMailVerify=true;
        this.verifyMail=false;
      }else{
        this.getSecurityQuestions();
      }
      sessionStorage.removeItem('otpdata') 
  	   ac.params.forEach(function(param: any) {
        if (typeof param == "number"){
          self.token=param['otp'];
       }else{
            self.token = param['token']; 
        }  
    });
   
}

sendVerificationMail(){
	this.VerificationService.verificationMail(this.token).subscribe(
	  successData => {
       this.verifyMailData=successData;
	     this.toasterService.success(this.verifyMailData.message);
	    }, errorData => {
          if(errorData.error.error.errorMessage){
            this.verifyMailData.message=errorData.error.error.errorMessage;
            this.show404Window=true;
            $('.showSecurityQuestion').css('display','none');
          }else{
            this.show404Window=false;
            $('.showSecurityQuestion').css('display','block');
          }
  
		 });
	}

  goToHome(){
    this.router.navigate(["home"]);
  }

  bindSecurityQuestions(data){
    let getData= data.responseObject;
      for(var i=0 ; i<getData.length;i++){
          this.ques={
            question1:getData[0].question,
            question2:getData[1].question,
            question3:getData[2].question,
            questionA:getData[0].id,
            questionB:getData[1].id,
            questionC:getData[2].id,

          }
      }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
     $('.loginTemplateModal .loginHeading').css('visibility','visible');
       $('.loginTemplateModal .registerHeading').css('visibility','hidden');
  }



  getSecurityQuestions(){
    this.VerificationService.securityQuestions().subscribe(
    successData => {
       this.securityQuestionData=successData;
       this.questions=this.securityQuestionData.responseObject;
      }, errorData => {
          console.log(errorData);
     });

  }

  getAccountRecovery(form: NgForm){
    this.spinner=true;
    let accountData;
    this.VerificationService.accountRecovery(this.data,this.token).subscribe(
      successData => {
        this.spinner=false;
         accountData=successData;
         this.toasterService.success(accountData.message);
         this.modalRef.hide();
         this.router.navigate(['home']);
        }, errorData => {
            console.log(errorData);
            this.spinner=false;
            this.toasterService.error(errorData.error.message);
       });
  

  }

  saveAnswers(form: NgForm){
     let obj={
      "question1": this.ques.questionA,
      "question2": this.ques.questionB,
      "question3": this.ques.questionC,
       "answer1": this.user.answerA,
      "answer2": this.user.answerB,
      "answer3": this.user.answerC,
     }
  if(obj.question1 == obj.question2 || obj.question2 == obj.question3 || obj.question3 == obj.question1 || obj.question1 == obj.question3){
    this.toasterService.error("Please select another question");
 }else{
     this.VerificationService.saveSecurityQuestion(obj, this.token).subscribe(
      successData => {
       this.saveQuestionData=successData;
       if(this.saveQuestionData.responseObject.mode=="registration sucess"){
       this.router.navigate(["/verificationLink/"+this.token]);
      }else{
        this.toasterService.success(this.saveQuestionData.message);
        this.openModal(this.accountRecovery);
       }
      }, errorData => {
          console.log(errorData);
          this.toasterService.error(errorData.error.message);
     });
    }
  
  }

ngOnInit(){
  // $(".verify").animate({left: '-67px'});
  $('.loginModal').css('display','none');
  $('.modal-backdrop.fade').css('display','none');
  if(this.token.toString().length>6){
    this.sendVerificationMail();
  }
 // this.getVerifiedOtp();
}

}