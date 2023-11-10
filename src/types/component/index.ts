export interface ILoginData {
  email: string,
  password: string,
  remember: boolean
}

export interface IProductItem {
  id: string,
  title: string,
  description: string,
  images: Array<any>,
  deleted_images: Array<any>,
  image_positions: Array<any>,
  published: 0 | 1,
  price: string,
  _method: 'PUT' | 'GET'
}

export interface IPageParams {
  url: string | null;
  search: string;
  per_page?: number;
  sort_field?: string;
  sort_direction?: string;
}

export interface ICartItem {
  
}

export interface ICustomer {
  id: number,
}
