<script setup lang="ts">

const { category } = defineProps({
  category: String,
  labelTxt: String,
  placeholderTxt: String,
});
const emit = defineEmits(["change"]);

const inputValue = "";
const autoCompleteType = (function (type: string | undefined) {
  switch (type) {
    case "email":
      return "email";
    case "password":
      return "current-password";
    default:
      return "off";
  }
})(category);
</script>

<template>
  <div>
    <label for="email" class="block text-sm font-medium leading-6">{{
      labelTxt
    }}</label>
    <div class="mt-2">
      <input
        :id="category"
        :name="category"
        :type="category"
        :placeholder="placeholderTxt"
        :autocomplete="autoCompleteType"
        v-model="inputValue"
        @change="emit('change', inputValue)"
        required="true"
        class="block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-indigo-600 placeholder:text-gray-300 placeholder:font-thin placeholder:text-xs sm:text-sm sm:leading-6 outline-none"
      />
    </div>
  </div>
</template>
