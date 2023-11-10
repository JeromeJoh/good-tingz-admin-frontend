<script setup>
import { LockClosedIcon } from "@heroicons/vue/24/solid";
import GuestLayout from "../components/GuestLayout.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseSubmitButton from "../components/base/BaseSubmitButton.vue";

// TODO: submit functionality
</script>
<template>
  <GuestLayout title="检查账号">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <BaseInput label-txt="邮箱" category="email" />
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link
              :to="{ name: 'login' }"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              回想起来了？
            </router-link>
          </div>
        </div>

        <BaseSubmitButton />
      </form>
    </div>
  </GuestLayout>
</template>
