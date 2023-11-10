<script setup lang="ts">
import CustomInput from "@/components/core/CustomInput.vue";

import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore, Store } from "vuex";

const store = useStore<Store>();
const router = useRouter();
const route = useRoute();
const dateOptions = computed(() => store.state.dateOptions);
const chosenDate = ref<string>("all");

function onDatePickerChange() {
  router.push({ name: route.name, params: { date: chosenDate.value } });
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold px-2">Reports</h1>
    </div>
    <div class="flex justify-between items-center mt-2">
      <div
        class="p-2 tracking-widest text-gray-400"
      >
        <router-link
          :to="{ name: 'reports.orders', params: route.params }"
          class="w-8 p-2 mr-4 border-b-2"
          active-class="text-indigo-600 border-indigo-600"
          >订单数据
        </router-link>
        <router-link
          :to="{ name: 'reports.customers', params: route.params }"
          class="w-8 p-2 border-b-2"
          active-class="text-indigo-600 border-indigo-600"
          >顾客数据
        </router-link>
      </div>
      <CustomInput
        type="select"
        v-model="chosenDate"
        @change="onDatePickerChange"
        :select-options="dateOptions"
      />
    </div>

    <div class="bg-white p-3 rounded-lg mt-3 shadow">
      <router-view />
    </div>
  </div>
</template>