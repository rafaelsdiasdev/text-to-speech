import Vue from "vue";
import App from "./App.vue";
import { Loading } from "element-ui";

Vue.config.productionTip = false;
Vue.use(Loading);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
