<script setup>
import store from "@/store/index.js";
import { computed, ref, watch } from "vue";

import { XMarkIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";

let interval = null;
let timeout = null;

const percent = ref(0);

const toast = computed(() => store.state.toast);
watch(store.state.toast, (newToast) => {
  if (newToast.show) {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      close();
      timeout = null;
    }, toast.value.delay);
    const startDate = Date.now();
    const futureDate = Date.now() + toast.value.delay;
    interval = setInterval(() => {
      const date = Date.now();
      percent.value = ((date - startDate) * 100) / (futureDate - startDate);
      if (percent.value >= 100) {
        clearInterval(interval);
        interval = null;
      }
    }, 30);
  }
});

function close() {
  store.commit("hideToast");
}
</script>

<template>
  <div
    v-show="toast.show"
    class="fixed w-80 px-4 py-4 top-4 bg-emerald-300 rounded shadow"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <CheckCircleIcon class="h-8 w-8 mr-2" />
        <span class="font-bold tracking-widest">{{ toast.message }}</span>
      </div>
      <button @click="close" class="bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
     </button>
    </div>
    <!-- Progress -->
    <div>
      <div
        class="w-80 absolute left-0 bottom-0 right-0 h-2 bg-black/10"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
  </div>
</template>
