<script setup>

import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/vue/24/outline';

const {field, sortField, sortDirection} = defineProps({
  field: String,
  sortField: String,
  sortDirection: String
})

const emit = defineEmits(['click'])

</script>

<template>
  <th @click="emit('click')" class="p-2 text-left cursor-pointer"
  :class="field === sortField ? 'text-indigo-600' : ''">
    <div class="flex items-center">
      <slot></slot>
      <div v-if="sortField === field" class="ml-2">
        <BarsArrowUpIcon v-if="sortDirection === 'asc'" class="h-6 w-6"/>
        <BarsArrowDownIcon v-else class="h-6 w-6" />
      </div>
    </div>
  </th>
</template>
