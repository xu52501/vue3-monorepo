// src/utils/format.ts
/**
 * 格式化相关工具函数
 * 包含日期、货币等数据格式化逻辑
 */

/**
 * 格式化日期
 * @param date - 日期对象或字符串
 * @returns 格式化后的日期字符串 (例: 2024/3/24)
 */
export const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) {
        return '--';
    }

    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (isNaN(dateObj.getTime())) {
            console.warn(`Invalid date: ${date}`);
            return '--';
        }

        return dateObj.toLocaleDateString('zh-CN');
    } catch (error) {
        console.error('Error formatting date:', error);
        return '--';
    }
};

/**
 * 格式化货币
 * @param amount - 金额数值
 * @returns 格式化后的货币字符串 (例: ¥99.99)
 */
export const formatCurrency = (amount: number | null | undefined): string => {
    if (amount === null || amount === undefined) {
        return '¥0.00';
    }

    if (typeof amount !== 'number' || isNaN(amount)) {
        console.warn(`Invalid amount: ${amount}`);
        return '¥0.00';
    }

    // 确保金额有效
    const validAmount = Math.max(0, amount);
    return `¥${validAmount.toFixed(2)}`;
};

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * 格式化数字（添加千分位分隔符）
 * @param num - 数字
 * @returns 格式化后的数字字符串
 */
export const formatNumber = (num: number): string => {
    if (typeof num !== 'number' || isNaN(num)) {
        return '0';
    }

    return num.toLocaleString('zh-CN');
};
