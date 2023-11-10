<script setup>
import { defineProps } from "vue";

const { isActive } = defineProps({
  name: String,
  text: String,
  to: String,
  isActive: Boolean,
});

</script>

<template>
  <router-link
    :to="{ name: to }"
    :class="{ 'border-r-2 border-indigo-600' : isActive }"
    class="flex items-center py-4 pl-12 transition-colors text-gray-400 hover:text-indigo-600"
  >
    <span :class="['mr-2 w-5', { 'text-indigo-600': isActive }]">
      <slot></slot>
    </span>
    <span :class="{ 'text-black': isActive }" class="tracking-wider font-medium">
      {{ text }}</span
    >
  </router-link>
</template>
