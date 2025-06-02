<template>
    <div class="review-item">
        <div class="review-header-title">
            <div class="review-meta">
                <v-avatar size="32">
                    <v-img :src="profileImg" alt="Profile"></v-img>
                </v-avatar>
                <div class="review-user">
                    <span class="nickname">{{ review.nickname }}</span>
                    <!-- <span class="user-id">@{{ review.author.id }}</span> -->
                </div>
            </div>
            <div>
                <span class="review-time">{{ review.createdAt }}</span>
            </div>
        </div>
        <p class="review-content">{{ review.content }}</p>
        <div class="review-footer">
            <div class="review-comment" @click="toggleComments">
                <font-awesome-icon :icon="['far', 'comment']" /> {{ comments.length }}
            </div>
        </div>

        <!-- 댓글 목록 -->
        <div v-if="review.showComments" class="comment-list">
            <div v-for="(comment, cIndex) in comments" :key="'comment' + cIndex" class="comment-item">
                <div class="comment-content">
                    <div class="comment-header">
                        <div class="comment-nickname">{{ comment.nickname }}</div>
                        <div class="comment-time">{{ comment.createdAt }}</div>
                    </div>
                    <!-- <span class="comment-user-id">@{{ comment.author.id }}</span> -->
                    <p class="comment-text">{{ comment.content }}</p>
                </div>
            </div>

            <!-- 댓글 입력 -->
            <div class="d-flex">
                <!-- <v-text-field v-model="newComment" placeholder="댓글을 입력하세요..." density="compact" hide-details
                    @keyup.enter="addComment" :disabled="!isLogin"
                    append-inner-icon="mdi-pencil"
                    @click:append-inner="addComment">
                </v-text-field> -->
                <v-text-field
                    v-model="newComment"
                    placeholder="댓글을 입력하세요..."
                    density="compact"
                    hide-details
                    @keyup.enter="addComment"
                    :disabled="!isLogin"
                    append-inner-icon="mdi-pencil"
                    @click:append-inner="addComment"
                ></v-text-field>
                <div v-if="!isLogin" class="login-prompt">
                    <v-btn color="" @click="redirectToLogin" variant="text" >로그인하기</v-btn>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCommentsByArticleId } from "@/api/comment";
import { useUserStore } from "@/stores/user";
import { createComment } from "@/api/comment";

const props = defineProps({
    review: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
});


const userStore = useUserStore();
const isLogin = computed(() => userStore.isLogin);


const articleId = ref(0);
const comments = ref([]);
const newComment = ref("");

onMounted(() => {
    articleId.value = props.review.articleId;
    console.log(articleId.value);
    getCommentsByArticleId(articleId.value).then((res) => {
        comments.value = res.data.comments;
        console.log(comments.value);
    });
})

defineEmits(["add-comment"]);


const profileImg = "https://cdn.vuetifyjs.com/images/john.png";

const formatDate = (reviewDate) => {
    const now = new Date(); // 현재 시간
    const reviewTime = new Date(reviewDate); // 입력된 시간
    
    // 날짜 문자열로 비교 (같은 날짜인지 확인)
    const nowDate = now.toISOString().split('T')[0];
    const reviewDateOnly = reviewTime.toISOString().split('T')[0];

    if (nowDate !== reviewDateOnly) {
        // 날짜가 다르면 날짜 형식 반환
        return reviewTime.toLocaleDateString();
    } else {
        // 같은 날짜라면 시간 차 계산
        const diffInMs = now - reviewTime;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else {
            return `${diffInHours}시간 전`;
        }
    }
};

const toggleComments = () => {
    props.review.showComments = !props.review.showComments;
};



// 댓글 추가
const addComment = () => {
    if (!isLogin.value) {
        alert("댓글을 작성하려면 로그인이 필요합니다.");
        redirectToLogin();
        return;
    }

    if (newComment.value.trim()) {
        const currentTimestamp = new Date().toISOString();
        console.log("user: ", userStore.user);
        const commentData = {
            articleId: articleId.value, // 게시글 ID
            memberId: userStore.user.id, // 작성자 ID
            nickname: userStore.user.nickname, // 작성자 닉네임
            content: newComment.value.trim(), // 댓글 내용
            createdAt: currentTimestamp, // 생성 시간
            modifiedAt: currentTimestamp, // 수정 시간
        };

        createComment(articleId.value, commentData)
            .then((res) => {
                // 댓글 추가 성공 시 comments 배열 업데이트
                console.log("댓글 추가 성공", res.data.comment);
                comments.value.push(res.data.comment);
                newComment.value = ""; // 입력 필드 초기화
            })
            .catch((err) => {
                console.error("댓글 추가 중 오류 발생:", err);
                alert("댓글 추가에 실패했습니다.");
            });
    }
};


// 로그인 페이지로 이동
const redirectToLogin = () => {
    router.push({ name: "login" });
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
    font-size: 1.3rem;
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
    padding: 16px;
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

</style>
