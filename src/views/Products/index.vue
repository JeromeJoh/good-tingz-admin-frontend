<script setup>
import store from "@/store";
import { computed, ref } from "vue";

import ProductModal from "./ProductModal.vue";
import ProductsTable from "./ProductsTable.vue";
import { BaseCreateButton } from '@/components/base';

const DEFAULT_PRODUCT = {
  id: "",
  title: "",
  description: "",
  image: "",
  price: "",
};

const products = computed(() => store.state.products);

const productModel = ref({ ...DEFAULT_PRODUCT });
const showProductModal = ref(false);

function editProduct(p) {
  store.dispatch("getProduct", p.id).then(({ data }) => {
    productModel.value = data;
  });
}

function onModalClose() {
  productModel.value = { ...DEFAULT_PRODUCT };
}
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold px-2">Products</h1>
    <BaseCreateButton product/>
  </div>
  <ProductsTable @clickEdit="editProduct" />
  <ProductModal
    v-model="showProductModal"
    :product="productModel"
    @close="onModalClose"
  />
</template>
