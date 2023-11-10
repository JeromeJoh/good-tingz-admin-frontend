<template>
  <div class="grid place-items-center min-h-full min-w-full">
    <div class="flex py-4">
      <span
        class="text-indigo-600 self-start text-4xl px-8 font-bold border-r pb-8 leading-10"
      >
        404
      </span>
      <div class="px-8">
        <h1 class="text-4xl font-bold mb-2">抱歉，页面不存在。</h1>
        <p class="text-gray-400 mb-10">请检查 URL 地址并重新尝试</p>
        <router-link
          :to="{ name: 'app.dashboard' }"
          class="py-2 px-4 text-sm text-white font-bold rounded-md bg-indigo-600 hover:text-indigo-400"
        >
          回到主页
        </router-link>
      </div>
    </div>
  </div>
</template>
