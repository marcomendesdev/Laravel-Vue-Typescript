<template>
  
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">All items</h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group relative">
          <div
            class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 shadow-lg lg:aspect-none group-hover:opacity-75 lg:h-80"
          >
            <img
              :src="product.image_path"
              alt="any"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.name }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script setup lang="ts">
import axiosApi from '@/axiosApi'
import { ref, onMounted } from 'vue'

const products = ref<Product[]>([])

interface Product {
  id: number
  name: string
  image_path: string
  price: number
  color: string
}

onMounted(async () => {
  const { data } = await axiosApi.get<Product[]>('/all-products')
  products.value = data
  console.log('data', data)
})
</script>
