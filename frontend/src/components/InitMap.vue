<template>
    <div class="content-container">
        <div class="left-panel">
            <Header />
            <div class="scroll">
                <!-- AptResult에서 리뷰 상태 토글 요청 -->
                <!-- <AptResult @toggle-reviews="toggleReviewsVisibility" /> -->
                
            </div>
        </div>
        <Map class="mw" :is-reviews-hidden="isReviewsHidden" @collapse-reviews="hideReviews" />
    </div>
</template>

<script setup>
import Header from "./Header.vue";
import Map from "@/components/Map.vue";
import AptResult from "@/components/apt/AptResult.vue";
import { ref } from "vue";

// 리뷰 표시 상태 관리
const isReviewsHidden = ref(true);

// 리뷰 토글 (AptResult에서 요청)
const toggleReviewsVisibility = () => {
    isReviewsHidden.value = !isReviewsHidden.value;
};

// 리뷰 숨기기 (Map에서 요청)
const hideReviews = () => {
    isReviewsHidden.value = true;
};
</script>


<style scoped>
.content-container {
    display: flex;
    
    /* position: relative; */
}

.left-panel {
    width: 400px;
    z-index: 10;
    min-width: 400px;
    /* max-height: 100vh; */
    padding: 1rem;
    background-color: #f7f9fc;
    overflow-y: hidden;
}

.scroll {
    height: calc(92vh);
    overflow-y: auto;
    scrollbar-width: none;
    /* Firefox */
    /* -ms-overflow-style: none; */
    /* Internet Explorer/Edge */
}

.mw {
    /* position: absolute; */
    
    /* width: calc(100vw-400px); */
    /* min-width: 600px; */
}
</style>
