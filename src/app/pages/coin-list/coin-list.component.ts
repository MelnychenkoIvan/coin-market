import { Component, OnInit }      from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoinsService }           from '../../shared/services';
import { Coin }                   from '../../models/coin';
import { Observable }             from 'rxjs/Observable';

@Component({
  selector   : 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls  : ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  public coins$: Observable<Coin[]> = null;
  public form: FormGroup;

  constructor(private _coinsServ: CoinsService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getCoins();
  }

  getCoins() {
    this.coins$ = this._coinsServ.getCoins(0, 2000, this.form.value);
  }

  onSorted($event) {
    this.coins$ = this._coinsServ.sort(this.coins$, $event);
  }

  initForm() {
    this.form = this._fb.group({
      marketCapFrom: [],
      marketCapTo  : [],
      priceFrom: [],
      priceTo  : [],
      totalSupplyFrom: [],
      totalSupplyTo  : [],
      volumeFrom: [],
      volumeTo  : []

    });
  }

  onFilter() {
    this.coins$ = this._coinsServ.filter(this.form.value);
  }
}
