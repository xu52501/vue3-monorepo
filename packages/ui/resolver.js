/**
 * @author        lx <1154354121@qq.com>
 * @date          2025-12-30 14:59:41
 * Copyright © YourCompanyName All rights reserved
 */

export const uiResolver = {
    type: 'component',
    resolve: (name) => {
        if (name.toLocaleLowerCase().startsWith('my')) {
            return {
                name,
                from: '@lx/ui',
            };
        }
    },
};
