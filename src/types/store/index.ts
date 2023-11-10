export enum MUTATION_TYPES {
  'SET_TOKEN' = 'setToken',
  'SET_USER' = 'setUser',
  'SET_PRODUCTS' = 'setProducts',
  'SET_USERS' = 'setUsers',
  'SET_CUSTOMERS' = 'setCustomers',
  'SET_ORDERS' = 'setOrders',
  'SET_COUNTRIES' = 'setCountries',
  'SHOW_TOAST' = 'showToast',
  'HIDE_TOAST' = 'hideToast',
}

import { ILoginData } from "../component"

interface IUserData extends ILoginData {
  id: number
}

export interface IUser {
  token: string;
  data: IUserData | null;
}

export interface IGeneralData {
  loading: boolean,
  data: Array<any>,
  links: Array<any>,
  from: number | null,
  to: number | null,
  page: number,
  limit: number | null,
  total: number | null,
}

type DelayType = 1000 | 2000 | 3000 | 4000 | 5000;

export interface IToast {
  show: boolean
  message: string,
  delay: DelayType
}

type DataOptionKeyType = '1d' | '1k' | '2k' | '1m' | '3m' | '6m' | 'all';
type DataOptionTextType = '昨天' | '上周' | '最近两周' | '上月' | '最近 3 个月' | '最近 6 个月' | '全部时间';

export interface IDateOption {
  key: DataOptionKeyType,
  text: DataOptionTextType
}

export interface IState {
  user: IUser,
  products: IGeneralData,
  users: IGeneralData,
  customers: IGeneralData,
  countries: Array<string>,
  orders: IGeneralData,
  toast: IToast,
  dateOptions: IDateOption[]
}

import { Commit } from "vuex/types/index.js";

export interface ICtx {
  state: IState,
  commit: Commit
}