<template>
  <div>
    <v-card tile elevation="0">
      <v-container class="d-flex flex-column justify-center align-center">
        <p
          class="
            font-weight-medium
            text-subtilte-1
            grey--text
            text--darken-2
            mb-0
          "
        >
          {{ dayOfWeek }}
        </p>
        <p class="font-weight-medium text-subtilte-1 grey--text text--darken-1">
          {{ date }}
        </p>
        <h2>{{ weatherEmoji }}</h2>

        <div class="d-flex mt-4">
          <h6 class="font-weight-medium text-subtitle-2 mr-1">
            {{ forecast.temp.max.toFixed(1) }}
          </h6>
          <h6 class="font-weight-medium text-subtitle-2 ml-1">
            {{ forecast.temp.min.toFixed(1) }}
          </h6>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { timestampToDayOfWeek } from '../utils/helpers';
import { weatherCodeToEmoji } from '../utils/helpers';
export default {
  props: ['forecast'],
  computed: {
    dayOfWeek() {
      const convertedDay = timestampToDayOfWeek(this.forecast.dt).substring(
        0,
        3
      );
      return this.$t(convertedDay).toUpperCase();
    },
    weatherEmoji() {
      return weatherCodeToEmoji(this.forecast.weather[0].icon);
    },
    date() {
      const date = new Date(this.forecast.dt * 1000);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}/${day}`;
    },
  },
};
</script>

<style></style>
