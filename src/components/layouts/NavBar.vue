<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="emit('clickOnNavbar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ filterDate(date, "datetime") }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownRef"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click.prevent="logout" href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import filterDate from "@/composables/filterDate";
import { useAuthStore } from "@/stores/authStore";
import { useInfoStore } from "@/stores/infoStore";

const authStore = useAuthStore();
const infoStore = useInfoStore();

const emit = defineEmits(["clickOnNavbar"]);
const router = useRouter();
const dropdownRef = ref(null);
const dropdown = ref(null);
const date = ref(new Date());
const dateInterval = ref(null);

const userName = computed(() => {
  if (infoStore.info === undefined) {
    return "Пройдите процедуру авторизации";
  }
  return infoStore.info.name;
});

onMounted(() => {
  dateInterval.value = setInterval(() => {
    date.value = new Date();
  }, 1000);

  // eslint-disable-next-line no-undef
  dropdown.value = M.Dropdown.init(dropdownRef.value, {
    constrainWidth: true,
  });
});

onBeforeUnmount(() => {
  clearInterval(dateInterval.value);

  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy();
  }
});

function logout() {
  authStore.logout().then(router.push("/login?message=logout"));
}
</script>
