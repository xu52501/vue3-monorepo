// src/stores/skills.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import request from '../utils/request';

export interface Skill {
    name: string;
    description: string;
    icon: string;
    proficiency: number;
    category: 'frontend' | 'other';
}

export const useSkillsStore = defineStore('skills', () => {
    // 状态
    const skills = ref<Skill[]>([]);
    const loading = ref(false);

    // 计算属性
    const frontendSkills = computed(() => skills.value.filter((skill) => skill.category === 'frontend'));

    const otherSkills = computed(() => skills.value.filter((skill) => skill.category === 'other'));

    const averageProficiency = computed(() => {
        if (skills.value.length === 0) return 0;
        const total = skills.value.reduce((sum, skill) => sum + skill.proficiency, 0);
        return Math.round(total / skills.value.length);
    });

    // 动作
    const fetchSkills = async () => {
        loading.value = true;
        try {
            // 尝试从 API 获取，如果失败则使用默认数据
            const response = await request.get('/skills');
            skills.value = response.data || getDefaultSkills();
        } catch (error) {
            console.warn('Failed to fetch skills from API, using default data:', error);
            skills.value = getDefaultSkills();
        } finally {
            loading.value = false;
        }
    };

    const addSkill = (skill: Skill) => {
        skills.value = [...skills.value, skill];
    };

    const updateSkill = (name: string, updates: Partial<Skill>) => {
        skills.value = skills.value.map((skill) => (skill.name === name ? { ...skill, ...updates } : skill));
    };

    const removeSkill = (name: string) => {
        skills.value = skills.value.filter((skill) => skill.name !== name);
    };

    // 默认技能数据（当 API 不可用时使用）
    const getDefaultSkills = (): Skill[] => [
        // 前端技能
        {
            name: 'Vue.js',
            description: '熟练掌握 Vue 3 及其生态',
            icon: '🖖',
            proficiency: 95,
            category: 'frontend',
        },
        {
            name: 'React',
            description: '深入理解 React Hooks 和状态管理',
            icon: '⚛️',
            proficiency: 85,
            category: 'frontend',
        },
        {
            name: 'TypeScript',
            description: '精通 TypeScript 类型系统',
            icon: '📘',
            proficiency: 90,
            category: 'frontend',
        },
        {
            name: 'Tailwind CSS',
            description: '快速构建响应式 UI',
            icon: '🎨',
            proficiency: 90,
            category: 'frontend',
        },
        {
            name: 'Vite',
            description: '现代化的前端构建工具',
            icon: '⚡',
            proficiency: 85,
            category: 'frontend',
        },
        {
            name: 'WebGL',
            description: '3D 图形编程基础',
            icon: '🌐',
            proficiency: 75,
            category: 'frontend',
        },

        // 其他技能
        {
            name: '响应式设计',
            description: 'Mobile First 设计理念',
            icon: '📱',
            proficiency: 95,
            category: 'other',
        },
        {
            name: '性能优化',
            description: '代码分割、缓存、懒加载',
            icon: '⚙️',
            proficiency: 85,
            category: 'other',
        },
        {
            name: '测试驱动',
            description: '单元测试、集成测试',
            icon: '✅',
            proficiency: 80,
            category: 'other',
        },
    ];

    return {
        // 状态
        skills,
        loading,

        // 计算属性
        frontendSkills,
        otherSkills,
        averageProficiency,

        // 动作
        fetchSkills,
        addSkill,
        updateSkill,
        removeSkill,
    };
});
