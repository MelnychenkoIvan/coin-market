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
  public paginationCriteria = {
    start: 0,
    limit: 2000
  };
  public sortCriteria: CustomerSearchCriteria = {
    sortDirection: 'asc',
    sortColumn   : 'market_cap_usd'
  };

  constructor(private _coinsServ: CoinsService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.getCoins();
  }

  getCoins() {
    this.coins$ = this._coinsServ.getCoins(this.paginationCriteria, this.form.value);
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
      priceTo        : [1],
      totalSupplyFrom: [],
      totalSupplyTo  : [10000000],
      volumeFrom     : [10000],
      volumeTo       : []

    });
  }

  onFilter() {
    this.coins$ = this._coinsServ.filter(this.form.value, this.sortCriteria);
  }
}
