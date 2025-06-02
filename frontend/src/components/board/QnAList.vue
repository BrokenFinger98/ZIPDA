<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board";
import { getQuestions } from "@/api/qna";

import VSelect from "@/components/common/VSelect.vue";
import QnAListItem from "@/components/board/item/QnAListItem.vue";
import VPageNavigation from "@/components/common/VPageNavigation.vue";

const router = useRouter();

const selectOption = ref([
    { text: "검색조건", value: "" },
    { text: "글번호", value: "article_no" },
    { text: "제목", value: "subject" },
    { text: "작성자아이디", value: "user_id" },
]);

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
    pgno: currentPage.value,
    spp: VITE_ARTICLE_LIST_SIZE,
    key: "",
    word: "",
});

onMounted(() => {
    getArticleList();
});

const changeKey = (val) => {
    console.log("BoarList에서 선택한 조건 : " + val);
    param.value.key = val;
};

const getArticleList = () => {
    getQuestions().then((res) => {
        console.log("qna -- ",res.data.questions);
        articles.value = res.data.questions;
    });

};

const onPageChange = (val) => {
    currentPage.value = val;
    param.value.pgno = val;
    getArticleList();
};

const moveWrite = () => {
    router.push({ name: "qna-write" });
};
</script>

<template>
    <div class="container board-list">
        <div class="row justify-content-center">
            <!-- <div class="">
                <h3 class="my-2 pb-4 text-center title">
                    <span class="fw-bold"><font-awesome-icon :icon="['fas', 'circle-question']" /> QnA</span>
                </h3>
            </div> -->
            <div class="col-lg-12 mt-2">
                <div class="row align-self-center mb-2">
                    <div class="col-md-4 text-start">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">
                            글쓰기
                        </button>
                    </div>
                    <div class="col-md-8">
                        <form class="d-flex">
                            <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
                            <div class="input-group input-group-sm ms-1">
                                <input type="text" class="form-control" v-model="param.word" placeholder="검색어..." />
                                <button class="btn btn-dark " type="button" @click="getArticleList">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <QnAListItem v-for="article in articles" :key="article.questionId" :article="article">
                        </QnAListItem>
                    </tbody>
                </table>
            </div>
            <v-pagination class="pagination" :current-page="currentPage" :total-page="totalPage"
                @pageChange="onPageChange"></v-pagination>
        </div>
    </div>
</template>

<style scoped>
.title {
    color: #1b3b7a;
}
.btn-dark {
    color: #ffffff;
}

th {
    background-color: var(--vt-c-navy-20);
    color: #333;
    font-weight: bold;
    text-align: center;
    padding: 10px;
}
</style>
