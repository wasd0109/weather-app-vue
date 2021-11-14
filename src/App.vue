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
        <v-btn icon @click="toggleSearchOverlay">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main v-if="!loadingLocation">
      <div>
        <SearchBarOverlay
          :showSearchOverlay="showSearchOverlay"
          @close-overlay="closeSearchOverlay"
          @submit-search="setLocation"
        />
      </div>
      <v-card v-if="showGPSWarning" color="white" class="d-flex">
        <v-icon class="ml-4">mdi-alert</v-icon>
        <v-card-subtitle>{{ $t('gps-warning') }}</v-card-subtitle>
      </v-card>
      <HomePage :location="location" />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import HomePage from './pages/HomePage.vue';
import LangChanger from './components/LangChanger.vue';
import SearchBarOverlay from './pages/SearchBarOverlay.vue';

export default {
  name: 'App',

  components: {
    HomePage,
    LangChanger,
    SearchBarOverlay,
  },

  data: () => ({
    showDrawer: false,
    location: {},
    loadingLocation: true,
    showGPSWarning: false,
    showSearchOverlay: false,
  }),
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    toggleSearchOverlay() {
      this.showSearchOverlay = !this.showSearchOverlay;
    },
    closeSearchOverlay() {
      this.showSearchOverlay = false;
    },
    async getCurrentLocation() {
      this.loadingLocation = true;
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
          this.loadingLocation = false;
        },
        async () => {
          try {
            const res = await axios.get(
              `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.VUE_APP_ABSTRACT_API_KEY}`
            );
            console.log(res.data);
            this.location = {
              latitude: res.data.latitude,
              longitude: res.data.longitude,
            };
          } catch (err) {
            // Fallback to Cupertino
            this.location = {
              latitude: 37.3229978,
              longitude: -122.0321823,
            };
          }
          this.loadingLocation = false;
          this.showGPSWarning = true;
        }
      );
    },
    setLocation(location) {
      this.location = location;
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
.search-content {
  width: 80vw;
}
</style>
