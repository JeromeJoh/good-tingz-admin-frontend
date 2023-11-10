import axiosClient from "@/axios";
import { ICtx } from "@/types/store";
import { ILoginData, IPageParams, IProductItem, ICustomer } from "@/types/component";

export async function getCurrentUser({ commit }: ICtx, data: any): Promise<any> {
  return axiosClient.get("/user", data).then(({ data }) => {
    commit("setUser", data);
    return data;
  });
}

export async function login({ commit }: ICtx, data: ILoginData) {
  return axiosClient.post("/login", data).then(({ data }) => {
    commit("setUser", data.user);
    commit("setToken", data.token);
    return data;
  });
}

export async function logout({ commit }: ICtx) {
  return axiosClient.post("/logout").then((response) => {
    commit("setToken", null);

    return response;
  });
}

export async function getCountries({ commit }: ICtx) {
  return axiosClient.get("countries").then(({ data }) => {
    commit("setCountries", data);
  });
}

export async function getOrders(
  { commit, state }: ICtx,
  { url = null, search = "", per_page, sort_field, sort_direction }: IPageParams
) {
  commit("setOrders", [true]);
  url = url || "/orders";
  const params = {
    per_page: state.orders.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setOrders", [false, response.data]);
    })
    .catch(() => {
      commit("setOrders", [false]);
    });
}

export async function getOrder( id: string | number) {
  return axiosClient.get(`/orders/${id}`);
}

export async function getProducts(
  { commit, state }: ICtx,
  { url = null, search = "", per_page, sort_field, sort_direction }: IPageParams
) {
  commit("setProducts", [true]);
  url = url || "/products";
  const params = {
    per_page: state.products.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      console.log(response.data);
      commit("setProducts", [false, response.data]);
    })
    .catch(() => {
      commit("setProducts", [false]);
    });
}

export async function getProduct(id: string | number) {
  return axiosClient.get(`/products/${id}`);
}

export async function createProduct(product) {
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append("title", product.title);
    product.images.forEach((im) => form.append("images[]", im));
    form.append("description", product.description || "");
    form.append("published", product.published ? '1' : '0');
    form.append("price", product.price);
    product = form;
  }
  return axiosClient.post("/products", product);
}

export async function updateProduct(product: IProductItem) {
  const id = product.id;
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append("id", product.id);
    form.append("title", product.title);
    product.images.forEach((im) => form.append(`images[${im.id}]`, im));
    if (product.deleted_images) {
      product.deleted_images.forEach((id) =>
        form.append("deleted_images[]", id)
      );
    }
    for (let id in product.image_positions) {
      form.append(`image_positions[${id}]`, product.image_positions[id]);
    }
    form.append("description", product.description || "");
    form.append("published", product.published ? '1' : '0');
    form.append("price", product.price);
    form.append("_method", "PUT");
    product = form;
  } else {
    product._method = "PUT";
  }
  return axiosClient.post(`/products/${id}`, product);
}

export async function deleteProduct(id: string | number) {
  return axiosClient.delete(`/products/${id}`);
}

export async function getUsers(
  { commit, state },
  { url = null, search = "", per_page, sort_field, sort_direction }: IPageParams
) {
  commit("setUsers", [true]);
  url = url || "/users";
  const params = {
    per_page: state.users.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setUsers", [false, response.data]);
    })
    .catch(() => {
      commit("setUsers", [false]);
    });
}

export async function createUser(user) {
  return axiosClient.post("/users", user);
}

export async function updateUser(user) {
  return axiosClient.put(`/users/${user.id}`, user);
}

export async function getCustomers(
  { commit, state }: ICtx,
  { url = null, search = "", per_page, sort_field, sort_direction }: IPageParams
) {
  commit("setCustomers", [true]);
  url = url || "/customers";
  const params = {
    per_page: state.customers.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setCustomers", [false, response.data]);
    })
    .catch(() => {
      commit("setCustomers", [false]);
    });
}

export function getCustomer(id: string | number) {
  return axiosClient.get(`/customers/${id}`);
}

export function createCustomer(customer: ICustomer) {
  return axiosClient.post("/customers", customer);
}

export function updateCustomer(customer: ICustomer) {
  return axiosClient.put(`/customers/${customer.id}`, customer);
}

export function deleteCustomer(customer: ICustomer) {
  return axiosClient.delete(`/customers/${customer.id}`);
}
