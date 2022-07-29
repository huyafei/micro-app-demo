import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
  },
  {
    path: "/micro-app-view/:name", // vue-router@4.x path的写法为：'/my-page/:page*'
    name: "micro-app-view",
    component: () =>
      import(
        /* webpackChunkName: "micro-app-history" */ "../views/micro-app-view.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("router", store.state.token);
  if (["Login"].includes(to.name)) {
    next();
  } else {
    const token = store.state.token;
    if (token) {
      next();
    } else {
      next({
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
});
export default router;
