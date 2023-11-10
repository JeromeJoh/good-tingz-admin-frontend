<script setup>
const { title } = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex w-full min-h-full flex-1 flex-col">
    <!-- Header -->
    <header class="flex item-center w-full px-8 py-6">
      <img src="../../public/ams.svg" alt="BMS" class="h-14" />
      <div class="ml-2 mt-1">
        <h2 class="text-xl font-bold">好物什商城后台管理系统</h2>
        <h2 class="text-sm font-thin mt-1">Good Tingz BMS for Admin</h2>
      </div>
    </header>

    <!-- Main Content-->
    <main>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm px-4 py-6 border-b-[.5px]">
        <div class="flex justify-center items-center">
          <img src="../../public/ams.svg" alt="BMS" class="h-12 sm:h-14" />
          <span class="text-sm font-light mx-4">developed for</span>
          <img src="../../public/logo.svg" alt="LOGO" class="h-12 sm:h-14" />
        </div>
      </div>
      <h2 class="mt-8 text-center text-2xl font-extrabold mb-4">
        {{ title?.split("").join(" ") }}
      </h2>
      <slot></slot>
    </main>
  </div>
</template>
