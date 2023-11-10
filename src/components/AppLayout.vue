<script setup lang="ts">

import store from "../store";
import { ref, computed, onMounted, onUnmounted } from 'vue';

import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Spinner from "./core/Spinner.vue";
import Toast from "./core/Toast.vue";

const sidebarOpened = ref<boolean>(true);
const currentUser = computed(() => store.state.user.data);

const toggleSidebar = () => sidebarOpened.value = !sidebarOpened.value;
const updateSidebarState = () => sidebarOpened.value = window.innerWidth > 768;

onMounted(() => {
  store.dispatch('getCurrentUser');
  store.dispatch('getCountries');
  updateSidebarState();
  window.addEventListener('resize', updateSidebarState);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState);
});

</script>

<template>
  <div v-if="currentUser.id" class="w-full min-h-full bg-bgWhite flex font-roboto">

    <Sidebar :class="{ '-ml-[180px]': !sidebarOpened }" />
    
    <div class="flex-1">
      <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
      <main class="px-6 py-8">
        <router-view></router-view>
      </main>
    </div>

  </div>

  <div v-else class="w-full min-h-full grid place-items-center bg-bgWhite">
    <Spinner text="加载中，请稍等" />
  </div>
  <Toast />
</template>