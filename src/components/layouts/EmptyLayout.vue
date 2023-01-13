<template>
  <div class="grey darken-1 empty-layout">
    <router-view> </router-view>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useErrorStore } from "@/stores/errorStore";
import messagesList from "@/composables/messagesList";
import message from "@/composables/message";
const errorStore = useErrorStore();

const errorWatcher = computed(() => {
  return errorStore.error;
});
watch(errorWatcher, () => {
  message(messagesList[errorWatcher.value.code] || "Что-то пошло не так");
});
</script>

<style lang="scss"></style>
