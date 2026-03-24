<script setup lang="ts">
import { ref, h } from 'vue';
import { Menu, Button, Drawer, MenuOutlined } from '@lx/ui';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

interface NavItem {
    key: 'hero' | 'skills' | 'articles' | 'contact';
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { key: 'hero', label: '首页', href: '#hero' },
    { key: 'skills', label: '技能', href: '#skills' },
    { key: 'articles', label: '文章', href: '#articles' },
    { key: 'contact', label: '联系', href: '#contact' },
];

const handleMenuClick = (info: any) => {
    const key = String(info.key);
    const item = navItems.find((nav) => nav.key === key);
    if (item?.href) {
        window.location.hash = item.href;
        mobileMenuOpen.value = false;
    }
};
</script>

<template>
    <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div class="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <!-- Logo -->
            <div class="text-2xl font-bold text-main-color">💻 Portfolio</div>

            <!-- Desktop Menu -->
            <Menu
                mode="horizontal"
                class="hidden md:flex border-none bg-transparent"
                :selectedKeys="[]"
                @click="handleMenuClick"
            >
                <Menu.Item v-for="item in navItems" :key="item.key" class="hover:text-main-color">
                    {{ item.label }}
                </Menu.Item>
            </Menu>

            <!-- Mobile Menu Button -->
            <Button class="md:hidden icon-btn" type="text" :icon="h(MenuOutlined)" @click="toggleMobileMenu" />
        </div>

        <!-- Mobile Menu Drawer -->
        <Drawer v-model:open="mobileMenuOpen" placement="right" :closable="false" :bodyStyle="{ padding: 0 }">
            <Menu mode="vertical" class="border-none" :selectedKeys="[]" @click="handleMenuClick">
                <Menu.Item v-for="item in navItems" :key="item.key" class="text-center">
                    {{ item.label }}
                </Menu.Item>
            </Menu>
        </Drawer>
    </div>
</template>

<style scoped lang="scss">
/* 组件特定样式 */
</style>
