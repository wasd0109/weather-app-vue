<template>
  <div>
    <CurrentWeather
      :isLoading="currentLoading"
      :currentWeather="currentWeather"
    />
    <DailyForecast :isLoading="forecastLoading" :dailyWeather="dailyWeather" />
    <RainMap />
  </div>
</template>

<script>
import CurrentWeather from '../components/CurrentWeather.vue';
import DailyForecast from '../components/DailyForecast.vue';
import RainMap from '../components/RainMap.vue';
import api from '../utils/api';
import { weatherCodeToEmoji } from '../utils/helpers';
export default {
  components: { CurrentWeather, DailyForecast, RainMap },
  methods: {
    async getCurrentWeather() {
      this.currentLoading = true;
      const currentLocale = this.$i18n.locale;
      console.log(currentLocale);
      try {
        const res = await api.get(
          `/weather?units=metric&lat=${this.latitude}&lon=${this.longitude}&lang=${currentLocale}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`
        );
        if (res.status === 200) {
          const weatherData = res.data;
          console.log(res.data);
          let currentWeather = {};
          currentWeather.cityname = weatherData.name;
          currentWeather.date = new Date(weatherData.dt * 1000);
          currentWeather.temperture = weatherData.main.temp.toFixed(1);
          currentWeather.weatherEmoji = weatherCodeToEmoji(
            weatherData.weather[0].icon
          );
          this.currentWeather = currentWeather;
        }
      } catch (err) {
        console.log(err);
      }
      this.currentLoading = false;
    },
    async getWeatherForecast() {
      this.forecastLoading = true;
      const currentLocale = this.$i18n.locale;
      const res = await api.get(
        `/onecall?exclude=current&units=metric&lat=${this.latitude}&lon=${this.longitude}&lang=${currentLocale}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`
      );
      if (res.status === 200) {
        const dailyWeatherData = res.data.daily;
        this.dailyWeather = dailyWeatherData;
      }
      this.forecastLoading = false;
    },
    async getWeather() {
      await this.getCurrentWeather();
      await this.getWeatherForecast();
    },
  },
  mounted() {
    this.getWeather();
  },
  data() {
    return {
      currentWeather: {
        cityname: '',
        date: '',
        weatherEmoji: '',
        temperture: '',
      },
      dailyWeather: [],
      currentLoading: true,
      forecastLoading: true,
    };
  },
  props: ['latitude', 'longitude'],
};
</script>

<style></style>
