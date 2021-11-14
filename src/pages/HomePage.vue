<template>
  <div class="d-flex flex-column">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="100"
      class="spinner mt-16"
      v-if="isLoading"
    ></v-progress-circular>
    <CurrentWeather v-else :currentWeather="currentWeather" />
  </div>
</template>

<script>
import CurrentWeather from '../components/CurrentWeather.vue';
import api from '../utils/api';
import { weatherCodeToEmoji } from '../utils/helpers';
export default {
  components: { CurrentWeather },
  methods: {
    async getCurrentWeather() {
      try {
        const res = await api.get(
          `/weather?units=metric&lat=${this.latitude}&lon=${this.longitude}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`
        );
        if (res.status === 200) {
          const weatherData = res.data;
          let currentWeather = {};
          currentWeather.cityname = weatherData.name;
          currentWeather.date = new Date(weatherData.dt * 1000).toDateString();
          currentWeather.temperture = weatherData.main.temp.toFixed(1);
          currentWeather.weatherEmoji = weatherCodeToEmoji(
            weatherData.weather[0].icon
          );
          this.currentWeather = currentWeather;
        }
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.getCurrentWeather();
  },
  data() {
    return {
      currentWeather: {
        cityname: '',
        date: '',
        weatherEmoji: '',
        temperture: '',
      },
      isLoading: true,
    };
  },
  props: ['latitude', 'longitude'],
};
</script>

<style>
.spinner {
  justify-self: center;
  align-self: center;
}
</style>
