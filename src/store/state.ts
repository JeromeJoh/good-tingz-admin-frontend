import { IState } from "@/types/store";

export default <IState>{
  user: {
    token: sessionStorage.getItem('TOKEN'),
    data: null
  },
  products: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  users: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  customers: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  countries: [],
  orders: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
  toast: {
    show: false,
    message: '',
    delay: 5000
  },
  dateOptions: [
    {key: '1d', text: '昨天'},
    {key: '1k', text: '上周'},
    {key: '2k', text: '最近两周'},
    {key: '1m', text: '上月'},
    {key: '3m', text: '最近 3 个月'},
    {key: '6m', text: '最近 6 个月'},
    {key: 'all', text: '全部时间'},
  ]
}
