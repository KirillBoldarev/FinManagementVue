<template>
  <ul class="sidenav app-sidenav" :class="{ open: props.open }">
    <li v-for="link in links" :key="link.title">
      <router-link :to="link.path" class="waves-effect waves-orange pointer"
        >{{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
  },
});

const links = ref([
  { title: "Счет", path: "/" },
  {
    title: "История",
    path: "/history",
  },
  {
    title: "Планирование",
    path: "/planning",
  },

  {
    title: "Новая запись",
    path: "/record",
  },

  {
    title: "Статьи ДДС",
    path: "/cashflow",
  },
]);
</script>
