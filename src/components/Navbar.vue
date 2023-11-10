<script setup>
import store from "../store";
import router from "../router";
import { computed } from "vue";

import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["toggle-sidebar"]);

const currentUser = computed(() => store.state.user.data);

function logout() {
  store.dispatch("logout").then(() => {
    router.push({ name: "login" });
  });
}
</script>

<template>
  <header
    class="flex justify-between items-center px-4 py-8 h-14 border-b-[.5px]"
  >
    <button
      @click="emit('toggle-sidebar')"
      class="flex items-center justify-center rounded transition-colors w-8 h-8 text-gray-700 hover:bg-black/10"
    >
      <Bars3Icon class="w-6" />
    </button>
    <Menu
      as="div"
      class="relative inline-block text-left px-4 border-l-[.5px] z-10"
    >
      <MenuButton class="flex items-center">
        <UserCircleIcon class="rounded-full w-8 mr-2" />
        <small class="text-base">{{ "Jerome Joh" || currentUser.name }}</small>
        <ChevronDownIcon class="h-4 w-4 ml-1 mt-[1px]" aria-hidden="true" />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-1 w-36 p-2 origin-top-right rounded-md bg-bgWhite shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-indigo-600 text-white' : '',
                'group flex w-full items-center rounded-md p-2 text-sm tracking-wide',
              ]"
            >
              <UserIcon
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              我的账号
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="logout"
              :class="[
                active ? 'bg-indigo-600 text-white' : '',
                'group flex w-full items-center rounded-md p-2 text-sm tracking-wide',
              ]"
            >
              <ArrowLeftOnRectangleIcon
                :active="active"
                class="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              退出登录
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>
