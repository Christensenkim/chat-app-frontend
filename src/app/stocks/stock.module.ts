import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockCreateComponent } from './stock-Create/stock-create.component';
import {StocksComponent} from './stocks.component';
import {StockRoutingModule} from './stock-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {StockState} from './state/stock.state';

@NgModule({
  declarations: [StocksComponent, StockCreateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([StockState])
  ]
})
export class StockModule { }
