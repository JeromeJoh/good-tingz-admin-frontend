<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import Spinner from "../../components/core/Spinner.vue";
import {CUSTOMERS_PER_PAGE} from "../../constants";
import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {EllipsisVerticalIcon, PencilIcon, TrashIcon, Cog6ToothIcon} from '@heroicons/vue/24/outline';
import SearchBar from "@/components/base/SearchBar.vue";
import EmptyTip from "@/components/base/EmptyTip.vue";

const perPage = ref(CUSTOMERS_PER_PAGE);
const searchItem = ref('');
const customers = computed(() => store.state.customers);
const sortField = ref('updated_at');
const sortDirection = ref('desc');

const customer = ref({});
const showCustomerModal = ref(false);

const emit = defineEmits(['clickEdit']);

onMounted(() => {
  getCustomers();
})

function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  getCustomers(link.url)
}

function getCustomers(url = null) {
  store.dispatch("getCustomers", {
    url,
    search: searchItem.value,
    per_page: perPage.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}

function sortCustomers(field) {
  if (field === sortField.value) {
    if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = 'desc'
    }
  } else {
    sortField.value = field;
    sortDirection.value = 'asc'
  }

  getCustomers();
}

function showAddNewModal() {
  showCustomerModal.value = true
}

function deleteCustomer(customer) {
  if (!confirm(`你确定要删除这条顾客信息？`)) {
    return
  }
  store.dispatch('deleteCustomer', customer)
    .then(res => {
      store.commit('showToast', '顾客信息已成功删除');
      store.dispatch('getCustomers')
    })
}

function search(keyword) {
  searchItem.value = keyword;
  getCustomers(null);
}

</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
    <div class="flex justify-between pb-4 tracking-wider border-b-[.5px]">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">每页</span>
        <select @change="getCustomers(null)" v-model="perPage"
                class="appearance-none relative w-16 text-center inline-flex items-center justify-center bg-gray-100 font-bold border-b rounded-lg shadow-sm border-gray-300 py-1 border text-sm placeholder-gray-500 focus:outline-none focus:z-10 sm:text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span class="ml-3">项，共 <em class="font-bold">{{ customers.total }}</em> 名顾客</span>
      </div>
      <SearchBar @change="search" />
    </div>

    <table class="table-auto w-full mt-3 mb-6">
      <thead>
      <tr>
        <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('id')">
          ID
        </TableHeaderCell>
        <TableHeaderCell field="name" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('name')">
          姓名
        </TableHeaderCell>
        <TableHeaderCell field="email" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('email')">
          邮箱
        </TableHeaderCell>
        <TableHeaderCell field="phone" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('phone')">
          电话
        </TableHeaderCell>
        <TableHeaderCell field="status" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('status')">
          状态
        </TableHeaderCell>
        <TableHeaderCell field="created_at" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortCustomers('created_at')">
          注册日期
        </TableHeaderCell>
        <TableHeaderCell field="actions">
          操作
        </TableHeaderCell>
      </tr>
      </thead>
      <tbody v-if="customers.loading || !customers.data.length">
      <tr>
        <td colspan="7">
          <Spinner v-if="customers.loading"/>
          <EmptyTip v-else text="目前还没有任何顾客" layout="center" />
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr v-for="(customer, index) of customers.data">
        <td class="border-b p-2 ">{{ customer.id }}</td>
        <td class="border-b p-2 ">
         {{ customer.first_name }} {{ customer.last_name }}
        </td>
        <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
          {{ customer.email }}
        </td>
        <td class="border-b p-2">
          {{ customer.phone }}
        </td>
        <td class="border-b p-2">
          {{ customer.status }}
        </td>
        <td class="border-b p-2">
          {{ customer.created_at }}
        </td>
        <td class="border-b p-2 ">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-500 text-sm hover:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <Cog6ToothIcon
                  class="h-5 w-5 text-indigo-600"
                  aria-hidden="true"/>
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
                class="absolute z-10 right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="p-2">
                  <MenuItem v-slot="{ active }">
                    <router-link
                      :to="{name: 'app.customers.view', params: {id: customer.id}}"
                      :class="[
                        active ? 'bg-gray-100' : 'bg-white',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm tracking-wider hover:text-black',
                      ]"
                    >
                      <PencilIcon
                        class="mr-2 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      编辑
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-100' : 'bg-white',
                        'flex w-full items-center rounded-md px-2 py-2 text-sm tracking-wider',
                      ]"
                      @click="deleteCustomer(customer)"
                    >
                      <TrashIcon
                        class="mr-2 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      删除
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="!customers.loading" class="flex justify-between items-center mt-5 select-none">
      <div v-if="customers.data.length" class="tracking-wide">
        正在展示：第 <em class="font-bold">{{ customers.from }} - {{ customers.to }}</em> 项
      </div>
      <nav
        v-if="!(customers.total > customers.limit)"
        class="relative z-0 inline-flex justify-center rounded shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a
          v-for="(link, i) of customers.links"
          :key="i"
          :disabled="!link.url"
          href="#"
          @click="getForPage($event, link)"
          aria-current="page"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          :class="[
              i === 0 ? 'rounded-l-md' : '',
              i === customers.links.length - 1 ? 'rounded-r-md' : '',
              !link.url ? ' bg-gray-100 text-gray-700': ''
            ]"
          v-html="link.label"
        >
        </a>
      </nav>
    </div>
  </div>
</template>