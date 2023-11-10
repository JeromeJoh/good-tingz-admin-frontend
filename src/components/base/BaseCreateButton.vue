<script setup lang="ts">
import { defineProps } from "vue";

import { PlusIcon } from "@heroicons/vue/24/solid";

defineProps({
  product: Boolean,
  user: Boolean,
});

</script>

<template>
  <template v-if="product && !user">
    <router-link
      :to="{ name: 'app.products.create' }"
      class="flex justify-center items-center py-3 pl-2 pr-3 rounded-lg text-white hover:text-white hover:bg-indigo-700 bg-indigo-600 tracking-widest"
    >
      <PlusIcon class="w-5 h-5 mr-1" />
      <span class="text-sm font-medium">创建新商品</span>
    </router-link>
  </template>
  <template v-else>
    <button
      type="button"
      class="flex justify-center items-center py-3 pl-2 pr-3 rounded-lg text-white hover:text-white hover:bg-indigo-700 bg-indigo-600 tracking-widest"
    >
      <PlusIcon class="w-5 h-5 mr-1" />
      <span class="text-sm font-medium">创建新用户</span>
    </button>
  </template>
</template>
