<script setup lang="ts">
import { UserIcon } from "@heroicons/vue/24/outline";

import CustomInput from "@/components/core/CustomInput.vue";
import Spinner from "@/components/core/Spinner.vue";
import EmptyTip from "@/components/base/EmptyTip.vue";
// import DoughnutChart from "@/components/core/Charts/Doughnut.vue";

import axiosClient from "@/axios.js";
import { computed, onMounted, ref } from "vue";
import { useStore, Store } from "vuex";

const store = useStore<Store>();
const dateOptions = computed(() => store.state.dateOptions);
const chosenDate = ref<string>("all");

const loading = ref({
  customersCount: true,
  productsCount: true,
  paidOrders: true,
  totalIncome: true,
  ordersByCountry: true,
  latestCustomers: true,
  latestOrders: true,
});

export interface IChartData {
  labels: string[];
  datasets: [backgroundColor: string[], data: []];
}

const customersCount = ref<number>(0);
const productsCount = ref<number>(0);
const paidOrders = ref<number>(0);
const totalIncome = ref<string>("");
const ordersByCountry = ref<any[]>([]);
const latestCustomers = ref([]);
const latestOrders = ref([]);

function updateDashboard() {
  const d = chosenDate.value;
  loading.value = {
    customersCount: true,
    productsCount: true,
    paidOrders: true,
    totalIncome: true,
    ordersByCountry: true,
    latestCustomers: true,
    latestOrders: true,
  };
  axiosClient
    .get(`/dashboard/customers-count`, { params: { d } })
    .then(({ data }) => {
      customersCount.value = data;
      loading.value.customersCount = false;
    });
  axiosClient
    .get(`/dashboard/products-count`, { params: { d } })
    .then(({ data }) => {
      productsCount.value = data;
      loading.value.productsCount = false;
    });
  axiosClient
    .get(`/dashboard/orders-count`, { params: { d } })
    .then(({ data }) => {
      paidOrders.value = data;
      loading.value.paidOrders = false;
    });
  axiosClient
    .get(`/dashboard/income-amount`, { params: { d } })
    .then(({ data }) => {
      totalIncome.value = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(data);
      loading.value.totalIncome = false;
    });
  axiosClient
    .get(`/dashboard/latest-orders`, { params: { d } })
    .then(({ data: orders }) => {
      latestOrders.value = orders.data;
      loading.value.latestOrders = false;
    });
  axiosClient
    .get(`/dashboard/latest-customers`, { params: { d } })
    .then(({ data: customers }) => {
      latestCustomers.value = customers;
      loading.value.latestCustomers = false;
    });
  // axiosClient
  //   .get(`/dashboard/orders-by-country`, { params: { d } })
  //   .then(({ data: countries }) => {
  //     loading.value.ordersByCountry = false;
  //     const chartData = {
  //       labels: [],
  //       datasets: [
  //         {
  //           backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
  //           data: [],
  //         },
  //       ],
  //     };
  //     countries.length &&
  //       countries.forEach((c) => {
  //         chartData.labels.push(c.name);
  //         chartData.datasets[0].data.push(c.count);
  //       });

  //     ordersByCountry.value = chartData;
  //     console.log();
  //   });
}

function onDatePickerChange() {
  updateDashboard();
  console.log(ordersByCountry.value);
}

onMounted(() => updateDashboard());
</script>

<template>
  <div class="mb-3 flex items-center justify-between">
    <h1 class="text-3xl font-semibold px-2">Dashboard</h1>
    <CustomInput
      type="select"
      v-model="chosenDate"
      @change="onDatePickerChange"
      :select-options="dateOptions"
    />
  </div>

  <div class="grid grid-cols-1 text-center md:text-left md:grid-cols-4 gap-3 mb-4 tracking-wider">
    <!--    Active Customers-->
    <div
      class="animate-fade-in-down bg-white py-3 px-6 rounded-lg shadow"
    >
      <div class="p-2 h-full">
        <label class="text-base font-semibold block mb-3 text-gray-500"
          >顾客总数</label
        >
        <template v-if="!loading.customersCount">
          <span class="text-4xl font-semibold">{{ customersCount }}</span>
        </template>
        <Spinner v-else />
      </div>
    </div>
    <!--/    Active Customers-->

    <!--    Active Products -->
    <div
      class="animate-fade-in-down bg-white py-3 px-6 rounded-lg shadow"
      style="animation-delay: 0.1s"
    >
      <div class="p-2 h-full">
        <label class="text-base font-semibold block mb-3 text-gray-500"
          >在售商品种类</label
        >
        <template v-if="!loading.productsCount">
          <span class="text-4xl font-semibold">{{ productsCount }}</span>
        </template>
        <Spinner v-else text="" class="" />
      </div>
    </div>
    <!--/    Active Products -->

    <!--    Paid Orders -->
    <div
      class="animate-fade-in-down bg-white py-3 px-6 rounded-lg shadow"
      style="animation-delay: 0.2s"
    >
      <div class="h-full p-2">
        <label class="text-base font-semibold block mb-3 text-gray-500"
          >已支付订单数</label
        >
        <template v-if="!loading.paidOrders">
          <span class="text-4xl font-semibold">{{ paidOrders }}</span>
        </template>
        <Spinner v-else text="" class="" />
      </div>
    </div>
    <!--/    Paid Orders -->

    <!--    Total Income -->
    <div
      class="animate-fade-in-down bg-white py-3 px-6 rounded-lg shadow"
      style="animation-delay: 0.3s"
    >
      <div class="h-full p-2">
        <label class="text-base font-semibold block mb-3 text-gray-500"
          >总收入</label
        >
        <template v-if="!loading.totalIncome">
          <span class="text-4xl font-semibold">{{ totalIncome }}</span>
        </template>
        <Spinner v-else text="" class="" />
      </div>
    </div>
    <!--/    Total Income -->
  </div>

  <div
    class="grid grid-rows-1 md:grid-rows-2 md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-3"
  >
    <!-- Latest Orders -->
    <div
      class="h-fit col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-white py-6 px-5 rounded-lg shadow tracking-wide"
    >
      <label class="text-lg font-semibold block mb-2">最近交易的订单</label>
      <Spinner v-if="loading.latestOrders" />
      <template v-else>
        <template v-if="latestOrders.length">
          <div
            v-for="o of latestOrders"
            :key="o.id"
            class="py-2 px-3 hover:bg-gray-50"
          >
            <p>
              <router-link
                :to="{ name: 'app.orders.view', params: { id: o.id } }"
                class="text-indigo-600 font-semibold"
              >
                Order #{{ o.id }}
              </router-link>
              created {{ o.created_at }}. {{ o.items }} items
            </p>
            <p class="flex justify-between">
              <span>{{ o.first_name }} {{ o.last_name }}</span>
              <span>{{ o.total_price }}</span>
            </p>
          </div>
        </template>
        <EmptyTip v-else />
      </template>
    </div>
    <!-- Latest Orders -->

    <!-- Orders by Country -->
    <!-- <div class="bg-white py-6 px-5 rounded-lg shadow tracking-wide">
      <label class="text-lg font-semibold block mb-2">不同国家的订单</label>
      <template v-if="!loading.ordersByCountry">
        <DoughnutChart :width="140" :height="200" :data="ordersByCountry" />
      </template>
      <Spinner v-else text="" class="" />
    </div> -->
    <!-- Orders by Country -->

    <!-- Latest Customers -->
    <div class="bg-white py-6 px-5 rounded-lg shadow tracking-wide">
      <label class="text-lg font-semibold block mb-2">最近消费的顾客</label>
      <Spinner v-if="loading.latestCustomers" />
      <template v-else>
        <template v-if="latestCustomers.length">
          <router-link
            :to="{ name: 'app.customers.view', params: { id: c.id } }"
            v-for="c of latestCustomers"
            :key="c.id"
            class="mb-3 flex"
          >
            <div
              class="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full mr-2"
            >
              <UserIcon class="w-5" />
            </div>
            <div>
              <h3>{{ c.first_name }} {{ c.last_name }}</h3>
              <p>{{ c.email }}</p>
            </div>
          </router-link>
        </template>
        <EmptyTip v-else />
      </template>
    </div>
    <!-- Latest Customers -->
  </div>
</template>
