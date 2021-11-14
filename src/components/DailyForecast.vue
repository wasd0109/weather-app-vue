<template>
  <v-container fluid>
    <v-list
      class="
        d-flex
        overflow-x-auto
        justify-md-center
        align-center
        forecast-list
      "
      elevation="4"
    >
      <div v-if="isLoading" class="spinner">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
        ></v-progress-circular>
      </div>
      <BaseForecastCard
        v-for="forecast in dailyWeather"
        class="card"
        :key="forecast.dt"
        :forecast="forecast"
        v-else
      ></BaseForecastCard>
    </v-list>
  </v-container>
</template>

<script>
import BaseForecastCard from './BaseForecastCard.vue';
export default {
  components: { BaseForecastCard },
  props: ['dailyWeather', 'isLoading'],
};
</script>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.forecast-list {
  min-height: 25vh;
}
.card {
  border-left: 0.5px solid rgba(0, 0, 0, 0.12);
}
.card:first-of-type {
  border-left: 0px;
}
</style>
