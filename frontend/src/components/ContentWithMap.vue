<template>
    <div class="content-container">
        <div class="left-panel">
            <Header />
            <div class="scroll">
                <router-view @toggle-reviews="toggleReviewsVisibility" ></router-view>
            </div>
        </div>
        <Map class="mw" :is-reviews-hidden="isReviewsHidden" @collapse-reviews="hideReviews" />
    </div>
</template>

<script setup>
import Header from "./Header.vue";
import Map from "@/components/Map.vue";
import AptDetail from "@/components/apt/AptDetail.vue";
import { ref } from "vue";


// 리뷰 표시 상태 관리
const isReviewsHidden = ref(true);

// 리뷰 토글 (AptResult에서 요청)
const toggleReviewsVisibility = () => {
    console.log("toggleReviewsVisibility called");
    isReviewsHidden.value = !isReviewsHidden.value;
};

// 리뷰 숨기기 (Map에서 요청)
const hideReviews = () => {
    // console.log("hideReviews called");
    isReviewsHidden.value = true;
};
</script>


<style scoped>
.content-container {
    display: flex;
    overflow: hidden;
    /* position: relative; */
}

.content-with-map {

}

.left-panel {
    width: 400px;
    z-index: 10;
    min-width: 400px;
    max-height: 100vh;
    padding: 1rem;
    background-color: #f7f9fc;
    overflow-y: hidden;
}

.scroll {
    height: calc(92vh);
    overflow-y: auto;
    scrollbar-width: none;
}

.mw {
    /* position: absolute; */
    /* height: 86vh !important; */
    width: calc(100vw);
    top: 2rem;
    min-width: 800px;
    height: 100%;
    overflow: hidden;
}
</style>
