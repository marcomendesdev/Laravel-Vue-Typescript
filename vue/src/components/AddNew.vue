<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <html class="h-full">
    <body class="h-full">
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          class="mx-auto max-w-[400px] rounded-md bg-white p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-sm"
        >
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add item
          </h2>

          <form class="mt-10 space-y-6" @submit.prevent="addItem">
            <div class="mt-2">
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                placeholder="Full name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="mt-2">
              <input
                v-model="description"
                id="description"
                name="description"
                type="text"
                autocomplete="description"
                placeholder="Description"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="mt-2">
              <input
                v-model="price"
                id="price"
                name="price"
                type="text"
                autocomplete="price"
                placeholder="Price"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="mt-2">
              <input
                v-model="image_path"
                id="image"
                name="image"
                type="url"
                autocomplete="image"
                placeholder="Image"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup lang="ts">
import axiosApi from '@/axiosApi'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user_id = ref(0)
const name = ref('')
const price = ref('')
const image_path = ref('')
const description = ref('')

const addItem = async () => {
  const { data } = await axiosApi.post(`/add-product/${user_id.value}`, {
    name: name.value,
    price: price.value,
    image_path: image_path.value,
    description: description.value,
    user_id: user_id.value
  })
  console.log('data', data)
  router.push('/my-items')
}

// get user id
onMounted(async () => {
  const {data} = await axiosApi.get('/user')
  user_id.value = data.id
  console.log('user_id', user_id.value)
})
 

</script>
