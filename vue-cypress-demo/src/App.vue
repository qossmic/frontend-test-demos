<script setup>
import HomePage from './HomePage.vue'
import FormsPage from './FormsPage.vue'
import NotFoundPage from './NotFoundPage.vue'
import SpeciesPage from './SpeciesPage.vue'
import DefaultHeader from './components/DefaultHeader.vue'
import { ref, watch, computed } from 'vue';
import { loginStatus } from './store/loginStatus'
import { languageStatus } from './store/languageStatus'

const routes = {
  '/': <HomePage />,
  '/forms': <FormsPage />,
  '/species': <SpeciesPage />,
}
const pageTitles = {
  '/': "Home",
  '/forms': "Forms",
  '/species': "Species",
}

let isLoggedIn = ref(null);
let currentLanguage = ref(null);
let documentTitle = ref("");
const currentPath = ref(window.location.hash);
documentTitle.value = pageTitles[currentPath.value.slice(1) || '/'] || 'Some Default Title';
document.title = documentTitle.value;

watch(loginStatus, (status) => {
  isLoggedIn.value = status.isLoggedIn;
});

watch(languageStatus, (status) => {
  currentLanguage.value = status.currentLanguage;
});

watch(currentPath, () => {
  documentTitle.value = pageTitles[currentPath.value.slice(1) || '/'] || 'Some Default Title';
  document.title = documentTitle.value;
});

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFoundPage
})

</script>

<template>
  <div class="page">
    <DefaultHeader :title=documentTitle />

    <component :is="currentView" v-if="isLoggedIn" />
    <H1 v-else>Please log in</H1>
  </div>
</template>

<style>
.page {
  padding: 20px;
}
</style>
