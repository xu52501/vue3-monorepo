// src/api/user.ts
import request from '@/utils/request';

export interface User {
    id?: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
}

export const getUsers = (params?: { id: number }) => {
    return request.get('/users', { params });
};

export const createUser = (data: Omit<User, 'id'>) => {
    return request.post('/users', data);
};

export const updateUser = (id: string, data: Partial<User>) => {
    return request.put(`/users/${id}`, data);
};

export const deleteUser = (id: string) => {
    return request.delete(`/users/${id}`);
};
