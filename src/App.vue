<template>
  <component v-if="layout" :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import EmptyLayout from "./components/layouts/EmptyLayout.vue";
import MainLayout from "./components/layouts/MainLayout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "Empty") {
    return EmptyLayout;
  }
  return MainLayout;
});
</script>

<style lang="scss">
@import "@/style.css";
@import "materialize-css/dist/css/materialize.min.css";
</style>
