


import { Component, OnInit ,TemplateRef ,ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { NgForm } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { KycManagementService } from './kycManagement.service';
 declare var $: any;
//import * as $ from 'jquery';
declare var jquery:any;


@Component({
  selector: 'kyc',
  styleUrls: ['./kycManagement.component.css'],
  templateUrl:'kycManagement.component.html'
})

export class KycManagementComponent implements OnInit {
 file:any;
 showNationalityBtn=true;
 getData:any;
 user:any={};
 userId:any={};
 getSelfieImage='assets/images/document.png';
 getNationalityImage='assets/images/document.png';

 @ViewChild('documentNationalityLink') input4;
 @ViewChild('documentNationalityImage') input5;
 @ViewChild('documentSelfieLink') input6;
 @ViewChild('documentSelfieImage') input7;

 constructor(private kycManagement:KycManagementService){}

 ngOnInit(){
     this.user.gender = "MALE";
     this.user.residence = "india";
     this.formLoad();
 }

  nationalityChange(fileInput: any){
    this.file = fileInput.target.files[0];
     if((this.file.type=="image/jpeg" || this.file.type=="image/png" || this.file.type=="application/pdf") &&(this.file.size<=2097152)){
     this.showNationalityBtn=false;
       this.input5.nativeElement.src=URL.createObjectURL(this.file);
       this.input4.nativeElement.href= URL.createObjectURL(this.file);
        }
        else{
         this.showNationalityBtn=true;
          this.input5.nativeElement.src=URL.createObjectURL('');
          this.input4.nativeElement.src=URL.createObjectURL('');   
    }
  }

  SelfieChange(fileInput: any){
    this.file = fileInput.target.files[0];
     if((this.file.type=="image/jpeg" || this.file.type=="image/png" || this.file.type=="application/pdf") &&(this.file.size<=2097152)){
     this.showNationalityBtn=false;
       this.input7.nativeElement.src=URL.createObjectURL(this.file);
       this.input6.nativeElement.href= URL.createObjectURL(this.file);
    }
    else{
         this.showNationalityBtn=true;
          this.input7.nativeElement.src=URL.createObjectURL('');
          this.input6.nativeElement.src=URL.createObjectURL('');
         
    }
  }

  uploadFile(){

  }

//   submittKyc(form: NgForm){
//     if (form.invalid) return;
//     this.kycManagement.getFormSubmitted(this.user).subscribe(successData => {
//         console.log(successData);
//     }, errorData => {
//       console.log(errorData);
//     })
//   }
    
//   getCustomerDetails(){
//       this.userId={
//             "cust_rfr_id": "Scaffold_2"
//       }
//     this.kycManagement.getCustomerId(this.userId).subscribe(successData => {
//         this.getData=successData;
//         console.log("Get Data", this.getData);
//     }, errorData => {
//       console.log(errorData);
   
//     })
//   }

formLoad(){
  $(document).ready(function () {
    $('.registration-form fieldset:first-child').fadeIn('slow');

    $('.registration-form input[type="text"]').on('focus', function () {
        $(this).removeClass('input-error');
    });

    // next step
    $('.registration-form .btn-next').on('click', function () {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;

        parent_fieldset.find('input[type="text"],input[type="email"]').each(function () {
            if ($(this).val() == "") {
                $(this).addClass('input-error');
                next_step = false;
            } else {
                $(this).removeClass('input-error');
            }
        });

        if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                $(this).next().fadeIn();
            });
        }

    });

    // previous step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('fieldset').fadeOut(400, function () {
            $(this).prev().fadeIn();
        });
    });

    // submit
    $('.registration-form').on('submit', function (e) {

        $(this).find('input[type="text"],input[type="email"]').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

    });

   
});
}

// ngOnInit(){

// //this.getCustomerDetails();
// }

}