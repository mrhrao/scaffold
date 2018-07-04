

import { Component , OnInit ,ViewContainerRef ,TemplateRef ,ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var require: any;
declare var $: any;
declare var TradingView: any;
declare var Datafeeds: any;

@Component({
  selector: 'dashboard',
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class  DashboardComponent implements OnInit{ 
  options={};
  toggleIt:Boolean= false;
  currenyData:any={};
  spinner:any=false;
  userId:any;
  showCurrencies:any=[];
  showFiatCurrency:any=[];
  currencyPairId:any={
    "pairId":9,
    "amount":10.0,
    "price":10.0
  };
  showCurrencyPair:any=[];
  currentCurrencyFiatSelected:any;
  currentCurrencyCryptoSelected:any;
  getDataOfPlacedOrder:any;
  public widget ;
  currency:any={
    "crypto":"BTC",
    "fiat":"INR"
  }
  currencySelected:any={
    "crypto":"BTC",
    "fiat":"INR"
  }

  @ViewChild('buyModal') public buyModal:ModalDirective;


	
	constructor(private dashboardService:DashboardService,private toasterService: ToastsManager ,vcr: ViewContainerRef){
    this.toasterService.setRootViewContainerRef(vcr);
    this.userId= JSON.parse(localStorage.getItem('userId')) 
    
  }

  enableSpinner(){
    this.spinner=true;
    setTimeout(()=>{
      this.spinner=false;
    },300)
  }

  getPairId(type){
    this.currencyPairId.pairId=type;
  }

  placeOrder(form: NgForm,type, status){
    this.spinner=true;
    console.log(type,status)
    console.log(form);
    console.log(this.currencyPairId);
    let listOfOrders={
        "orderStandard": type,
        "orderType": "BUY",
        "pairId": parseInt(this.currencyPairId.pairId),
        "price": this.currencyPairId.price,
        "userId": this.userId,
        "volume": this.currencyPairId.amount
    }
    this.dashboardService.placeOrder(listOfOrders).subscribe(successData => {
     this.getDataOfPlacedOrder=successData;
     this.spinner=false;
    this.openBuyModal();
    }, errorData => {
      console.log(errorData);
      this.spinner=false;
     // this.openBuyModal();
      this.toasterService.error(errorData.error.message);
    })
  }

  showCryptoCurrencyPair(){
    this.currencySelected.crypto=this.currency.crypto;
  }

  showFiatCurrencyPair(){
    this.currencySelected.fiat=this.currency.fiat;
  }

  calculateValue(count){
    this.currencyPairId.amount=this.currencyPairId.amount+count;
  }

  openBuyModal(){
    this.buyModal.show();
  }
  
  closeBuyModal(){
    this.buyModal.hide();
  }
 
  getCryptoCurrency(){
    let currencyString="CRYPTO";
    this.dashboardService.getCryptoCurrency(currencyString).subscribe(successData => {
     this.currenyData=successData;
     this.showCurrencies=this.currenyData.data;
    }, errorData => {
      console.log(errorData);
      this.toasterService.error(errorData.error.message);
    })
  }

  getFiatCurrency(){
    let currencyString="FIAT";
    this.dashboardService.getCryptoCurrency(currencyString).subscribe(successData => {
     this.currenyData=successData;
     this.showFiatCurrency=this.currenyData.data;
     console.log("Fiat Currency", this.showFiatCurrency);
    }, errorData => {
      console.log(errorData);
      this.toasterService.error(errorData.error.message);
    })
  }

  getCurrencyPair(){
    let currencyId="99";
    this.dashboardService.apiCurrencyPair(currencyId).subscribe(successData => {
     this.currenyData=successData;
     this.showCurrencyPair=this.currenyData.data;
     console.log("Currency Pair", this.showCurrencyPair);
    }, errorData => {
      console.log(errorData);
      this.toasterService.error(errorData.error.message);
    })
  }


  showTradingViewChart(){
    var widget = new TradingView.widget({
      fullscreen: true,
      symbol: 'AAPL',
      interval: 'D',
      container_id: "tv_chart",
      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
      library_path: "../../assets/js/",
      locale: "en",
      //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
      drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: 'http://saveload.tradingview.com',
                charts_storage_api_version: "1.1",
      client_id: 'tradingview.com',
      user_id: 'public_user_id'
    });

  }

  

  getTradeViewChart() {
    var widget = new TradingView.widget({
      fullscreen: true,
      symbol: 'AAPL',
      interval: 'D',
      container_id: "tv_chart_container",
      //	BEWARE: no trailing slash is expected in feed URL
      datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
      library_path: "../../assets/js/",
      locale: "en",
      //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
      drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: 'http://saveload.tradingview.com',
                charts_storage_api_version: "1.1",
      client_id: 'tradingview.com',
      user_id: 'public_user_id'
    });

  }

   ngOnInit() {
    this.getTradeViewChart();
    this.showTradingViewChart();
    this.getCryptoCurrency();
    this.getFiatCurrency();
    this.getCurrencyPair();
   }
}