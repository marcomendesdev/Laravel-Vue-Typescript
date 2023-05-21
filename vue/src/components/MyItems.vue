<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">My items</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative rounded-lg shadow-2xl"
        >
          <div
            class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg lg:aspect-none group-hover:opacity-75 lg:h-60"
          >
            <img
              :src="product.image_path"
              alt="any"
              class="lg:h-50 h-full w-full object-cover object-center lg:w-full"
            />
          </div>
          <div class="flex flex-row">
            <button
              @click.prevent="clicks(product.id)"
              class="m-2 w-full rounded-sm bg-blue-600 p-2 text-white sm:w-1/2"
            >
              Edit
            </button>
            <button class="m-2 w-full rounded-sm bg-red-600 p-2 text-white sm:w-1/2">Delete</button>
          </div>
          <div class="mt-4 flex justify-between px-2 py-2">
            <div>
              <h3 class="text-sm text-gray-700">
                {{ product.name }}
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <OverLay :show="show" />
</template>

<script setup lang="ts">
import axiosApi from '@/axiosApi'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore'
import OverLay from '@/components/OverLay.vue'

interface Product {
  id: number
  name: string
  image_path: string // Add the 'image_path' property with the correct type
  price: number
}

const show = ref(false)
const id = ref(0)

const clicks = (ids: number) => {
  show.value = !show.value
  id.value = ids
  console.log('id', ids)
}

const products = ref<Product[]>([])
const appStore = useAppStore()

onMounted(async () => {
  const { data } = await axiosApi.get(`/user-products/${appStore.id}`)
  products.value = data
  console.log('data', data)
})
</script>
