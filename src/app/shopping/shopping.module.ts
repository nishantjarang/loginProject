import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderDemoComponent } from './heading/header-demo/header-demo.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';


@NgModule({
  declarations: [
    ShoppingComponent,
    HomeComponent,
    HeaderDemoComponent,
    CustomerprofileComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxPaginationModule
  ],
  exports:[

    HeaderDemoComponent
  ]
})
export class ShoppingModule { }
