<template>
    <div class="text-3xl text-blue-600">
        hello
        <a class="text-4xl text-red-600">world</a>
        <button class="bg-amber-300 text-white hover:bg-amber-700 transition-all">btn</button>
        <div class="w-9 h-9 bg-lime-500 hover:translate-16 transition-all"></div>
        基础模板xx
        <p class="text-amber-700">{{ text }}</p>
    </div>
</template>

<script setup lang="ts" name="MyText">
// 基础模板
defineProps<{
    text: string;
}>();
</script>

<style lang="scss" scoped>
.text {
    //
}
</style>
