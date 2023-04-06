import { QueryKey } from "react-query";
import { SSRConfig as i18nextSSRConfig } from "next-i18next";

export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string | string[];
  limit?: number | any;
  page?: number;
  start_date?: any;
  end_date?: any;
  providers?: string | string[];
  provider?: string | string[];
  type?: string | string[];
  q?: string;
  id?: string | number;
};
export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type GameQueryOptionsType = {
  provider?: string;
  type?: string;
  limit?: number;
};

export type GamesQueryOptionsType = {
  id?: string | number;
  name?: string;
  thumbnail?: string;
  limit?: number;
};

export type ProvidersQueryOptionsType = {
  text?: string;
  type?: string;
  status?: string;
  limit?: number;
};

export type Provider = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  games?: Game[];
  gamesCount?: number;
};

export type GameTypeQueryOptionsType = {
  _id?: number | string;
  name?: string;
};

export type GameType = {
  _id: number | string;
  name: string;
  providers: string;
};

export type Game = {
  _id: string;
  id: number | string;
  name: string;
  slug: string;
  image: any;
  sku?: string;
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  [key: string]: unknown;
  total_items: number;
  rtp?: any;
  game_name?: string;
  provider_name?: string;
  type?: any;
};

export type User = {
  id: number | string;
  active_wallet_balance: number;
  username: string;
  email: string;
  balance: number;
  phone_number: number;
  bank_name: string;
  bank_account_number: number;
  bank_account_name: string;
  has_pin: boolean;
  locked: boolean;
  status: string;
  created_at: string;
  role: string;
  active_wallet_provider: string;
  balance_commission: number;
  promotion_balance: number;
};

export type UserQueryOptionsType = {
  username?: string;
  balance?: string;
  bank_name?: string;
  bank_account_name?: string;
  bank_account_number?: number;
};

export type Bank = {
  map(arg0: (value: string) => number): unknown;
  _id: number | string;
  name: string;
  bank: string;
  account_number: string;
  username: string;
  dealer_id: string;
  created_at: string;
  updated_at: string;
  bank_type: string;
  status: string;
  external_id: string;
  type?: string;
};

export type Deposit = {
  _id: number | string;
  amount: number;
  bank: string;
  status: string;
  created_at: string;
};

export type Commission = {
  _id: number | string;
  credit: number;
  market: string;
  referrer: string;
  created_at: string;
};

export type Withdrawal = {
  _id: number | string;
  amount: number;
  bank: string;
  status: string;
  created_at: string;
};

export type Transaction = {
  _id?: string;
  type?: string;
  relation_id?: string;
  provider?: string;
  debit?: number;
  credit?: number;
  username?: string;
  dealer_id?: string;
  balance?: number;
  created_at?: Date;
  updated_at?: Date;
  commission?: number;
  commission_to?: string;
  timestamp?: number;
  referrer?: null;
  period?: number;
  global_period?: number;
  market?: string;
  real_market?: string;
  previous_wallet_balance?: null;
};

export type NotificationQueryOptionsType = {
  message?: string;
  created_at?: string;
  type?: string;
  status?: string;
};

export type Notification = {
  _id: string;
  message: string;
  created_at: string;
  type: string;
  status: string;
  admin_username: string;
  direction: string;
  member_username: string;
};

export type FeaturedGame = {
  provider: string;
  provider_game_id: string;
  active: boolean;
  game_name: string;
  order: number;
  provider_name: string;
  type: string;
  type_name: string;
  image: string;
  updated_at: Date;
};

export type Pages = {
  category: string;
  created_at: string;
  dealer_id: string;
  keyword: string;
  langguage: string;
  name: string;
  section: string;
  updated_at: string;
  url_addres: string;
  value: string;
};

export type MarketType = {
  real_market: string;
  period: number;
  market: string;
  main_prize: string[];
  starter_prize: string[];
  consolation_prize: string[];
  created_at: string;
  market_display: string;
  market_name: string;
  open_hours?: Date[] | [];
  close_hours?: Date[] | [];
};

export type DealerType = {
  _id: string;
  short_code: string;
  host: string;
  balance: number;
  wallet_type: string;
  client_url: string;
  lobby_url: string;
  ip: string;
  subdealer_id: string;
};

export type GameCountByProvider = {
  _id: Array<string>;
  provider: string;
  type: Array<string>;
  count: number;
};

export type BankOptions =
  | Array<{
      label: string;
      value: string;
      type: string;
    }>
  | [];

export type DefaultPageProps = {
  locale: string;
  _nextI18Next: i18nextSSRConfig;
  config: {
    api_key: string;
    api_endpoint: string;
    lobby_url: string;
    config: any;
  };
};
