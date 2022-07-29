import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 监听卸载操作
window.addEventListener("unmount", function () {
  app.$destroy();
});

window.microApp.addDataListener(function (data) {
  console.log("来自基座应用的数据", data);
}, true);
