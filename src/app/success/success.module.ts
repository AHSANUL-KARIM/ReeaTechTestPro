import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SuccessComponent } from './success.component';


@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    MatToolbarModule
  ]
})
export class SuccessModule { 
  constructor() {
    console.log("SuccessMod")
  }
}
