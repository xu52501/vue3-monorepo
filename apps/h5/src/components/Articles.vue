<script setup lang="ts">
import { onMounted, h } from 'vue';
import { Card, Tag, Button, Row, Col, ReadOutlined, Skeleton } from '@lx/ui';
import { useArticlesStore } from '../stores/articles';

const articlesStore = useArticlesStore();

onMounted(() => {
    articlesStore.fetchArticles();
});

const getTagColor = (index: number) => {
    const colors = ['blue', 'purple', 'pink', 'green'];
    return colors[index % colors.length];
};

const handleTagClick = (tag: string) => {
    articlesStore.setSelectedTag(tag);
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

            <!-- Tag Filter -->
            <div class="flex flex-wrap justify-center gap-2 mb-12">
                <Tag
                    v-for="tag in articlesStore.allTags"
                    :key="tag"
                    :checked="articlesStore.selectedTag === tag"
                    @click="handleTagClick(tag)"
                    class="cursor-pointer"
                >
                    {{ tag === 'all' ? '全部' : tag }}
                </Tag>
            </div>

            <!-- Loading State -->
            <Skeleton v-if="articlesStore.loading" active />

            <!-- Articles Grid -->
            <Row v-else :gutter="[16, 16]">
                <Col v-for="article in articlesStore.filteredArticles" :key="article.id" :xs="24" :md="12" :lg="8">
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
                                <span>{{ article.date }}</span>
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
