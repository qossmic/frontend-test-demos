<template>
    <a v-bind:href=props.url>{{ personName }}</a>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['url'])
const personName = ref('');

async function getData() {
    fetch(props.url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            personName.value = data.name;
        });
}

getData()
</script>

<style>
a {
    margin-right: 5px
}
</style>