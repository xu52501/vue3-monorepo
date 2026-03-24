<script setup lang="ts">
import { Card, Progress, Row, Col, Tag } from '@lx/ui';

interface Skill {
    name: string;
    description: string;
    icon: string;
    proficiency: number;
}

const frontendSkills: Skill[] = [
    {
        name: 'Vue.js',
        description: '熟练掌握 Vue 3 及其生态',
        icon: '🖖',
        proficiency: 95,
    },
    {
        name: 'React',
        description: '深入理解 React Hooks 和状态管理',
        icon: '⚛️',
        proficiency: 85,
    },
    {
        name: 'TypeScript',
        description: '精通 TypeScript 类型系统',
        icon: '📘',
        proficiency: 90,
    },
    {
        name: 'Tailwind CSS',
        description: '快速构建响应式 UI',
        icon: '🎨',
        proficiency: 90,
    },
    {
        name: 'Vite',
        description: '现代化的前端构建工具',
        icon: '⚡',
        proficiency: 85,
    },
    {
        name: 'WebGL',
        description: '3D 图形编程基础',
        icon: '🌐',
        proficiency: 75,
    },
];

const otherSkills: Skill[] = [
    {
        name: '响应式设计',
        description: 'Mobile First 设计理念',
        icon: '📱',
        proficiency: 95,
    },
    {
        name: '性能优化',
        description: '代码分割、缓存、懒加载',
        icon: '⚙️',
        proficiency: 85,
    },
    {
        name: '测试驱动',
        description: '单元测试、集成测试',
        icon: '✅',
        proficiency: 80,
    },
];
</script>

<template>
    <section class="skills py-20 px-4 bg-white">
        <div class="container max-w-6xl mx-auto">
            <!-- Section Title -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-title-color mb-4">技能栈</h2>
                <div class="w-16 h-1 bg-main-color mx-auto rounded"></div>
            </div>

            <!-- Frontend Skills -->
            <div class="mb-16">
                <h3 class="text-2xl font-bold text-title-color mb-8">前端技术</h3>
                <Row :gutter="[16, 16]">
                    <Col v-for="skill in frontendSkills" :key="skill.name" :xs="24" :md="12" :lg="8">
                        <Card hoverable class="h-full" :bodyStyle="{ padding: '24px' }">
                            <div class="text-center">
                                <div class="text-4xl mb-4">{{ skill.icon }}</div>
                                <h4 class="text-lg font-bold text-title-color mb-2">{{ skill.name }}</h4>
                                <p class="text-sm text-tips-color mb-4">{{ skill.description }}</p>

                                <!-- Proficiency Progress -->
                                <Progress
                                    :percent="skill.proficiency"
                                    :strokeColor="'#5189ff'"
                                    :showInfo="false"
                                    size="small"
                                />
                                <div class="text-xs text-tips-color mt-2">{{ skill.proficiency }}%</div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <!-- Other Skills -->
            <div>
                <h3 class="text-2xl font-bold text-title-color mb-8">其他技能</h3>
                <Row :gutter="[16, 16]">
                    <Col v-for="skill in otherSkills" :key="skill.name" :xs="24" :md="8">
                        <Card hoverable class="h-full" :bodyStyle="{ padding: '24px' }">
                            <div class="text-center">
                                <div class="text-4xl mb-4">{{ skill.icon }}</div>
                                <h4 class="text-lg font-bold text-title-color mb-2">{{ skill.name }}</h4>
                                <p class="text-sm text-tips-color mb-4">{{ skill.description }}</p>

                                <Progress
                                    :percent="skill.proficiency"
                                    :strokeColor="'#5189ff'"
                                    :showInfo="false"
                                    size="small"
                                />
                                <div class="text-xs text-tips-color mt-2">{{ skill.proficiency }}%</div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <!-- AI Generated Badge -->
            <div class="mt-16 text-center">
                <Tag color="blue" class="text-sm">🤖 AI 生成</Tag>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
/* 鼠标悬停效果 */
.group:hover {
    border-color: var(--main-color);
    box-shadow: 0 10px 30px rgba(81, 137, 255, 0.1);
}
</style>
