<script setup lang="ts">
import { onMounted } from 'vue';
import { Card, Progress, Row, Col, Tag } from '@lx/ui';
import { useSkillsStore } from '../stores/skills';

const skillsStore = useSkillsStore();

onMounted(() => {
    skillsStore.fetchSkills();
});
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
                    <Col v-for="skill in skillsStore.frontendSkills" :key="skill.name" :xs="24" :md="12" :lg="8">
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
                    <Col v-for="skill in skillsStore.otherSkills" :key="skill.name" :xs="24" :md="8">
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
