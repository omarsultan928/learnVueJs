import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./style.css";
const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        userName: "Omar Sultan",
        userEmail: "omarsultan054@gmail.com",
        userAge: 24,
        userRole: "Software Engineer Level I",
        userInstitute: "Enosis Solutions",
      },
    };
  },
  mutations: {
    increment() {
      this.state.count++;
    },
    updateUser(state, payload) {
      for (const props in this.state.user) {
        if (props === payload.key) {
          this.state.user[props] = payload.value;
        }
      }
    },
  },
});
const app = createApp(App);
app.use(store);
app.mount("#app");
