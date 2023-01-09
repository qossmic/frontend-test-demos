<template>
    <div data-testid="languageswitcher" class="languageswitcher-container">
        <button data-testid="languageswitcher-de-de" :class="{ active: currentLanguage === 'de-de' }"
            class="language-button" @click="setLanguage('de-de')">DE</button>
        <button data-testid="languageswitcher-en-en" :class="{ active: currentLanguage === 'en-en' }"
            class="language-button" @click="setLanguage('en-en')">EN</button>
        <button data-testid="languageswitcher-fr-fr" :class="{ active: currentLanguage === 'fr-be' }"
            class="language-button" @click="setLanguage('fr-be')">FR</button>
    </div>
</template>

<script setup>
import { languageStatus } from '@/store/languageStatus';
import { ref, watch } from 'vue';


const currentLanguage = ref([]);
currentLanguage.value = languageStatus.currentLanguage;

function setLanguage(newLang) {
    languageStatus.setCurrentLanguage(newLang)
}

watch(languageStatus, (status) => {
    currentLanguage.value = status.currentLanguage;
});

</script>

<style>
.active {
    font-weight: bold;
}

.language-button {
    border: none;
    background-color: transparent;
}
</style>