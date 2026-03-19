<template>
    <Button open-type="" v-bind="$attrs" hover-class="button-hover"><slot>dd</slot></Button>
</template>

<script setup lang="ts">
import { Button, type ButtonProps } from 'ant-design-vue';

defineProps<ButtonProps>();
</script>
