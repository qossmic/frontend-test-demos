<template>
    <a v-bind:href=props.url>{{ filmTitle }}</a>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['url'])
const filmTitle = ref('');

async function getData() {
    fetch(props.url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            filmTitle.value = data.title;
        });
}

getData()
</script>

<style>
a {
    margin-right: 5px
}
</style>