import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockCreateComponent } from './stock-Create/stock-create.component';
import {StocksComponent} from './stocks.component';
import {StockRoutingModule} from './stock-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [StocksComponent, StockCreateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
