import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {StockDto} from '../shared/stock.dto';
import {DeleteStock, ListenForStocks, StopListeningForStocks, UpdateStocks} from './stock.action';
import {StockService} from '../shared/stock.service';
import {Subscription} from 'rxjs';

export interface StockStateModel {
  stocks: StockDto[];
}

@State<StockStateModel>({
  name: 'stock',
  defaults: {
    stocks: [{
      id: '1', name: 'GML', description: 'GAMESTOP', value: 2000},
      {id: '2', name: 'MGD', description: 'SHDGHF', value: 2000},
      {id: '3', name: 'GML', description: 'GAMESTOP', value: 2000},
      {id: '4', name: 'GML', description: 'GAMESTOP', value: 2000},
      {id: '5', name: 'GML', description: 'GAMESTOP', value: 2000},
    ]
  }
})
@Injectable()
export class StockState{
  private stocksUnsub: Subscription | undefined;

  constructor(private stockService: StockService) {
  }

  @Selector()
  static stocks(state: StockStateModel): StockDto[] {
    return state.stocks;
  }

  @Action(ListenForStocks)
  ListenForStocks(ctx: StateContext<StockStateModel>): void {
    this.stocksUnsub = this.stockService.listenForStocks()
      .subscribe(DBstocks => {
        ctx.dispatch(new UpdateStocks(DBstocks));
      });
  }

  @Action(StopListeningForStocks)
  stopListeningForStocks(ctx: StateContext<StockStateModel>): void {
    if (this.stocksUnsub){
      this.stocksUnsub.unsubscribe();
    }
  }

  @Action(UpdateStocks)
  updateStocks(ctx: StateContext<StockStateModel>, us: UpdateStocks): void {
    this.stockService.listenForStocks()
      .subscribe(DBstocks => {
        const state = ctx.getState();
        const newState: StockStateModel = {
          ...state,
          stocks: us.stocks
        };
        ctx.setState(newState);
      });
  }

  @Action(DeleteStock)
  deleteStock(ctx: StateContext<StockStateModel>, ds: DeleteStock): void {
    const state = ctx.getState();
    const newState: StockStateModel = {
      ...state,
      stocks: state.stocks.filter(stock => stock.id !== ds.stock?.id)
    };
    ctx.setState(newState);

    this.stockService.deleteStock(ds.stock);
  }

}
