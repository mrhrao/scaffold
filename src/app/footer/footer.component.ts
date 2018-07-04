import { Component , OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl:'./footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class  FooterComponent implements OnInit{ 
    
     
     scrollToTop(){
       console.log("hjhfd");
      $("html, body").animate({ scrollTop: "0px" });
     }

     ngOnInit() {}
}