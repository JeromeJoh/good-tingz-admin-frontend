<script setup lang="ts">
import { computed, defineProps, PropType, ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

// For Editor
const editor = ClassicEditor;
function onChange(value) {
  emit("update:modelValue", value);
  emit("change", value);
}

// For Selector
const currentSelector = ref<string>("全部时间");
const updateSelector = (target: HTMLElement) => {
  currentSelector.value = target.innerText;
  const value = (target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("change", value);
};

export interface IDateOption {
  key: string;
  text: string;
}

const props = defineProps({
  modelValue: [String, Number, File],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  name: String,
  required: Boolean,
  prepend: {
    type: String,
    default: "",
  },
  append: {
    type: String,
    default: "",
  },
  selectOptions: Array as PropType<IDateOption[]>,
  errors: {
    type: Array,
    required: false,
  },
  editorConfig: {
    type: Object,
    default: () => ({}),
  },
});

const id = computed(() => {
  // if (props.id) return props.id;

  return `id-${Math.floor(1000000 + Math.random() * 1000000)}`;
});

const inputClasses = computed(() => {
  const cls = [
    `block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`,
  ];

  if (props.append && !props.prepend) {
    cls.push(`rounded-l-md`);
  } else if (props.prepend && !props.append) {
    cls.push(`rounded-r-md`);
  } else if (!props.prepend && !props.append) {
    cls.push("rounded-md");
  }
  if (props.errors && props.errors[0]) {
    cls.push("border-red-600 focus:border-red-600");
  }
  return cls.join(" ");
});

const emit = defineEmits(["update:modelValue", "change"]);
</script>

<template>
  <div>
    <label class="sr-only">{{ label }}</label>
    <div class="mt-1 flex rounded-md">
      <span
        v-if="prepend"
        class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      >
        {{ prepend }}
      </span>

      <template v-if="type === 'select'">
        <div class="text-right">
          <Menu as="div" class="relative inline-block">
            <div class="hover:text-indigo-600">
              <MenuButton
                class="inline-flex w-full justify-center px-4 py-2 text-sm font-medium"
              >
                {{ currentSelector }}
                <ChevronDownIcon
                  class="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="w-36 absolute right-0 mt-2 origin-top-right rounded-md bg-bgWhite p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  v-for="option in selectOptions"
                  :value="option.key"
                  @click="updateSelector($event.target)"
                  v-slot="{ active }"
                >
                  <button
                    :class="[
                      active ? 'bg-indigo-600 text-white' : 'text-black',
                      'group flex w-full items-center rounded-md p-2 text-sm tracking-wide',
                    ]"
                  >
                    {{ option.text }}
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </template>

      <template v-else-if="type === 'textarea'">
        <textarea
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="
            emit('update:modelValue', ($event.target as HTMLInputElement).value)
          "
          :class="inputClasses"
          :placeholder="label"
        ></textarea>
      </template>

      <!-- <template v-else-if="type === 'richtext'">
        <ckeditor
          :editor="editor"
          :required="required"
          :model-value="props.modelValue"
          @input="onChange"
          :class="inputClasses"
          :config="editorConfig"
        ></ckeditor>
      </template> -->

      <template v-else-if="type === 'file'">
        <input
          :type="type"
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="emit('change', ($event.target as HTMLInputElement).files[0])"
          :class="inputClasses"
          :placeholder="label"
        />
      </template>

      <template v-else-if="type === 'checkbox'">
        <div class="flex items-center px-1">
          <input
            :id="id"
            :name="name"
            :type="type"
            :checked="!!props.modelValue"
            :required="required"
            @change="
              emit(
                'update:modelValue',
                ($event.target as HTMLInputElement).checked
              )
            "
            class="h-5 w-5 border-gray-300"
          />
          <label :for="id" class="ml-2 block text-base text-gray-500 tracking-wide mr-2">
            {{ label }}
          </label>
        </div>
      </template>

      <template v-else>
        <input
          :type="type"
          :name="name"
          :required="required"
          :value="props.modelValue"
          @input="
            emit('update:modelValue', ($event.target as HTMLInputElement).value)
          "
          :class="inputClasses"
          :placeholder="label"
          step="1"
        />
      </template>

      <span
        v-if="append"
        class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
      >
        {{ append }}
      </span>
    </div>
    <small v-if="errors && errors[0]" class="text-red-600">{{
      errors[0]
    }}</small>
  </div>
</template>

<style scoped>
:deep(.ck-editor) {
  width: 100%;
}

:deep(.ck-content) {
  min-height: 300px;
}
</style>
