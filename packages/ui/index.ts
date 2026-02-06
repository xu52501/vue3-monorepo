import MyButton from './src/components/button.vue';
import MyText from './src/components/text.vue';
import { type App } from 'vue';
import './src/style/index.css';

export * from 'ant-design-vue';
export { MyButton, MyText };

export const lxUi = {
    install(app: App) {
        // 这里可以全局挂载
        app.component('my-button', MyButton);
        app.component('my-text', MyText);
    },
};
