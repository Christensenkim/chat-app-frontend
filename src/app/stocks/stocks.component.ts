import { Component, OnInit, OnDestroy } from '@angular/core';
import {StockDto} from './shared/stock.dto';
import {StockService} from './shared/stock.service';
import {FormControl} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {StockState} from './state/stock.state';
import {DeleteStock, ListenForStocks, StopListeningForStocks} from './state/stock.action';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit, OnDestroy {
  stock: StockDto | undefined;
  @Select(StockState.stocks) stocks: Observable<StockDto[]> | undefined;
  stockPriceFc = new FormControl('');

  constructor(private store: Store,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForStocks());
    this.stockService.getAllStocks();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForStocks());
  }

  updateStock(): void {
    if (this.stock) {
      this.stock.value = this.stockPriceFc.value;
    }
    this.stockService.updateStock(this.stock);
  }

  deleteStock(): void {
    this.store.dispatch(new DeleteStock(this.stock)).subscribe();
  }

  stockDetails(stock: StockDto): void {
    this.stock = stock;
    this.stockPriceFc.setValue(stock.value);
  }
}
