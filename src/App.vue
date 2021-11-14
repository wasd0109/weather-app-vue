<template>
  <v-app>
    <v-navigation-drawer v-model="showDrawer" absolue app></v-navigation-drawer>
    <v-app-bar dark flat app color="primary">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Weather</v-app-bar-title>
      <div class="ml-auto">
        <v-btn icon @click="getCurrentLocation">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main v-if="!loadingLocation">
      <HomePage :latitude="latitude" :longitude="longitude" />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from './pages/HomePage.vue';

export default {
  name: 'App',

  components: {
    HomePage,
  },

  data: () => ({
    showDrawer: false,
    latitude: null,
    longitude: null,
    loadingLocation: true,
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
        () => {
          this.latitude = 37.3229978;
          this.longitude = -122.0321823;
          this.loadingLocation = false;
        }
      );
    },
  },
  mounted() {
    this.getCurrentLocation();
  },
};
</script>
