<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <img
                class="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2
                class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
              >
                Edit item
              </h2>

              <form class="mt-10 space-y-6" @submit.prevent="update">
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
                  v-model="price"
                    id="price"
                    name="price"
                    type="number"
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axiosApi from '@/axiosApi'
import { useRouter } from 'vue-router';

const router = useRouter()
const name = ref('')
const price = ref(Number)
const image_path = ref('')

const props = defineProps({
  show: Boolean,
  id: Number
})
const { show } = toRefs(props)
const open = ref(false)

watch(show, () => {
  open.value = !open.value
  console.log('ids', props.id);
  
})

const update = async () => {
  const { data } = await axiosApi.put(`/update-product/${props.id}`, {
    name: name.value,
    price: price.value,
    image_path: image_path.value
  })
  console.log('data', data);
  open.value = false
  router.push({ name: 'AllItems'})
}
</script>
