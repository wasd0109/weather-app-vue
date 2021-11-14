<template>
  <v-app>
    <v-navigation-drawer v-model="showDrawer" absolue app>
      <div class="d-flex justify-center align-center flex-column">
        <h5 class="text-h6">{{ $t('language') }}</h5>
        <LangChanger />
      </div>
    </v-navigation-drawer>
    <v-app-bar dark flat app color="primary">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="app-bar-title">
        {{ $t('app-title') }}
      </v-app-bar-title>
      <div class="ml-auto">
        <v-btn icon @click="getCurrentLocation">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main v-if="!loadingLocation">
      <v-card v-if="showGPSWarning" color="white" class="d-flex">
        <v-icon class="ml-4">mdi-alert</v-icon>
        <v-card-subtitle>{{ $t('gps-warning') }}</v-card-subtitle>
      </v-card>
      <HomePage :latitude="latitude" :longitude="longitude" />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import HomePage from './pages/HomePage.vue';
import LangChanger from './components/LangChanger.vue';

export default {
  name: 'App',

  components: {
    HomePage,
    LangChanger,
  },

  data: () => ({
    showDrawer: false,
    latitude: null,
    longitude: null,
    loadingLocation: true,
    showGPSWarning: false,
  }),
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    async getCurrentLocation() {
      this.loadingLocation = true;
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.latitude = coords.latitude;
          this.longitude = coords.longitude;
          this.loadingLocation = false;
        },
        async () => {
          try {
            const res = await axios.get(
              `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.VUE_APP_ABSTRACT_API_KEY}`
            );
            console.log(res.data);
            this.latitude = res.data.latitude;
            this.longitude = res.data.longitude;
          } catch (err) {
            this.latitude = 37.3229978;
            this.longitude = -122.0321823;
          }
          this.loadingLocation = false;
          this.showGPSWarning = true;
        }
      );
    },
  },
  mounted() {
    this.getCurrentLocation();
  },
};
</script>

<style>
.app-bar-title div {
  min-width: 10vw;
}
</style>
