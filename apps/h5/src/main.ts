import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { lxUi } from '@lx/ui';
import App from './App.vue';
import './style/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(lxUi).mount('#app');
