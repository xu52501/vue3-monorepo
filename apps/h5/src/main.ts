import { createApp } from 'vue';
import { lxUi } from '@lx/ui';
import App from './App.vue';
import './style/index.css';

const app = createApp(App);
app.use(lxUi).mount('#app');
