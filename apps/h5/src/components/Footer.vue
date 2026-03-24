<script setup lang="ts">
import {
    Layout,
    Button,
    Row,
    Col,
    Divider,
    GithubOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    MailOutlined,
} from '@lx/ui';

const { Footer: AntFooter } = Layout;
const currentYear = new Date().getFullYear();

const socialLinks = [
    { name: 'GitHub', icon: GithubOutlined, url: 'https://github.com' },
    { name: 'Twitter', icon: TwitterOutlined, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: LinkedinOutlined, url: 'https://linkedin.com' },
    { name: 'Email', icon: MailOutlined, url: 'mailto:example@email.com' },
];

const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
};
</script>

<template>
    <AntFooter class="bg-title-color text-white py-12 px-4">
        <div class="container max-w-6xl mx-auto">
            <!-- Main Content -->
            <Row :gutter="32" class="mb-8">
                <!-- About -->
                <Col :xs="24" :md="8">
                    <h3 class="text-lg font-bold mb-4">关于我</h3>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        一名热情的前端开发工程师，致力于创建高效、美观的用户界面。
                    </p>
                </Col>

                <!-- Quick Links -->
                <Col :xs="24" :md="8">
                    <h3 class="text-lg font-bold mb-4">快速链接</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <a href="#skills" class="text-gray-300 hover:text-main-color transition-colors">技能栈</a>
                        </li>
                        <li>
                            <a href="#articles" class="text-gray-300 hover:text-main-color transition-colors">
                                技能文章
                            </a>
                        </li>
                        <li>
                            <a href="#projects" class="text-gray-300 hover:text-main-color transition-colors">
                                项目案例
                            </a>
                        </li>
                        <li>
                            <a href="#contact" class="text-gray-300 hover:text-main-color transition-colors">联系我</a>
                        </li>
                    </ul>
                </Col>

                <!-- Contact -->
                <Col :xs="24" :md="8">
                    <h3 class="text-lg font-bold mb-4">联系方式</h3>
                    <ul class="space-y-2 text-sm">
                        <li><span class="text-gray-300">📧 example@email.com</span></li>
                        <li><span class="text-gray-300">📱 +86 1234567890</span></li>
                        <li><span class="text-gray-300">📍 北京，中国</span></li>
                    </ul>
                </Col>
            </Row>

            <Divider class="border-gray-600 mb-8" />

            <!-- Social Links -->
            <div class="flex justify-center gap-6 mb-8">
                <Button
                    v-for="link in socialLinks"
                    :key="link.name"
                    type="text"
                    shape="circle"
                    size="large"
                    class="bg-gray-700 hover:bg-main-color border-gray-700 hover:border-main-color text-white"
                    @click="handleOpenLink(link.url)"
                >
                    <component :is="link.icon" />
                </Button>
            </div>

            <!-- Copyright -->
            <div class="text-center text-gray-400 text-sm">
                <p>© {{ currentYear }} 前端开发工程师. All rights reserved.</p>
                <p class="mt-2">Made with ❤️ using Vue 3 + Ant Design Vue</p>
            </div>

            <!-- AI Generated Badge -->
            <div class="mt-8 text-center">
                <span class="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    🤖 AI 生成
                </span>
            </div>
        </div>
    </AntFooter>
</template>

<style scoped lang="scss">
:deep(.ant-layout-footer) {
    background-color: var(--title-color);
    color: white;
    padding: 0;

    a {
        color: #ccc;
        transition: color 0.3s ease;

        &:hover {
            color: var(--main-color);
        }
    }
}
</style>
