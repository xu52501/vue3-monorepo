// src/utils/format.ts
export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('zh-CN');
};

export const formatCurrency = (amount: number) => {
    return `¥${amount.toFixed(2)}`;
};

// src/utils/validate.ts
export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
};
