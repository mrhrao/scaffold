
import { Component , OnInit, TemplateRef, ViewChild ,ViewContainerRef , AfterViewInit, Renderer,Input , Output, EventEmitter,  OnChanges, OnDestroy,NgZone ,HostListener } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import {config} from '../config';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { ReCaptchaModule } from 'angular2-recaptcha';
import {TooltipModule} from 'primeng/tooltip';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './header.service';
// import { ReCaptchaComponent } from 'angular2-recaptcha';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as $ from 'jquery';
 //declare var $: any;

@Component({
  selector: 'header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[ToastsManager],
})

export class  HeaderComponent implements OnInit{ 
  
  email: string;
  fullName: any;
setLanguage:any;
spinner:any;
showloginTemplate:any=true;
modalRef: BsModalRef; 
showInvalidOtp:any=false;
toggleIt:Boolean= false;
barLabel: string = "Password strength:";
registerData:any;
showForgetPassword=false;
getRadioInput:any;
privateKey:any;
through:any;
// recaptchaToken:any;
forgetData:any;
loginUser={};
data:any={
  "email":"",
  "mobile":""
};
forgetUser={};
otpData={};
errorOTP:any;
loginData:any;
mobileDisabled=true;
emailDisabled=true;
activeSiteSection:any;
user:any ={};
public selectLanguage:any = [
     {value:'ENGLISH'},
     {value:'JAPANESE'}
   ];
   @Output() routerUpdate = new EventEmitter();
  @ViewChild('otptemplate') public otptemplate;
  @ViewChild('mobileNumber') public mobileNumber;
  // @ViewChild(ReCaptchaComponent) public captcha: ReCaptchaComponent;
  // @ViewChild('forgetPassword') public forgetPassword:TemplateRef<any>;
  // @ViewChild('accountRecovery') public accountRecovery;
  

  onActive(id) {
    this.routerUpdate.emit(id);
    this.activeSiteSection = id;
  }
  

constructor(private modalService: BsModalService , private router: Router, private toasterService: ToastsManager ,vcr: ViewContainerRef,private headerService: HeaderService,private ngZone :NgZone ){
  this.toasterService.setRootViewContainerRef(vcr);
}




/*Function to Open An Modal*/
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
   $('.loginTemplateModal .loginHeading').css('visibility','visible');
     $('.loginTemplateModal .registerHeading').css('visibility','hidden');
}
/*Function to Open An Modal*/




/*Function to toggle harmburger menu*/
 onToggle() {
    this.toggleIt = !this.toggleIt;
  }

  /*Function to Scroll*/
   scroll()
  {
     let location = (window.location.hash).split('#')[1];
     this.activeSiteSection = location;
     setTimeout(()=>{
      this.routerUpdate.emit(this.activeSiteSection)
     },200)
     
  }

  scrollTop(){
    $("html, body").animate({ scrollTop: "0px" });
  }

  onAnimation(){
  var panelOne = '550px';
  var panelTwo = '550px';

    $('.loginTemplateModal .form-panel.two').not('.loginTemplateModal .form-panel.two.active').on('click', function(e) {
	  $('.loginTemplateModal .form-toggle').addClass('visible');
    $('.loginTemplateModal .registerHeading').css('visibility','visible');
    $('.loginTemplateModal .loginHeading').css('visibility','hidden');
    $('.loginTemplateModal .form-panel.one').addClass('hidden');
    $('.loginTemplateModal .form-panel.one').css('visibility','hidden');
    $('.loginTemplateModal .form-panel.two').addClass('active');
    $('.loginTemplateModal .form').animate({
      'height': panelTwo
    }, 200);
     e.preventDefault();
  });

	$('.loginTemplateModal .form-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).removeClass('visible');
    $('.loginTemplateModal .form-panel.one').removeClass('hidden');
    $('.loginTemplateModal .loginHeading').css('visibility','visible');
    $('.loginTemplateModal .registerHeading').css('visibility','hidden');
    $('.loginTemplateModal .form-panel.one').css('visibility','visible');
    $('.loginTemplateModal .form-panel.two').removeClass('active');
    $('loginTemplateModal .form').animate({
      'height': panelOne
    }, 200);
  });

  }
/*Register Form */
signup(form: NgForm) {
    if (form.invalid) return;
    this.spinner=true;
    this.headerService.signup(this.user).subscribe(successData => {
      this.spinner=false;
     this.registerData=successData;
     this.toasterService.success(this.registerData.message,"",{maxShown:1} );
     //this.captcha.reset();
     form.resetForm();
    }, errorData => {
      console.log(errorData);
      this.spinner=false;
      this.toasterService.error(errorData.error.message, '',{maxShown:1});
    })
  }
  /*Register Form */

  /*Login Form */
signin(form: NgForm) {
  this.spinner=true;
    if (form.invalid) return;
    this.loginUser={
      "browserName": navigator.appVersion,
      "clientOsName": navigator.platform,
      "emailId": form.value.emailId,
      "ipAddress": "string",
      "password": form.value.password,
      "role": "ROLE_USER",
      // "recaptcha":form.value.recaptcha
    }
    this.headerService.signin(this.loginUser).subscribe(successData => {
      this.spinner=false;
     this.loginData=successData;
     this.fullName = this.loginData.responseObject.fullName;
     this.modalRef.hide();
     console.log(this.loginData.responseObject.authToken);
     localStorage.setItem("email",JSON.stringify(form.value.emailId));
      localStorage.setItem("token",this.loginData.responseObject.authToken);
      localStorage.setItem("userId",JSON.stringify(this.loginData.responseObject.responseObject.id));
        localStorage.setItem("fullName",JSON.stringify(this.loginData.responseObject.fullName));
     this.toasterService.success(this.loginData.message);
     form.reset();
     //this.user.reset();
    //  this.router.navigate(['/app/dashboard']);
     this.openModal(this.mobileNumber);
    }, errorData => {
      this.spinner=false;
      console.log(errorData);
      this.toasterService.error(errorData.error.message, "Error!");
    })
  }
  /*Login Form */


// mobile verification form

submitMobile(form: NgForm){
  //this.spinner=true;
let token= localStorage.getItem("token");
console.log("Token", token);
let email= JSON.parse(localStorage.getItem("email"));
// "emailId": this.email,
// "password": form.value.password,
// this.router.navigate(['/home']);
  this.headerService.mobileNumber(token).subscribe(
    successData => {
      //  this.getLogoutData=successData;
      //  this.toasterService.success(this.getLogoutData.message);
       this.spinner=false;
       this.router.navigate(['/app/dashboard']);
      }, errorData => {
        this.spinner=false;
          console.log(errorData);
          // this.toasterService.error(errorData.error.message);
     });

 
}


 

  validateForgetPassword(form: NgForm){
    this.getRadioInput = document.getElementsByClassName('forgetPass');
        for ( var i = 0; i < this.getRadioInput.length; i++) {
            if(this.getRadioInput[i].checked) {
              this.through=this.getRadioInput[i].value;
                if(this.getRadioInput[i].value=="mobile"){
                  this.mobileDisabled=false;
                  this.emailDisabled=true;
                  form.value.email="";
                }else if(this.getRadioInput[i].value=="email"){
                  this.emailDisabled=false;
                  this.mobileDisabled=true;
                  form.value.mobile="";
                }
          }
        }
      }
  

  /*Forget Password Form */

  submitforgetPassword(form: NgForm){
    if(form.value.email){
      this.data.email=form.value.email;
      this.data.mobile=""
    }else{
      this.data.email="";
      this.data.mobile=form.value.mobile
    }
    this.spinner=true;
    this.headerService.forgetApi(this.through,this.data).subscribe(successData => {
      this.spinner=false;
     this.forgetData=successData;
     this.toasterService.success(this.forgetData.message);
     this.openModal(this.otptemplate);
    }, errorData => {
      console.log(errorData);
      this.spinner=false;
      this.toasterService.error(errorData.error.message, "Error!")
    })

  }

  submitResendOtp(){
    this.spinner=true;
    this.headerService.forgetApi(this.through,this.data).subscribe(successData => {
      this.spinner=false;
     this.forgetData=successData;
     this.toasterService.success(this.forgetData.message);
    // this.openModal(this.otptemplate);
    }, errorData => {
      console.log(errorData);
      this.spinner=false;
      this.toasterService.error(errorData.error.message, "Error!");

    })


  }

  invalidOTPValidation(Otp){
    if(Otp && this.showInvalidOtp==true){
      this.showInvalidOtp=false;
    }
   
  }

  submitOTP(form: NgForm){
    this.spinner=true;
    this.headerService.submitOTP(this.data.email,form.value.otp).subscribe(successData => {
      this.otpData=successData; 
      this.spinner=false;
      sessionStorage.setItem('otpdata',JSON.stringify(this.otpData))
      this.modalRef.hide();
      $('.forget-panel').css('display','none');
      $('.loginTemplateModal').css('display','none');
      this.router.navigate(['securityQuestion/'+ form.value.otp], this.otpData);
     }, errorData => {
       this.spinner=false;
       console.log(errorData);
       this.showInvalidOtp=true;
       this.errorOTP=errorData.error.message;
       this.toasterService.error(errorData.error.message, "Error!")
     })

  }
   /*Forget Password Form */

  ngOnInit(){
    this.setLanguage = 'ENGLISH';
      this.onAnimation();
      this.scroll();  //third 
      this.privateKey=config.key;
  }
 

}