

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule,Http  } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder} from'@angular/forms';
import {SecurityComponent} from './securityQuestions/securityQuestion.component';
import { VerificationComponent } from './verificationLink/verificationLink.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { AppRoutingModule } from './app.routes';
import { AppServicesComponent } from './app-services/app-services.component';
import {ResetPasswordComponent} from './resetPassword/resetPassword.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KycManagementComponent} from './kycManagement/kycManagement.component';
import { PaymentComponent } from './payment/payment.component';
import {WalletComponent} from './wallet/wallet.component';
import {LayoutComponent} from './layout/layout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthenticatedHttpService } from './interceptor/api-interceptor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {ToastModule,ToastOptions} from 'ng2-toastr/ng2-toastr';

// import { ChartModule } from 'angular2-highcharts';
import { appRoutes } from './app.routes';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { braintree } from 'braintree-web/client';
import { NgxBraintreeModule } from 'ngx-braintree';
declare var require: any;
declare var $ :any;

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  maxShown=1;
}

/*services */

import { HeaderService } from './header/header.service';
import {VerificationService} from './verificationLink/verificationLink.service';
import {DashboardService} from './dashboard/dashboard.service';
import {ResetPasswordService} from './resetPassword/resetPassword.service';
import {KycManagementService} from './kycManagement/kycManagement.service';
import {PaymentService} from './payment/payment.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerificationComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ResetPasswordComponent,
    WalletComponent,
    LayoutComponent,
    KycManagementComponent,
    SecurityComponent,
    AppServicesComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    NgxBraintreeModule,
     CarouselModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    DropdownModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AccordionModule.forRoot(),
    ReCaptchaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    
    {provide: ToastOptions, useClass: CustomOption},
    HeaderService,
    VerificationService,
    DashboardService,
    KycManagementService,
    PaymentService,
    ResetPasswordService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticatedHttpService,
      multi: true,
    },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
