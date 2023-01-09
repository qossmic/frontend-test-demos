import { reactive } from 'vue'

export const languageStatus = reactive({
  currentLanguage: "de-de",
  setCurrentLanguage(newStatus) {
    this.currentLanguage = newStatus;
  }
})