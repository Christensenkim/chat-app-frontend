import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { StocksComponent} from './stocks.component';
import {StockCreateComponent} from './stock-Create/stock-create.component';

const routes: Routes = [
  { path: '', component: StocksComponent },
  { path: 'create', component: StockCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
