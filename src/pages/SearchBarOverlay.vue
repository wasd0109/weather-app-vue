<template>
  <v-overlay
    :value="showSearchOverlay"
    @click="closeOverlay"
    class="d-flex align-start"
  >
    <div class="search-content">
      <SearchBar
        @input-change="getAutocomplete"
        @confirm-search="getSearchLocation"
        :search-error="searchError"
      />
      <v-list v-if="autocompletePredictions.length" light>
        <v-list-item
          v-for="item in autocompletePredictions"
          :key="item.place_id"
          light
          @click="setSelectedLocation(item)"
        >
          <p class="m-0 text-truncate">{{ item.description }}</p>
        </v-list-item>
      </v-list>
    </div>
  </v-overlay>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import axios from 'axios';

export default {
  components: { SearchBar },
  props: ['showSearchOverlay'],
  emit: ['close-overlay', 'submit-search'],
  methods: {
    closeOverlay() {
      this.$emit('close-overlay');
    },
    async getAutocomplete(searchBarText) {
      this.searchError = { isError: false, message: '' };
      const res = await axios.get(
        `https://morning-shelf-47429.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchBarText}&types=(regions)&key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`
      );
      this.autocompletePredictions = res.data.predictions;
    },
    async getSearchLocation() {
      if (!this.autocompletePredictions.length) {
        return (this.searchError = {
          isError: true,
          message: 'Please eneter a valid location',
        });
      }
      if (!this.selectedLocation) {
        this.selectedLocation = this.autocompletePredictions[0].place_id;
      }

      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${this.selectedLocation}&key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&language=${this.$i18n.locale}`
      );

      const bestResult = res.data.results[0];
      console.log(bestResult);
      const searchedLocation = {
        latitude: bestResult.geometry.location.lat,
        longitude: bestResult.geometry.location.lng,
      };
      this.$emit('submit-search', searchedLocation);
      this.closeOverlay();
    },
    setSelectedLocation(prediction) {
      this.selectedLocation = prediction.place_id;
    },
  },
  data() {
    return {
      autocompletePredictions: [],
      selectedLocation: null,
      searchError: { isError: false, message: '' },
    };
  },
  watch: {
    selectedLocation() {
      this.getSearchLocation();
    },
  },
};
</script>

<style></style>
