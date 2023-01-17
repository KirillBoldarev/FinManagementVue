import LoaderVue from './components/tools/LoaderVue.vue';

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
import { monitorAuth } from "@/firebase/auth";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "Empty") {
    return EmptyLayout;
  }
  return MainLayout;
});

monitorAuth();
</script>

<style lang="scss">
@import "@/style.css";
@import "materialize-css/dist/css/materialize.min.css";
</style>
