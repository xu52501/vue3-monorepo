/// <reference types="vite/client" />

declare module '@lx/ui/resolver' {
  import type { ComponentResolver } from 'unplugin-vue-components/types';
  export const uiResolver: ComponentResolver;
}
