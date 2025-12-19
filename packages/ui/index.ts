import mButton from './src/components/button.vue';
import mText from './src/components/text.vue';
import { type App } from 'vue';
import './src/style/index.css';

export * from 'ant-design-vue';
export { mButton };

export const lxUi = {
    install(app: App) {
        // 这里可以全局挂载
        app.component('m-button', mButton);
        app.component('m-text', mText);
    },
};
