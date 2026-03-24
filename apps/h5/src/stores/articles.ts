// src/stores/articles.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import request from '../utils/request';

export interface Article {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: string;
    readTime: string;
    icon: string;
    link?: string;
}

export const useArticlesStore = defineStore('articles', () => {
    // 状态
    const articles = ref<Article[]>([]);
    const loading = ref(false);
    const selectedTag = ref<string>('all');

    // 计算属性
    const filteredArticles = computed(() => {
        if (selectedTag.value === 'all') {
            return articles.value;
        }
        return articles.value.filter((article) => article.tags.includes(selectedTag.value));
    });

    const allTags = computed(() => {
        const tags = new Set<string>();
        articles.value.forEach((article) => article.tags.forEach((tag) => tags.add(tag)));
        return ['all', ...Array.from(tags)];
    });

    // 动作
    const fetchArticles = async () => {
        loading.value = true;
        try {
            // 尝试从 API 获取，如果失败则使用默认数据
            const response = await request.get('/articles');
            articles.value = response.data || getDefaultArticles();
        } catch (error) {
            console.warn('Failed to fetch articles from API, using default data:', error);
            articles.value = getDefaultArticles();
        } finally {
            loading.value = false;
        }
    };

    const addArticle = (article: Article) => {
        articles.value = [...articles.value, article];
    };

    const updateArticle = (id: number, updates: Partial<Article>) => {
        articles.value = articles.value.map((article) => (article.id === id ? { ...article, ...updates } : article));
    };

    const removeArticle = (id: number) => {
        articles.value = articles.value.filter((article) => article.id !== id);
    };

    const setSelectedTag = (tag: string) => {
        selectedTag.value = tag;
    };

    // 默认文章数据（当 API 不可用时使用）
    const getDefaultArticles = (): Article[] => [
        {
            id: 1,
            title: 'Vue 3 Composition API 深度解析',
            description: '详细讲解 Vue 3 Composition API 的设计理念、核心概念和实际应用场景',
            tags: ['Vue.js', 'JavaScript'],
            date: '2024-03-15',
            readTime: '12 分钟',
            icon: '🖖',
            link: '#',
        },
        {
            id: 2,
            title: 'React Hooks 最佳实践',
            description: '深入浅出地讲解 React Hooks 的使用要点，避免常见的坑',
            tags: ['React', 'Hooks'],
            date: '2024-03-10',
            readTime: '15 分钟',
            icon: '⚛️',
            link: '#',
        },
        {
            id: 3,
            title: 'TypeScript 类型系统完全指南',
            description: '从基础到进阶，全面覆盖 TypeScript 的类型系统知识',
            tags: ['TypeScript', '类型系统'],
            date: '2024-03-05',
            readTime: '20 分钟',
            icon: '📘',
            link: '#',
        },
        {
            id: 4,
            title: '前端性能优化的 10 个技巧',
            description: '分享实战中使用过的数十个性能优化方案，包含案例和数据对比',
            tags: ['性能优化', '最佳实践'],
            date: '2024-02-28',
            readTime: '18 分钟',
            icon: '⚡',
            link: '#',
        },
        {
            id: 5,
            title: 'Webpack vs Vite：现代构建工具对比',
            description: '对比两种主流构建工具的优缺点，帮助你选择合适的方案',
            tags: ['Webpack', 'Vite', '工程化'],
            date: '2024-02-20',
            readTime: '14 分钟',
            icon: '🔧',
            link: '#',
        },
        {
            id: 6,
            title: '手写实现 Vue 响应式系统',
            description: '从零开始实现 Vue 的响应式系统，深入理解其原理',
            tags: ['Vue.js', '深度解析'],
            date: '2024-02-15',
            readTime: '25 分钟',
            icon: '🎯',
            link: '#',
        },
    ];

    return {
        // 状态
        articles,
        loading,
        selectedTag,

        // 计算属性
        filteredArticles,
        allTags,

        // 动作
        fetchArticles,
        addArticle,
        updateArticle,
        removeArticle,
        setSelectedTag,
    };
});
