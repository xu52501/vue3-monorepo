import { createApp } from 'vue';
import App from './App.vue';
import { lxUi } from '@lx/ui';
import './style/index.css';

createApp(App).use(lxUi).mount('#app');
