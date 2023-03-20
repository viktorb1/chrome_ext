import { createApp } from "vue";
import { createPinia } from "pinia";
import "./main.css";
import router from "./router";

import Applet from "./views/Applet.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSquareMinus,
  faPrint,
  faTable,
  faDownload,
  faFolderOpen,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPrint,
  faTable,
  faDownload,
  faFolderOpen,
  faSquarePlus,
  faSquareMinus
);

const app = createApp(Applet);
app.use(router);
app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
