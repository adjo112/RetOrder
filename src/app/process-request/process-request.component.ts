import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReqserviceService } from './reqservice.service';
import { Router } from '@angular/router';
import { ProcRequest } from './ProcRequest';
import { ProcResponse } from './ProcResponse';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.css'],
})
export class ProcessRequestComponent implements OnInit {
  requestData: any;
  balanceamt: any;
  requestForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    ContactNumber: new FormControl('', Validators.required),
    CreditCardNumber: new FormControl('', Validators.required),
    ComponentType: new FormControl('Integral', Validators.required),
    ComponentName: new FormControl('Repair', Validators.required),
    Quantity: new FormControl('', Validators.required),
    PriorityRequest: new FormControl('Y', Validators.required),
  });

  constructor(private service: ReqserviceService, private route: Router) {}

  ngOnInit(): void {}

  /*
     let cred = this.loginForm.value;
    let user = new User(0, cred.username, cred.password);
    this.loginservice.login(user).subscribe(
     UserName: string;
  ContactNumber: string;
  CreditCardNumber: string;
  ComponentType: string;
  ComponentName: string;
  Quantity: number;
  PriorityRequest: boolean;


  */

  onSubmitrequestForm() {
    let procreq = this.requestForm.value;
    let procmodel = new ProcRequest(
      procreq.UserName,
      procreq.ContactNumber,
      procreq.CreditCardNumber,
      procreq.ComponentType,
      procreq.ComponentName,
      procreq.Quantity,
      procreq.PriorityRequest
    );

    this.service.createProcessReqandResponse(procmodel).subscribe(
      (res) => {
        this.requestData = res;
        console.log(res);
        this.requestForm.reset();
      },
      (error) => {
        if (error.status == 401) {
          this.route.navigate(['login']);
        }
      }
    );
  }
  payment() {
    /*
      let cred = this.LoginFormgrp.value;
      let user = new User(0, cred.username, cred.password);

       creditCardNo: "22222"
dateOfDelivery: "2022-05-22T11:56:04.3435396+05:30"
id_res: 8
packagingAndDeliveryCharge: 600
processingCharge: 1400
requestId: 26908
totalCharge: 2000
userName: "u1"

    */
    let respmodel = new ProcResponse(
      this.requestData.id_res,
      this.requestData.requestId,
      this.requestData.userName,
      this.requestData.processingCharge,
      this.requestData.packagingAndDeliveryCharge,
      this.requestData.dateOfDelivery,
      this.requestData.totalCharge,
      this.requestData.creditCardNo
    );

    console.log(this.requestData.id_res);

    this.service.PaymentConfirm(respmodel).subscribe(
      (res) => {
        console.log(res);
        this.balanceamt = res;
      },
      (error) => {
        if (error.status == 401) {
          this.route.navigate(['login']);
        }
      }
    );
  }
}
