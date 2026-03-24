<script setup lang="ts">
// import Navigation from './components/Navigation.vue';
// import Hero from './components/Hero.vue';
// import Skills from './components/Skills.vue';
// import Articles from './components/Articles.vue';
// import Footer from './components/Footer.vue';
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
