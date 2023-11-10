<script setup>
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";

defineProps({
  errorMsg: String,
});
</script>

<template>
  <div>
    <div
      v-if="errorMsg"
      class="flex items-center px-3 py-2 bg-red-400 rounded text-white"
    >
      <ExclamationCircleIcon class="w-6 h-6 mr-2 flex-shrink-0" />
      <span class="tracking-wide text-sm font-light">{{ errorMsg }}</span>
      <span
        @click="errorMsg = ''"
        class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto transition-colors text-[rgba(0,0,0,0.3)] hover:text-[rgba(0,0,0,0.5)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
    <input type="hidden" name="remember" value="true" />
  </div>
</template>
