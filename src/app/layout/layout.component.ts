


import { Component, OnInit ,TemplateRef ,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-dashboard',
  styleUrls: ['./layout.component.css'],
  templateUrl:'layout.component.html'
})

export class LayoutComponent implements OnInit {
  fullName: any;
  userId: any;
  toggleIt:Boolean= false;
  getLogoutData:any;
  spinner:any;
  constructor(private router: Router, private dashboardService:DashboardService, private toasterService: ToastsManager){
    this.fullName= JSON.parse(localStorage.getItem('fullName'))
  }

  onToggle() {
    this.toggleIt = !this.toggleIt;
  }

  

  logoutApp(){
    //this.spinner=true;
  let token= localStorage.getItem("token");
  console.log("Token", token);
  let email= JSON.parse(localStorage.getItem("email"));
  this.router.navigate(['/home']);
    this.dashboardService.logout(email).subscribe(
      successData => {
         this.getLogoutData=successData;
         this.toasterService.success(this.getLogoutData.message);
         this.spinner=false;
         localStorage.clear();
         this.router.navigate(['/home']);
        }, errorData => {
          this.spinner=false;
            console.log(errorData);
            // this.toasterService.error(errorData.error.message);
       });
  
   
  }


ngOnInit(){
}

}