import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import { createI18n } from 'vue-i18n'

const pinia = createPinia();

const i18n = createI18n({
    legacy: false,
    locale: 'de-DE',
    numberFormats: {
        'de-DE': {
            currency: {
                style: 'currency',
                currency: 'EUR',
            },
        },
    },
})

createApp(App).use(router).use(pinia).use(i18n).mount("#app");
