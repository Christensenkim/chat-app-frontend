import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import {environment} from '../environments/environment';
import {StockState} from './stocks/state/stock.state';

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: {} });
  }
}

@Injectable()
export class SocketStock extends Socket {
  constructor() {
    super({ url: 'http://localhost:3100', options: {} });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    NgbModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    })
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
