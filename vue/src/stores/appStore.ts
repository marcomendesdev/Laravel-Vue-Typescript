import axiosApi from '@/axiosApi'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      data: {},
      token: localStorage.getItem('token') || null
    }
  }),
  actions: {
    async registerUser(user: { name: string; email: string; password: string }) {
      try {
        const response = await axiosApi.post('/register', user)
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token stored:', response.token);
        } else {
          console.log('Token not found in the response')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logoutUser() {
      try {
        const response = await axiosApi.post('/logout')
        console.log('ResLogout:', response)
        localStorage.removeItem('token')
        this.user.token = null
      } catch (error) {
        console.log(error)
      }
    },
    async loginUser(user: { email: string; password: string }) {
      try {
        const response = await axiosApi.post('/login', user);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token stored:', response.token);
        } else {
          console.log('Invalid response:', response);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    }    
  },
  getters: {}
})
