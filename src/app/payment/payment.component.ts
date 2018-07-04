import { Component, OnInit ,ViewContainerRef  } from '@angular/core';
import { PaymentService } from './payment.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';

declare var $: any;
declare var braintree:any;
declare var client:any;
declare var dropin:any;
declare var hoisted:any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[ToastsManager]
})

export class PaymentComponent implements OnInit{
  step: string = 'paymentPart';
  token:any;
  transactionId:any;
  message:any;
  showOnPurchase:boolean=false;
  hideOnPurchase:boolean=true;
  status:any;
  cardHolderNumber:any;

  constructor(private PaymentService:PaymentService,vcr: ViewContainerRef,private toasterService: ToastsManager) {
    this.toasterService.setRootViewContainerRef(vcr);
    this.listTokenKey();
  }


  listTokenKey(){
   
       this.PaymentService.getTokenizationKey().subscribe(successData => {
            this.token=successData.token;
        }, errorData => {
          console.log("Error",errorData);
        })

  }

  onPaymentStatus(event){
    console.log(event);
    this.showOnPurchase=true;
    this.hideOnPurchase=false;
    this.transactionId=event.responseObject.id;
    this.message=event.message;
    this.status=event.responseObject.status;
    this.cardHolderNumber=event.responseObject.creditCard.cardholderName;
    this.toasterService.success(this.message);
  }
  

  ngOnInit() {

  }

}
