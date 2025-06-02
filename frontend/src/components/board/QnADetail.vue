<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle } from "@/api/board";
import { getQuestion } from "@/api/qna";

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const questionId = route.params.articleno;
console.log("questionId: ", questionId);

const article = ref({});

onMounted(() => {
  getQuestion(questionId).then((res) => {
    console.log(">> qna", res.data);
    article.value = res.data;
  });
});


function moveList() {
  router.push({ name: "qna-list" });
}

function moveModify() {
  router.push({ name: "qna-modify", params: { questionId } });
}

function onDeleteArticle() {

  deleteArticle(
    questionId,
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
                  <span class="writer">{{ article.nickname }}</span> <br />
                  <span class="create-date fw-light">
                    {{ article.createdAt }}
                  </span>
                </p>
              </div>
              <!-- <div class="col-md-4 align-self-center text-end"><font-awesome-icon :icon="['far', 'comment']" /> 17</div> -->
            </div>
            
          </div>
          <v-divider></v-divider>
          
          <div class="mt-4 mb-4">
            {{ article.content }}
          </div>


          <div class="my-4 answer-container">
            <div class="d-flex mb-3">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
                <p class="m-0">
                  <span class="writer">관리자</span> <br />
                  <span class="create-date fw-light">
                    {{ article.createdAt }}
                  </span>
                </p>
            </div>
            {{ article.answer }}
          </div>
          
        </div>
      </div>
      <div>
        
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

.answer-container {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;

}

.writer {
  font-weight: 600;
}

.create-date {
  font-size: 0.8rem;
  color: #999;
}
</style>



 