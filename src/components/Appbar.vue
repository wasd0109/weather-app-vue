<template>
  <v-app-bar dark flat app color="primary">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-app-bar-title class="app-bar-title">
      {{ $t('app-title') }}
    </v-app-bar-title>
    <div class="ml-auto">
      <v-btn icon @click="$emit('get-location')">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('toggle-search')">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {},
  emits: ['toggle-drawer', 'get-location', 'toggle-search'],
};
</script>

<style></style>
