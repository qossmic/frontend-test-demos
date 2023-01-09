<template>
    <div class="header-container">
        <h2>Vue Demo - {{ props.title }}</h2>
        <div data-testid="navigation">
            <a href="#/">Home</a> |
            <a href="#/forms">Forms</a> |
            <a href="#/species">Species</a> |
            <a href="#/non-existent-path">Broken Link</a>
        </div>
        <LanguageSwitcher />
        <LoginLogout />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

import LanguageSwitcher from './LanguageSwitcher.vue';
import LoginLogout from './LoginLogout.vue';

const props = defineProps(['title'])
</script>

<style>
.header-container {
    width: 100%;
    border-bottom: 2px solid lightgrey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
}
</style>