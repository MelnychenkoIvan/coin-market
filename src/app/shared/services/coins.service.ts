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

  private coins: Coin[];
  private coinsCopy: Coin[];

  constructor(private _http: HttpClient) {}

  getCoins(paginationCriteria, filterCriteria: CustomerFilterCriteria): Observable<Coin[]> {
    return this._http.get<Coin[]>(`${CoinsService.HOST}/v1/ticker/?start=${paginationCriteria.start}&limit=${paginationCriteria.limit}`)
      .pipe(share())
      .map(res => this.coinsMapper(res))
      .map(() => this._filter(filterCriteria))
      .map(res => this.coins = res);
    // return this._http.get<Coin[]>('./assets/testing-data/coins.json')
    //   .pipe(share())
    //   .map(res => this.coinsMapper(res))
    //   .map(() => this._filter(filterCriteria))
    //   .map(res => this.coins = res);
  }

  coinsMapper(data) {
    this.coins = data.map(item => new Coin(item));
    this.coinsCopy = [...this.coins];
    return this.coins;
  }

  sort(sortCriteria: CustomerSearchCriteria) {
    this.coins = this._sort(this.coins, sortCriteria);

    return Observable.of(this.coins);
  }

  filter(filterCriteria: CustomerFilterCriteria, sortCriteria: CustomerSearchCriteria) {
    const keys = Object.keys(filterCriteria);
    const isEmpty = keys
      .map(k => filterCriteria[k])
      .every(k => k === null || k === '');

    if (isEmpty) {
      return Observable.of(this.coinsCopy);
    }
    this.coins = this._filter(filterCriteria);
    this.coins = this._sort(this.coins, sortCriteria);

    return Observable.of(this.coins);
  }

  private _filter(criteria): Coin[] {
    return this.coinsCopy
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
  }

  private _sort(data: Coin[], sortCriteria: CustomerSearchCriteria) {
    data = [...data];
    data.sort((a, b) => {
      if (sortCriteria.sortDirection === 'desc') {
        return a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn] ? 1 : -1;
      } else {
        return a[sortCriteria.sortColumn] < b[sortCriteria.sortColumn] ? 1 : -1;
      }
    });

    return data;
  }
}
