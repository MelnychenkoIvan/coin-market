import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Coin }       from '../../models/coin';
import { share }      from 'rxjs/operators';

export interface CustomerSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}

export interface CustomerFilterCriteria {
  priceFrom?: string;
  priceTo?: string;
  volumeFrom?: string;
  volumeTo?: string;
  marketCapFrom?: string;
  marketCapTo?: string;
  totalSupplyFrom?: string;
  totalSupplyTo?: string;
}

@Injectable()
export class CoinsService {

  static get HOST() { return 'https://api.coinmarketcap.com'; }

  private coins;
  private coinsCopy;

  constructor(private _http: HttpClient) {}

  getCoins(start: number = 0, limit: number = 100, criteria: CustomerFilterCriteria): Observable<Coin[]> {
    // return this._http.get<Coin[]>(`${CoinsService.HOST}/v1/ticker/?start=${start}&limit=${limit}`)
    //   .map(res => this.coinsMapper(res))
    //   .switchMap(res => Observable.of(this.coins));
    return this._http.get<Coin[]>('./assets/testing-data/coins.json')
      .pipe(share())
      .map(res => this.coinsMapper(res));
    // .switchMap(res => this.filter(criteria));
  }

  coinsMapper(data) {
    this.coins = data.map(item => new Coin(item));
    this.coinsCopy = [...this.coins];
    return this.coins;
  }

  sort(data, criteria: CustomerSearchCriteria) {
    this.coins.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        return a[criteria.sortColumn] > b[criteria.sortColumn] ? 1 : -1;
      } else {
        return a[criteria.sortColumn] < b[criteria.sortColumn] ? 1 : -1;
      }
    });

    return Observable.of(this.coins);
  }

  filter(criteria: CustomerFilterCriteria) {
    const keys = Object.keys(criteria);
    const isEmpty = keys
      .map(k => criteria[k])
      .every(k => k === null || k === '');

    if (isEmpty) {
      return Observable.of(this.coinsCopy);
    }

    this.coins = this.coinsCopy
      .filter(item => {
        let isRight = true;

        if (criteria.marketCapFrom && criteria.marketCapTo
          && item.market_cap_usd <= criteria.marketCapFrom
          && item.market_cap_usd >= criteria.marketCapTo) {
          isRight = false;
        } else if (criteria.marketCapFrom && item.market_cap_usd <= criteria.marketCapFrom) {
          isRight = false;
        } else if (criteria.marketCapTo && item.market_cap_usd >= criteria.marketCapTo) {
          isRight = false;
        }

        if (criteria.priceFrom && criteria.priceTo
          && item.price_usd <= criteria.priceFrom
          && item.price_usd >= criteria.priceTo) {
          isRight = false;
        } else if (criteria.priceFrom && item.price_usd <= criteria.priceFrom) {
          isRight = false;
        } else if (criteria.priceTo && item.price_usd >= criteria.priceTo) {
          isRight = false;
        }

        if (criteria.totalSupplyFrom && criteria.totalSupplyTo
          && item.total_supply <= criteria.totalSupplyFrom
          && item.total_supply >= criteria.totalSupplyTo) {
          isRight = false;
        } else if (criteria.totalSupplyFrom && item.total_supply <= criteria.totalSupplyFrom) {
          isRight = false;
        } else if (criteria.totalSupplyTo && item.total_supply >= criteria.totalSupplyTo) {
          isRight = false;
        }

        if (criteria.volumeFrom && criteria.volumeTo
          && item['24h_volume_usd'] <= criteria.volumeFrom
          && item['24h_volume_usd'] > -criteria.volumeTo) {
          isRight = false;
        } else if (criteria.volumeFrom && item['24h_volume_usd'] <= criteria.volumeFrom) {
          isRight = false;
        } else if (criteria.volumeTo && item['24h_volume_usd'] >= criteria.volumeTo) {
          isRight = false;
        }

        return isRight;
      });
    return Observable.of(this.coins);
  }
}
