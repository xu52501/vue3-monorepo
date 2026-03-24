<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 当前激活的页面部分
const currentSection = ref('hero');

// 监听 hash 变化
const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'hero';
    currentSection.value = hash;

    // 平滑滚动到对应元素
    const element = document.getElementById(hash);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(() => {
    // 初始化时检查 hash
    handleHashChange();

    // 监听 hash 变化
    window.addEventListener('hashchange', handleHashChange);
});

onBeforeUnmount(() => {
    window.removeEventListener('hashchange', handleHashChange);
});
</script>

<template>
    <div id="app" class="bg-white">
        <!-- Navigation -->
        <Navigation />

        <!-- Main Content -->
        <main class="pt-16">
            <!-- Hero Section -->
            <div id="hero">
                <Hero />
            </div>

            <!-- Skills Section -->
            <div id="skills">
                <Skills />
            </div>

            <!-- Articles Section -->
            <div id="articles">
                <Articles />
            </div>
        </main>

        <!-- Footer -->
        <div id="contact">
            <Footer />
        </div>
    </div>
</template>

<style scoped lang="scss">
#app {
    min-height: 100vh;
}
</style>
