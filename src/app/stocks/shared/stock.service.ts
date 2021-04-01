import { Injectable } from '@angular/core';
import {CreateStock} from './create-stock.dto';
import {Observable} from 'rxjs';
import {StockDto} from './stock.dto';
import {SocketStock} from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private socket: SocketStock) { }

  create(stock: CreateStock): void {
    this.socket.emit('create-new-stock', stock);
  }

  updateStock(stock: StockDto | undefined): void{
    this.socket.emit('update-stock', stock);
  }

  deleteStock(stock: StockDto | undefined): void {
    this.socket.emit('delete-stock', stock);
  }

  getAllStocks(): void{
    this.socket.emit('get-all-stocks');
  }

  listenForStocks(): Observable<StockDto[]> {
    return this.socket.fromEvent<StockDto[]>('heres-all-stocks');
  }

  listenForCreateSuccess(): Observable<StockDto> {
    return this.socket.fromEvent<StockDto>('stock-created-success');
  }
  listenForCreateError(): Observable<string> {
    return this.socket.fromEvent<string>('stock-created-error');
  }

}
