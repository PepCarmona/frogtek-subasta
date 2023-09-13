import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import MainView from './views/MainView.vue';

const app = createApp(MainView);

app.use(createPinia());

app.mount('#app');
