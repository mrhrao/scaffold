import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { VerificationComponent } from './verificationLink/verificationLink.component';
import {ResetPasswordComponent} from './resetPassword/resetPassword.component';
import {KycManagementComponent} from './kycManagement/kycManagement.component';
import {SecurityComponent} from './securityQuestions/securityQuestion.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import {WalletComponent} from './wallet/wallet.component';
import {LayoutComponent} from './layout/layout.component';
import { PaymentComponent } from './payment/payment.component';
import {AppServicesComponent} from './app-services/app-services.component';


export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{ path: 'home', component: HomeComponent },
	{ path:	'appService', component: AppServicesComponent},
	{ path: 'verificationLink/:token', component: VerificationComponent },
	{ path: 'securityQuestion/:token', component: SecurityComponent },
	{ path: 'resetPassword/:token', component: ResetPasswordComponent },
	{
		path: 'app', component: LayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'wallet', component: WalletComponent },
			{ path: 'payment', component: PaymentComponent },
			{ path: 'kyc', component: KycManagementComponent }
			
			
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }