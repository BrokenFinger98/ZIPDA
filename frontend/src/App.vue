<!-- App.vue -->
<template>
    <div class="app-container">
        <NavBar />
        <template v-if="!noMap">
            <ContentWithMap />
        </template>
        <template v-else>
            <ContentBasic />
        </template>
    </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import ContentWithMap from "@/components/ContentWithMap.vue";
import ContentBasic from "@/components/ContentBasic.vue";

import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

// noMap은 특정 경로에 따라 조건부로 true 또는 false가 됩니다
const noMap = computed(() => {
    return route.name === 'board' || route.name?.startsWith('notice')
        || route.name?.startsWith('qna')
        || route.name?.startsWith('msg')
        || route.name?.startsWith('modify');
});


</script>

<style>
.app-container {
    display: flex;
    height: 100vh;
    max-height: 100vh;
    overflow-y: hidden;
}
</style>
