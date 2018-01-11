export class Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: number;
  price_btc: number;
  '24h_volume_usd': number;
  market_cap_usd: number;
  available_supply: number;
  total_supply: number;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
  price_to_amount?: number;

  constructor(value) {
    this.id = value.id;
    this.name = value.name;
    this.symbol = value.symbol;
    this.rank = parseInt(value.rank);
    this.price_usd = value.price_usd ? parseFloat(value.price_usd) : 0;
    this.price_btc = value.price_btc ? parseFloat(value.price_btc) : 0;
    this['24h_volume_usd'] = value['24h_volume_usd'] ? parseInt(value['24h_volume_usd']) : 0;
    this.market_cap_usd = value.market_cap_usd ? parseInt(value.market_cap_usd) : 0;
    this.available_supply = value.available_supply ? parseInt(value.available_supply) : 0;
    this.total_supply = value.total_supply ? parseInt(value.total_supply) : 0;
    this.percent_change_1h = value.percent_change_1h;
    this.percent_change_24h = value.percent_change_24h;
    this.percent_change_7d = value.percent_change_7d;
    this.last_updated = value.last_updated;
    this.price_to_amount = (this.price_usd / (this.total_supply === 0 ? 1 : this.total_supply));
  }
}
