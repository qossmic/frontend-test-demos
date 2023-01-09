<template>
  <h1>Species</h1>
  <div class="legend">
    <span class="sample"></span>
    <span class="label">Entry older than 7 days</span>
  </div>
  <table data-testid="species">
    <thead>
      <tr>
        <th>Name</th>
        <th>Classification /<br />Designation</th>
        <th>Average height</th>
        <th>Skin / hair / eye colors</th>
        <th>Average lifespan</th>
        <th>Homeworld</th>
        <th>Language</th>
        <th>People</th>
        <th>Films</th>
        <!-- <th>Created / edited</th> -->
      </tr>

    </thead>
    <tr v-for="item in listItems" v-bind:key="item.name" :data-testid="getIsStale(item.edited) ? 'staleListItem listItem' : 'listItem'" :class="{ stale: getIsStale(item.edited) }">
      <td><a href="{{ item.url }}">{{ item.name }}</a></td>
      <td>{{ item.classification }} <br /> {{ item.designation }}</td>
      <td>{{ item.average_height }}</td>
      <td>
        Skin: {{ item.skin_colors }} <br />
        Hair: {{ item.hair_colors }} <br />
        Eyes: {{ item.eye_colors }}
      </td>
      <td>{{ item.average_lifespan }}</td>
      <td>
        <HomeworldLink :url=item.homeworld />
      </td>
      <td>{{ item.language }}</td>
      <td>
        <div v-for="person in item.people" v-bind:key="person">
          <PersonLink :url="person" />
        </div>
      </td>
      <td>
        <div v-for="film in item.films" v-bind:key="film">
          <FilmLink :url="film" />
        </div>
      </td>
      <!-- <td>{{ item.created }} <br /> {{ item.edited }}</td> -->
    </tr>
  </table>
</template>

<script setup>
import { ref } from 'vue';
import moment from "moment";
import PersonLink from "./components/PersonLink.vue"
import FilmLink from "./components/FilmLink.vue"
import HomeworldLink from "./components/HomeworldLink.vue"

const listItems = ref([]);
const resultData = ref([]);

// to provoke 404
// const dataSource = "http://localhost:8080";
//get actual data
const dataSource = "https://swapi.dev/api";

function getIsStale(dateTime) {
  // calculates whether entry was edited less than seven days ago
  // TODO: find way of only calling this once per item 
  const threshold = moment().subtract(7,'d').format('YYYY-MM-DD');
  return moment(dateTime).isBefore(threshold);
}

async function getData() {
  fetch(dataSource + "/species")
    .then(response => {
      return response.json();
    })
    .then(data => {
      listItems.value = data.results;
      resultData.value = data;
    });
}

getData()
</script>

<style>

.legend {
  margin-bottom: 20px;
}
.sample {
  display: inline-block;
  width: 20px;
  height: 1em;
  margin-right: 10px;
  background-color: lightgray;
}
table,
th,
td {
  border: 1px solid;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 2px;
}

td {
  vertical-align: top;
  padding: 2px;
}

.stale {
  background-color: lightgray;
}
</style>