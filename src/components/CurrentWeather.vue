<template>
  <v-card
    color="primary"
    dark
    elevation="0"
    class="d-flex flex-column current-weather-card justify-center"
    tile
  >
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      size="50"
      class="align-self-center"
    ></v-progress-circular>
    <v-container v-else>
      <div>
        <h4 class="font-weight-medium text-h4" color="white">
          {{ currentWeather.cityname }}
        </h4>
        <h6 class="font-weight-light text-subtitle-1">
          {{ $d(currentWeather.date, 'short') }}
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
  props: ['currentWeather', 'isLoading'],
  // computed:{date(){
  //   return
  // }}
};
</script>

<style>
.current-weather-card {
  min-height: 30vh;
}
.spinner {
  justify-self: center;
  align-self: center;
}
</style>
