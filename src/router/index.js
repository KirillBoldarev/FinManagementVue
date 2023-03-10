import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useInfoStore } from "@/stores/infoStore";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "Main" },
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "Empty" },
    component: () => import("@/components/forms/LoginForm.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    meta: { layout: "Empty" },
    component: () => import("@/components/forms/RegistrationForm.vue"),
  },
  {
    path: "/cashflow",
    name: "cashflow",
    meta: { layout: "Main" },
    component: () => import("@/views/CashflowPage.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "Main" },
    component: () => import("@/views/HistoryPage.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "Main" },
    component: () => import("@/views/PlanningPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "Main" },
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "Main" },
    component: () => import("@/views/RecordPage.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    meta: { layout: "Main" },
    component: () => import("@/views/DetailPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const infoStore = useInfoStore();
  if (!Object.keys(authStore.isAuth).length) {
    await infoStore.fetchUserInfo();
  }
  if (
    to.name !== "login" &&
    to.name !== "registration" &&
    !Object.keys(authStore.isAuth).length
  )
    next({ name: "login" });
  else next();
});
export default router;
