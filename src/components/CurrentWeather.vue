<template>
  <v-card
    color="primary"
    dark
    elevation="0"
    class="d-flex flex-column currentWeatherCard justify-center"
    tile
  >
    <v-container>
      <div>
        <h4 class="font-weight-medium text-h4" color="white">
          {{ currentWeather.cityname }}
        </h4>
        <h6 class="font-weight-light text-subtitle-1">
          {{ currentWeather.date }}
        </h6>
        <div class="d-flex justify-space-between mt-4">
          <p class="text-h2">{{ currentWeather.weatherEmoji }}</p>
          <h1 class="text-h2">{{ `${currentWeather.temperture}°` }}</h1>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ['currentWeather'],
};
</script>

<style>
.currentWeatherCard {
  min-height: 30vh;
}
</style>
