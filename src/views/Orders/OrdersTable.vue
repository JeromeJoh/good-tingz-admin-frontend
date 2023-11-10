<script setup>
import store from "@/store";
import { computed, onMounted, ref } from "vue";

import { PRODUCTS_PER_PAGE } from "@/constants";
import Spinner from "@/components/core/Spinner.vue";
import TableHeaderCell from "@/components/core/Table/TableHeaderCell.vue";
import OrderStatus from "./OrderStatus.vue";
import SearchBar from "@/components/base/SearchBar.vue";
import EmptyTip from "@/components/base/EmptyTip.vue";

const perPage = ref(PRODUCTS_PER_PAGE);
const searchItem = ref("");
const orders = computed(() => store.state.orders);
const sortField = ref("updated_at");
const sortDirection = ref("desc");

const order = ref({});
const showOrderModal = ref(false);

const emit = defineEmits(["clickEdit"]);

onMounted(() => {
  getOrders();
});

function search(keyword) {
  searchItem.value = keyword;
  getOrders(null);
}

function getForPage(ev, link) {
  if (!link.url || link.active) {
    return;
  }

  getOrders(link.url);
}

function getOrders(url = null) {
  store.dispatch("getOrders", {
    url,
    search: search.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
  });
}

function sortOrders(field) {
  if (field === sortField.value) {
    if (sortDirection.value === "desc") {
      sortDirection.value = "asc";
    } else {
      sortDirection.value = "desc";
    }
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  getOrders();
}

function showAddNewModal() {
  showOrderModal.value = true;
}

function deleteOrder(order) {
  if (!confirm(`你确定删除这条交易记录吗？`)) {
    return;
  }
  store.dispatch("deleteOrder", order.id).then((res) => {
    store.commit('showToast', '交易记录已删除');
    store.dispatch("getOrders");
  });
}

function showOrder(p) {
  emit("clickShow", p);
}
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
    <div class="flex justify-between pb-4 tracking-wider border-b-[.5px]">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">每页</span>
        <select @change="getOrders(null)" v-model="perPage"
                class="appearance-none relative w-16 text-center inline-flex items-center justify-center bg-gray-100 font-bold border-b rounded-lg shadow-sm border-gray-300 py-1 border text-sm placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span class="ml-3">条，共 <em class="font-bold">{{ orders.total }}</em> 条交易记录</span>
      </div>
      <SearchBar @change="search" />
    </div>

    <table class="table-auto w-full mt-3 mb-6">
      <thead>
        <tr>
          <TableHeaderCell
            field="id"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortOrders('id')"
          >
            ID
          </TableHeaderCell>
          <TableHeaderCell
            :sort-field="sortField"
            :sort-direction="sortDirection"
          >
            订购方
          </TableHeaderCell>
          <TableHeaderCell
            field="status"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortOrders('status')"
          >
            状态
          </TableHeaderCell>
          <TableHeaderCell
            field="total_price"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortOrders('total_price')"
          >
            总价
          </TableHeaderCell>
          <TableHeaderCell
            field="created_at"
            :sort-field="sortField"
            :sort-direction="sortDirection"
            @click="sortOrders('created_at')"
          >
            创建日期
          </TableHeaderCell>
          <TableHeaderCell field="actions"> 操作 </TableHeaderCell>
        </tr>
      </thead>
      <tbody v-if="orders.loading || !orders.data.length">
        <tr>
          <td colspan="6">
            <Spinner v-if="orders.loading" />
            <EmptyTip v-else text="目前还没有任何交易记录" layout="center" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(order, index) of orders.data">
          <td class="border-b-[.5px] p-2">{{ order.id }}</td>
          <td class="border-b-[.5px] p-2">
            {{ order.customer.first_name }} {{ order.customer.last_name }}
          </td>
          <td class="border-b-[.5px] p-2">
            <OrderStatus :order="order" />
          </td>
          <td class="border-b-[.5px] p-2">
            {{ $filters.currencyUSD(order.total_price) }}
          </td>
          <td
            class="border-b-[.5px] p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ order.created_at }}
          </td>
          <td class="border-b-[.5px] p-2">
            <router-link
              :to="{ name: 'app.orders.view', params: { id: order.id } }"
              class="w-8 h-8 rounded-full text-indigo-700 border border-indigo-700 flex justify-center items-center hover:text-white hover:bg-indigo-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!orders.loading" class="flex justify-between items-center mt-5 select-none">
      <div v-if="orders.data.length" class="tracking-wide">
        正在展示：第 <em class="font-bold">{{ orders.from }} - {{ orders.to }}</em> 项
      </div>
      <nav
        v-if="!(orders.total > orders.limit)"
        class="relative z-0 inline-flex justify-center rounded shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <a
          v-for="(link, i) of orders.links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click.prevent="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
              i === 0 ? 'rounded-l-md' : '',
              i === orders.links.length - 1 ? 'rounded-r-md' : '',
              !link.url ? ' bg-gray-100 text-gray-700': ''
            ]"
          v-html="link.label"
        >
        </a>
      </nav>
    </div>
  </div>
</template>
