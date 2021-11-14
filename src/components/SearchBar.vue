<template>
  <v-form @submit.prevent="submitSearch">
    <v-text-field
      v-model="searchBarText"
      solo
      @click.stop
      class="mt-4"
      full-width
      light
      label="Search City"
      prepend-inner-icon="mdi-magnify"
      @input="getAutocomplete"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  data() {
    return { searchBarText: '' };
  },
  emit: ['input-change', 'confirm-submit'],
  methods: {
    submitSearch() {
      this.$emit('confirm-search', this.searchBarText);
    },
    getAutocomplete() {
      this.$emit('input-change', this.searchBarText);
    },
  },
};
</script>

<style></style>
