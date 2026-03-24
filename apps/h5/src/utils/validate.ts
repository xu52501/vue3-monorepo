// src/utils/validate.ts
/**
 * 验证相关工具函数
 * 包含邮箱、手机号等数据验证逻辑
 */

/**
 * 验证邮箱格式
 * @param email - 邮箱字符串
 * @returns 是否为有效邮箱格式
 */
export const validateEmail = (email: string): boolean => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

/**
 * 验证手机号格式（中国大陆）
 * @param phone - 手机号字符串
 * @returns 是否为有效手机号格式
 */
export const validatePhone = (phone: string): boolean => {
    if (!phone || typeof phone !== 'string') {
        return false;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
};

/**
 * 验证密码强度
 * @param password - 密码字符串
 * @returns 是否符合密码强度要求（至少8位，包含字母和数字）
 */
export const validatePassword = (password: string): boolean => {
    if (!password || typeof password !== 'string') {
        return false;
    }

    // 至少8位，包含字母和数字
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

/**
 * 验证字符串长度范围
 * @param str - 要验证的字符串
 * @param minLength - 最小长度（包含）
 * @param maxLength - 最大长度（包含）
 * @returns 是否在长度范围内
 */
export const validateLength = (str: string, minLength: number, maxLength: number): boolean => {
    if (!str || typeof str !== 'string') {
        return false;
    }

    const length = str.trim().length;
    return length >= minLength && length <= maxLength;
};
