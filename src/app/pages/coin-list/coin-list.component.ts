import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup }               from '@angular/forms';
import { CoinsService, CustomerSearchCriteria } from '../../shared/services';
import { Coin }                                 from '../../models/coin';
import { Observable }                           from 'rxjs/Observable';

@Component({
  selector   : 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls  : ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  public coins$: Observable<Coin[]> = null;
  public form: FormGroup;
  public sortCriteria: CustomerSearchCriteria = { sortColumn: 'market_cap_usd', sortDirection: 'asc' };

  constructor(private _coinsServ: CoinsService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getCoins();
  }

  getCoins() {
    this.coins$ = this._coinsServ.getCoins(0, 2000, this.form.value);
  }

  onSorted(criteria: CustomerSearchCriteria) {
    this.sortCriteria = criteria;
    this.coins$ = this._coinsServ.sort(criteria);
  }

  initForm() {
    this.form = this._fb.group({
      marketCapFrom  : [1],
      marketCapTo    : [],
      priceFrom      : [],
      priceTo        : [],
      totalSupplyFrom: [],
      totalSupplyTo  : [],
      volumeFrom     : [10000],
      volumeTo       : []

    });
  }

  onFilter() {
    this.coins$ = this._coinsServ.filter(this.form.value, this.sortCriteria);
  }
}
