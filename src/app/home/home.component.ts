

import { Component , EventEmitter , Input, Output, OnInit,OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
declare var $:any;


@Component({
  selector: 'home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})

export class  HomeComponent implements OnInit{ 
  inputElement:any;
  spinner:any=true;
	constructor(private router:Router){
   
	// router.events.subscribe(s => {
  //     if (s instanceof NavigationEnd) {
  //       const tree = router.parseUrl(router.url);
	//       if (tree.fragment) {
  //         let element:any = document.querySelector("#" + tree.fragment);
  //         if (element) { 
  //          let target = $('#' + tree.fragment);
  //         $('html, body').animate({
  //           scrollTop: target.offset().top - $('.main-header').height()
  //       }, 500); 
		
	// 	}
  //       }
  //     }
  //   });
    this.spinner=false;
	}

  changeScrollView(id)
   {
    try {
     // document.querySelector('#' + id).scrollIntoView();
     let target = $('.' + id);
      $('html, body').animate({
        scrollTop: target.offset().top - $('.main-header').height()
        
    }, 500);
    } catch (e) { }

   }
 


   ngOnInit() {
    }

   
}