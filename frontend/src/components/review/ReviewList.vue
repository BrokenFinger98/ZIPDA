<template>
    <div class="review-list">
        <!-- 리뷰 작성 버튼 -->
        <div class="review-header p-2">
            <span icon clickable @click="toggleCollapse" class="collapse-button">
                <v-icon>mdi-chevron-left</v-icon>
            </span>
            <h4 class="review-list-title">이야기 ({{ reviews.length }}) </h4>
            <!-- ({{ reviews.length }}) -->

            <v-btn variant="text" @click="openReviewDialog" class="write-button px-3">
                <!-- <v-icon>mdi-pencil</v-icon> -->
                <font-awesome-icon :icon="['fas', 'pen']" class="write-icon" /> <span class="mx-2">글 작성</span>
            </v-btn>
        </div>

        <!-- 리뷰 목록 -->
        <div class="reviews p-2" v-if="reviews.length>0">
            <ReviewItem v-for="(review, index) in reviews" :key="index" :review="review" :index="index"
                @add-comment="handleAddComment" />
        </div>
        <div class="reviews p-2" v-else>
            <div class="no-review">
                첫 번째 리뷰를 작성하세요!
            </div>
        </div>

        <!-- 리뷰 작성 모달 -->
        <v-dialog v-model="isReviewDialogOpen" max-width="500px">
            <v-card>
                <v-card-title>리뷰 작성</v-card-title>
                <v-card-text>
                    <v-textarea v-model="newReviewContent" label="리뷰를 입력하세요" outlined rows="5" />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="submitReview">등록</v-btn>
                    <v-btn text @click="isReviewDialogOpen = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getArticlesByHouse } from "@/api/houseComment";
import ReviewItem from "@/components/review/ReviewItem.vue";

const emit = defineEmits(["collapse"]);

const toggleCollapse = () => {
    // console.log("collapse button clicked");
    emit("collapse"); // 부모 컴포넌트로 이벤트 전달
};

const reviews = ref([]);

const route = useRoute();
const houseId = route.params.id;

onMounted(() => {
    getArticlesByHouse(houseId).then((res) => {
        reviews.value = res.data.articles;
        console.log("reviews", res.data);
    })
})

// const reviews = ref([
//     {
//         author: {
//             id: 'Flex97',
//             nickname: '조용함이 좋아요',
//             avatar: 'https://cdn.vuetifyjs.com/images/john.png',
//         },
//         date: "2024-01-02", // 현재 시간 기준
//         content: '판교역에서 가깝고 아비뉴프랑이 바로 앞이라 편리해요.',
//         comments: [
//             {
//                 author: {
//                     id: 'e9See',
//                     nickname: '오전9',
//                     avatar: 'https://cdn.vuetifyjs.com/images/jane.jpg',
//                 },
//                 content: '동료들과 무리 없이 좋았습니다.',
//                 date: new Date(new Date() - 3600000).toISOString(), // 1시간 전
//             },
//         ],
//     },
//     {
//         author: {
//             id: 'Kakao85',
//             nickname: '단점도 있어요',
//             avatar: 'https://cdn.vuetifyjs.com/images/jane.jpg',
//         },
//         date: new Date(new Date() - 86400000).toISOString(), // 1일 전
//         content: '주차장이 부족하고 관리비가 비싸요.',
//         comments: [],
//     },
// ]);


const isReviewDialogOpen = ref(false);
const newReviewContent = ref("");

const openReviewDialog = () => {
    isReviewDialogOpen.value = true;
};

const submitReview = () => {
    if (newReviewContent.value.trim()) {
        reviews.value.unshift({
            author: {
                id: "currentUser",
                nickname: "현재사용자",
                avatar: "https://cdn.vuetifyjs.com/images/john.png",
            },
            date: new Date().toISOString(),
            content: newReviewContent.value.trim(),
            comments: [],
        });
        newReviewContent.value = "";
        isReviewDialogOpen.value = false;
    }
};

const handleAddComment = (reviewIndex, comment) => {
    reviews.value[reviewIndex].comments.push(comment);
};
</script>


<style scoped>
.review-list {}

.review-header {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-main-theme);
    align-items: center;
    /* margin-bottom: 16px; */
}

.review-header-title {
    display: flex;
    justify-content: space-between;
}

.review-list-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0;
}

.review-comment {
    font-size: 0.8rem;
    color: var(--vt-c-gray-500);
    cursor: pointer;
}

.collapse-button {
    color: white;
    margin-right: 8px;
    cursor: pointer;
}

.write-button {
    margin-left: 3px;
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.7rem;
    color: white;
    cursor: pointer;
    padding: 10px;
    transition: color 0.3s ease;
}

.write-icon {
    margin-left: 10px;
}


.reviews {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
}

.review-item {
    background-color: #ffffff;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.review-meta {
    display: flex;
    align-items: center;
    gap: 8px;
}

.review-user {
    display: flex;
    flex-direction: column;
}

.review-time {
    font-size: 12px;
    color: #888;
}

.nickname {
    font-weight: bold;
    font-size: 14px;
}

.user-id {
    font-size: 12px;
    color: #888;
}

.review-content {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.5;
}

.review-footer {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #888;
    padding: 12px;
}

.comment-list {
    /* margin-left: 40px; */
    border-top: 1px solid #eee;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.comment-item {
    margin-top: 10px;
}

.comment-time {
    color: #888;
}

.comment-avatar {
    flex-shrink: 0;
}

.comment-content {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    width: 100%;
}

.comment-header {
    display: flex;
    justify-content: space-between;
}

.comment-nickname {
    font-weight: bold;
}

.comment-user-id {
    color: #888;
}

.comment-text {
    margin-top: 4px;
}

.no-review {
    padding: 2rem;
    color: #888;
    font-weight: 900;
}
</style>