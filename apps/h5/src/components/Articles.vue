<script setup lang="ts">
import { Card, Tag, Button, Row, Col, ReadOutlined } from '@lx/ui';
import { h } from 'vue';

interface Article {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: string;
    readTime: string;
    icon: string;
    link?: string;
}

const articles: Article[] = [
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

const getTagColor = (index: number) => {
    const colors = ['blue', 'purple', 'pink', 'green'];
    return colors[index % colors.length];
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN');
};
</script>

<template>
    <section class="articles py-20 px-4 bg-gray-50">
        <div class="container max-w-6xl mx-auto">
            <!-- Section Title -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-title-color mb-4">技能文章</h2>
                <p class="text-tips-color mb-4">分享我在前端开发中的经验和思考</p>
                <div class="w-16 h-1 bg-main-color mx-auto rounded"></div>
            </div>

            <!-- Articles Grid -->
            <Row :gutter="[16, 16]">
                <Col v-for="article in articles" :key="article.id" :xs="24" :md="12" :lg="8">
                    <Card hoverable class="h-full" :bodyStyle="{ padding: '24px' }">
                        <!-- Icon Header -->
                        <div class="text-center mb-4">
                            <div class="text-5xl">{{ article.icon }}</div>
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col flex-grow">
                            <!-- Title -->
                            <h3 class="text-lg font-bold text-title-color mb-3 line-clamp-2">
                                {{ article.title }}
                            </h3>

                            <!-- Description -->
                            <p class="text-sm text-tips-color mb-4 line-clamp-3 flex-grow">
                                {{ article.description }}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-4">
                                <Tag
                                    v-for="(tag, index) in article.tags"
                                    :key="tag"
                                    :color="getTagColor(index)"
                                    size="small"
                                >
                                    {{ tag }}
                                </Tag>
                            </div>

                            <!-- Meta Info -->
                            <div
                                class="flex items-center justify-between text-xs text-tips-color border-t border-border-color pt-4"
                            >
                                <span>{{ formatDate(article.date) }}</span>
                                <span>{{ article.readTime }}</span>
                            </div>
                        </div>

                        <!-- Read More Button -->
                        <div class="mt-4">
                            <Button type="primary" :icon="h(ReadOutlined)" block class="article-read-btn">
                                阅读全文
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <!-- View All Button -->
            <div class="text-center mt-16">
                <Button type="primary" size="large">查看所有文章</Button>
            </div>

            <!-- AI Generated Badge -->
            <div class="mt-8 text-center">
                <Tag color="blue" class="text-sm">🤖 AI 生成</Tag>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

article {
    &:hover {
        border-color: var(--main-color);
        box-shadow: 0 20px 40px rgba(81, 137, 255, 0.15);
    }
}
:deep(.article-read-btn.ant-btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
