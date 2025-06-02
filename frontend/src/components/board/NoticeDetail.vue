<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle } from "@/api/board";
import { getNoticeById } from "@/api/notice";

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;

const article = ref({});

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  getNoticeById(articleno).then((res) => {
    console.log("notice", res.data);
    article.value = res.data;
  });
}


function moveList() {
  router.push({ name: "notice-list" });
}

function moveModify() {
  router.push({ name: "notice-modify", params: { articleno } });
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  // console.log(articleno + "번글 삭제하러 가자!!!");
  deleteArticle(
    articleno,
    (response) => {
      if (response.status == 200) moveList();
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10 text-start">
        <div class="row my-3">
          <h2 class="px-5 fw-bold">{{ article.title }}</h2>
        </div>
        
        <div class="row">
          <div class="mb-2">
            <div class="d-flex justify-space-between">
              <div class="d-flex">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
                <p class="m-0">
                  <span class="writer">{{ article.writer }}</span> <br />
                  <span class="create-date fw-light">
                    {{ article.createdAt }}
                  </span>
                </p>
              </div>
              <!-- <div class="col-md-4 align-self-center text-end"><font-awesome-icon :icon="['far', 'comment']" /> 17</div> -->
            </div>
            
          </div>
          <v-divider></v-divider>
          
          <div class="text-secondary mt-4">
            {{ article.content }}
          </div>
          
        </div>
      </div>
      <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
}

.writer {
  font-weight: 600;
}

.create-date {
  font-size: 0.8rem;
  color: #999;
}
</style>



 