import axiosApi from '@/axiosApi'
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      data: {},
      token: localStorage.getItem('token') || null
    },
    id: Number
  }),
  actions: {
    async registerUser(user: { name: string; email: string; password: string }) {
      try {
        const response = await axiosApi.post('/register', user)
        if (response && response.data) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored:', response.data.token);
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
        if (response && response.data.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token stored:', response.data.token);
        } else {
          console.log('Invalid response:', response.data.token);
        }
      } catch (error) {
        console.log('Request failed:', error);
      }
    },
    async setUserId() {
      const response = await axiosApi.get('/user');
      this.id = response.data.id;
    }    
  },
  getters: {}
})
