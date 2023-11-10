<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(['change']);

const searchItem = ref('');

defineProps({
  placeholderTxt: {
    type: String,
    default: "Search",
  },
  changeHandler: Function
});
</script>

<template>
  <div class="relative rounded-full shadow-sm">
    <MagnifyingGlassIcon
      class="h-5 w-5 text-gray-400 absolute -top-[1px] translate-y-1/2 left-2"
    />
    <input
      v-model="searchItem"
      @change="emit('change', searchItem)"
      class="w-32 focus:w-48 transition-all appearance-none py-2 pl-9 border bg-gray-100 border-gray-300 rounded-full outline-none sm:text-sm tracking-wider"
      :placeholder="placeholderTxt"
      autocorrect="off"
    />
  </div>
</template>
