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
        userList.value.push(user);
    };

    const updateUser = (id: string, updates: Partial<User>) => {
        const index = userList.value.findIndex((user) => user.id === id);
        if (index !== -1) {
            userList.value[index] = { ...userList.value[index], ...updates };
        }
    };

    const removeUser = (id: string) => {
        const index = userList.value.findIndex((user) => user.id === id);
        if (index !== -1) {
            userList.value.splice(index, 1);
        }
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
        if (stored) {
            try {
                currentUser.value = JSON.parse(stored);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
            }
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
