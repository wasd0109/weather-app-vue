<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        class="text-left"
        :value="lang"
      >
        {{ $t(lang) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return { langs: ['ja', 'en'] };
  },
};
</script>
