<template>
  <div class="app-main-layout">
    <nav-bar @click-on-navbar="navbarIsOpen = !navbarIsOpen"></nav-bar>
    <side-bar :open="navbarIsOpen"></side-bar>

    <main class="app-content" :class="{ full: !navbarIsOpen }">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";
import { ref } from "vue";
const navbarIsOpen = ref(true);
</script>

<style lang="scss"></style>
