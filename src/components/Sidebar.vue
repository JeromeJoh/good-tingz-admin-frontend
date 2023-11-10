<script setup lang="ts">

import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();

import NavTab from "./base/NavTab.vue";
import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  ViewColumnsIcon,
  ChartBarIcon,
  TruckIcon
} from "@heroicons/vue/24/solid";

const activeFlag = ref<string>('');

watch(() => route.path, (to) => {
  activeFlag.value = to;
}, {
  immediate: true
})

</script>

<template>
  <div class="min-w-[180px] w-[180px] h-screen sticky top-0 transition-all py-6 border-r-[.5px] bg-white">
    <div class="flex items-center flex-col p-4 mb-4">
      <img src="../../public/ams.svg" alt="BMS" class="h-12" />
      <p class="text-lg font-bold my-2">GOOD TINGZ</p>
    </div>

    <div class="flex flex-col py-2 gap-y-4">
      <NavTab
        name="dashboard"
        text="数据总览"
        to="app.dashboard"
        :isActive="activeFlag === '/app/dashboard'"
      >
        <HomeIcon />
      </NavTab>
      <NavTab
        name="products"
        text="商品详情"
        to="app.products"
        :isActive="activeFlag === '/app/products'"
      >
        <ViewColumnsIcon />
      </NavTab>
      <NavTab
        name="orders"
        text="订单管理"
        to="app.orders"
        :isActive="activeFlag === '/app/orders'"
      >
        <TruckIcon />
      </NavTab>
      <NavTab
        name="users"
        text="用户列表"
        to="app.users"
        :isActive="activeFlag === '/app/users'"
      >
        <UsersIcon />
      </NavTab>
      <NavTab
        name="customers"
        text="顾客信息"
        to="app.customers"
        :isActive="activeFlag === '/app/customers'"
      >
        <UserGroupIcon />
      </NavTab>
      <NavTab
        name="reports"
        text="交易报告"
        to="reports.orders"
        :isActive="activeFlag === '/report/orders' || activeFlag === '/report/customers'"
      >
        <ChartBarIcon />
      </NavTab>
    </div>
  </div>
</template>
