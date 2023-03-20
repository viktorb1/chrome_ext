import { createApp } from "vue";
import { createPinia } from "pinia";
import "./main.css";

import OptionsView from "./views/OptionsView.vue";

const app = createApp(OptionsView);

app.use(createPinia());

app.mount("#app");
