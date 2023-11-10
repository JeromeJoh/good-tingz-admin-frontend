<script setup lang="ts">
import store from "../store";
import router from "../router";

import GuestLayout from "../components/GuestLayout.vue";
import { BaseInput, BaseSubmitButton, ErrorTip } from "../components/base";

import { ref } from 'vue';

const user = {
  email: "",
  password: "",
  remember: false
};


let loading = ref<boolean>(false);
let errorMsg = ref<string>('');

function setEmailAddress(value: string) {
  user.email = value;
}

function setPassword(value: string) {
  user.password = value;
}

function login(): void {
  loading.value = true;
  store.dispatch('login', user)
    .then(() => {
      router.push({name: 'app.dashboard'});
    })
    .catch(({response}: {response: { data: { message: string }}}) => {
      errorMsg.value = response.data.message;
    })
    .finally(() => {
      loading.value = false;
    })
}
</script>
<template>
  <GuestLayout title="登录">
    <div class="mx-auto max-w-full w-2/3 sm:w-1/2 md:w-1/3">
      <form class="space-y-6" method="POST" @submit.prevent="login">
        <ErrorTip :error-msg="errorMsg"/>
        <BaseInput category="email" labelTxt="邮箱" @change="setEmailAddress"/>
        <BaseInput category="password" labelTxt="密码" @change="setPassword" />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="user.remember"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm">
              记住密码
            </label>
          </div>

          <div class="text-sm">
            <router-link
              :to="{ name: 'requestPassword' }"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              忘记密码？
            </router-link>
          </div>
        </div>

        <BaseSubmitButton button-txt="登录" :loading="loading" />
      </form>
    </div>
  </GuestLayout>
</template>
