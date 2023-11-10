<script setup>

import store from "../../store";
import {computed, onMounted, ref} from "vue";

import UserModal from "./UserModal.vue";
import UsersTable from "./UsersTable.vue";
import { BaseCreateButton } from "@/components/base";

const DEFAULT_USER = {
  id: '',
  title: '',
  description: '',
  image: '',
  price: ''
};

const users = computed(() => store.state.users);

const userModel = ref({...DEFAULT_USER});
const showUserModal = ref(false);

function showAddNewModal() {
  showUserModal.value = true
}

function editUser(u) {
    userModel.value = u;
    showAddNewModal();
}

function onModalClose() {
  userModel.value = {...DEFAULT_USER}
}

</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold px-2">Users</h1>
    <BaseCreateButton user @click="showAddNewModal()" />
  </div>
  <UsersTable @clickEdit="editUser"/>
  <UserModal v-model="showUserModal" :user="userModel" @close="onModalClose"/>
</template>