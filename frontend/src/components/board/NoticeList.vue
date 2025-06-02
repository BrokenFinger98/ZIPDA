<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";
import { getNotices } from "@/api/notice.js";

import VSelect from "@/components/common/VSelect.vue";
import NoticeListItem from "@/components/board/item/NoticeListItem.vue";
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
    getNotices().then((res) => {
        console.log("notice list", res.data.notices);
        articles.value = res.data.notices;
    })
}


const onPageChange = (val) => {
    // console.log(val + "번 페이지로 이동 준비 끝!!!");
    currentPage.value = val;
    param.value.pgno = val;
    getArticleList();
};

const moveWrite = () => {
    router.push({ name: "notice-write" });
};
</script>

<template>
    <div class="container board-list">
        <div class="row justify-content-center">
            <div class="col-lg-12 mt-2">
                <div class="row align-self-center mb-2">
                    <div class="col-md-4 text-start">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">
                            글쓰기
                        </button>
                    </div>
                    <div class="col-md-12">
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
                             <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <NoticeListItem v-for="article in articles" :key="article.noticeId" :article="article">
                        </NoticeListItem>
                    </tbody>
                </table>
            </div>
            <v-pagination class="pagination" :current-page="currentPage" :total-page="totalPage" @pageChange="onPageChange"></v-pagination>
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
