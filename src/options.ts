import { createApp } from "vue";
import { createPinia } from "pinia";

import OptionsView from "./views/OptionsView.vue";
import "./main.css";

const app = createApp(OptionsView);

app.use(createPinia());

app.mount("#app");
