import {StockDto} from '../shared/stock.dto';

export class ListenForStocks {
  static readonly type = '[Stock] Listen For Stocks';
}

export class StopListeningForStocks {
  static readonly type = '[Stock] Stop Listening For Stocks';
}

export class DeleteStock {
  constructor(public stock: StockDto | undefined) {}
  static readonly type = '[Stock] Delete Stock';
}

export class UpdateStocks {
  constructor(public stocks: StockDto[]) {}
  static readonly type = '[Stock] Update Stocks';
}

