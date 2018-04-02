import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// router module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// shared
import { CoinsService }                                                 from './shared/services';
import { SortableColumnComponent, SortableTableDirective, SortService } from './shared/components';
import { NumberFormatPipe }                                             from './shared/pipes';

// page components
import { CoinListComponent } from './pages/coin-list/coin-list.component';
import { LoginComponent }    from './pages/login/login.component';
import { MyFormComponent } from './pages/my-form/my-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SortableColumnComponent,
    CoinListComponent,
    SortableTableDirective,
    NumberFormatPipe,
    LoginComponent,
    MyFormComponent,
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers   : [
    CoinsService,
    SortService
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
