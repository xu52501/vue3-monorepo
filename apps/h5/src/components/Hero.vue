<script setup lang="ts">
import { Avatar, Button, Card, Statistic, Row, Col, GithubOutlined, MailOutlined } from '@lx/ui';
import { h } from 'vue';
</script>

<template>
    <section
        class="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4"
    >
        <div class="container max-w-4xl mx-auto">
            <Card class="text-center shadow-lg" :bordered="false">
                <div class="flex flex-col items-center">
                    <!-- Avatar -->
                    <div class="mb-8 relative">
                        <Avatar
                            size="large"
                            :style="{ backgroundColor: '#5189ff', verticalAlign: 'middle', fontSize: '48px' }"
                        >
                            👨‍💻
                        </Avatar>
                        <div
                            class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                        ></div>
                    </div>

                    <!-- Name & Title -->
                    <h1 class="text-4xl md:text-5xl font-bold text-title-color mb-4">前端开发工程师</h1>

                    <!-- Bio -->
                    <p class="text-lg text-tips-color mb-6 leading-relaxed max-w-2xl">AI 生成 + github actions测试</p>

                    <!-- Social Links & CTA -->
                    <div class="flex flex-wrap gap-4 justify-center mb-8">
                        <Button type="primary" size="large" :icon="h(GithubOutlined)" class="icon-btn">
                            <a href="https://github.com" target="_blank" class="text-white">GitHub</a>
                        </Button>
                        <Button size="large" :icon="h(MailOutlined)" class="icon-btn">
                            <a href="mailto:example@email.com">联系我</a>
                        </Button>
                    </div>

                    <!-- Quick Stats -->
                    <div class="w-full pt-8 border-t border-border-color">
                        <Row :gutter="16">
                            <Col :span="8">
                                <Statistic title="年开发经验" :value="5" suffix="+" />
                            </Col>
                            <Col :span="8">
                                <Statistic title="项目完成" :value="50" suffix="+" />
                            </Col>
                            <Col :span="8">
                                <Statistic title="用户满意度" :value="100" suffix="%" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>

            <!-- AI Generated Badge -->
            <div class="mt-8 text-center">
                <span class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    🤖 AI 生成
                </span>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    background-color: #fafbfc;
}

.w-32 {
    --tw-shadow: 0 10px 30px rgba(81, 137, 255, 0.2);
    box-shadow: var(--tw-shadow);
}
</style>
