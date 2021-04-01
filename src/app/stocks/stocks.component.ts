import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {StockDto} from './shared/stock.dto';
import {StockService} from './shared/stock.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stock: StockDto | undefined;
  stocks: StockDto[] = [];
  stockPriceFc = new FormControl('');

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.listenForStocks()
      .subscribe(stocks =>
      this.stocks = stocks);
    this.stockService.getAllStocks();
  }

  updateStock(): void {
    if (this.stock) {
      this.stock.value = this.stockPriceFc.value;
    }
    this.stockService.updateStock(this.stock);
  }

  deleteStock(): void {
    this.stocks = this.stocks.filter(stock => stock.id !== this.stock?.id);
    this.stockService.deleteStock(this.stock);
  }

  stockDetails(stock: StockDto): void {
    this.stock = stock;
    this.stockPriceFc.setValue(stock.value);
    console.log(this.stock);
  }
}
