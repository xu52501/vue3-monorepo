// src/stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/api/user';

export const useUserStore = defineStore('user', () => {
    // 状态
    const currentUser = ref<User | null>(null);
    const userList = ref<User[]>([]);
    const permissions = ref<string[]>([]);

    // 计算属性
    const isAdmin = computed(() => {
        return currentUser.value?.role === 'admin';
    });

    const activeUsers = computed(() => {
        return userList.value.filter((user) => user.status === 'active');
    });

    // 动作
    const setCurrentUser = (user: User) => {
        currentUser.value = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const setUserList = (users: User[]) => {
        userList.value = users;
    };

    const addUser = (user: User) => {
        userList.value = [...userList.value, user];
    };

    const updateUser = (id: string, updates: Partial<User>) => {
        userList.value = userList.value.map((user) => (user.id === id ? { ...user, ...updates } : user));
    };

    const removeUser = (id: string) => {
        userList.value = userList.value.filter((user) => user.id !== id);
    };

    const setPermissions = (perms: string[]) => {
        permissions.value = perms;
    };

    const hasPermission = (permission: string) => {
        return permissions.value.includes(permission);
    };

    // 初始化
    const initFromStorage = () => {
        const stored = localStorage.getItem('currentUser');
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);

            // 验证数据结构
            if (parsed && typeof parsed === 'object' && 'id' in parsed && 'role' in parsed) {
                currentUser.value = parsed;
            } else {
                console.warn('Invalid stored user data, clearing');
                localStorage.removeItem('currentUser');
            }
        } catch (error) {
            console.error('Failed to parse stored user, clearing data:', error);
            // 清理损坏的数据
            localStorage.removeItem('currentUser');
        }
    };

    const clearUser = () => {
        currentUser.value = null;
        userList.value = [];
        permissions.value = [];
        localStorage.removeItem('currentUser');
    };

    return {
        // 状态
        currentUser,
        userList,
        permissions,

        // 计算属性
        isAdmin,
        activeUsers,

        // 动作
        setCurrentUser,
        setUserList,
        addUser,
        updateUser,
        removeUser,
        setPermissions,
        hasPermission,
        initFromStorage,
        clearUser,
    };
});
