<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <html class="h-screen bg-gray-300">
    <body class="h-full">
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          class="mx-auto max-w-[400px] w-[100%] rounded-md bg-white p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-sm"
        >
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>

          <form class="mt-10 space-y-6" @submit.prevent="register">
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
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Email address"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <div class="mt-2">
                <input
                  v-model="password"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Already a member? {{ ' ' }}
            <RouterLink
              to="/login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </RouterLink>
          </p>
        </div>
      </div>
    </body>
  </html>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useAppStore()

const name = ref('')
const email = ref('')
const password = ref('')

const register = () => {
  const userPayload = {
    name: name.value,
    email: email.value,
    password: password.value
  }
  
  store.registerUser(userPayload).then(() => {
    router.push({ name: 'Dashboard' })
  })
}
</script>
