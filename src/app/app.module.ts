import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


// page components
import { CoinListComponent } from './pages/coin-list/coin-list.component';

// shared
import { CoinsService }                                                 from './shared/services';
import { SortableColumnComponent, SortableTableDirective, SortService } from './shared/components';
import { NumberFormatPipe }                                             from './shared/pipes';


@NgModule({
  declarations: [
    AppComponent,
    SortableColumnComponent,
    CoinListComponent,
    SortableTableDirective,
    NumberFormatPipe
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers   : [CoinsService, SortService],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
