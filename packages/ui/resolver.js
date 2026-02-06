/**
 * @author        lx <1154354121@qq.com>
 * @date          2025-12-30 14:59:41
 * Copyright © YourCompanyName All rights reserved
 */

import { ComponentResolver } from 'unplugin-vue-components/types';

export const uiResolver: ComponentResolver = {
    type: 'component',
    resolve: (name: string) => {
        if (name.toLocaleLowerCase().startsWith('my')) {
            return {
                name,
                from: '@lx/ui',
            };
        }
    },
};
