import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinListComponent }    from './pages/coin-list/coin-list.component';
import { LoginComponent }       from './pages/login/login.component';
import { MyFormComponent }      from './pages/my-form/my-form.component';

const routes: Routes = [
  { path: '', component: CoinListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-form', component: MyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
