import { reactive } from 'vue'

export const loginStatus = reactive({
  isLoggedIn: false,
  setIsLoggedIn(newStatus) {
    this.isLoggedIn = newStatus;
  }
})