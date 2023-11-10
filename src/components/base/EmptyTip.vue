<script setup>
import { defineProps } from "vue";

import { ArchiveBoxXMarkIcon } from "@heroicons/vue/24/solid";

const { layout } = defineProps({
  text: {
    type: String,
    default: "暂无数据",
  },
  layout : {
    type: String,
    default: 'left'
  }
});

const bindClass = `p-1 text-gray-600 font-medium ${ layout !== 'left' ? 'w-full text-center mt-8' : 'w-fit'}`;

</script>

<template>
  <div :class="bindClass">
    <p class="text-base tracking-wider">{{ text }}</p>
  </div>
</template>
