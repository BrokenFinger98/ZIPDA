<template>
  <div class="board-container">
    <!-- 헤더 -->
    <!-- <header class="board-header mt-4">
      <h1 class="board-title">게시판</h1>
    </header> -->

    <!-- 탭 메뉴 -->
    <!-- <BoardTabs /> -->

    <!-- 탭 메뉴 -->
    <div class="tab-menu">
      <v-tabs v-model="activeTab" color="primary" class="tabs" >
        <v-tab @click="navigateTo('/board/notice/list')">
          공지사항
        </v-tab>
        <v-tab @click="navigateTo('/board/qna/list')">
          QnA
        </v-tab>
      </v-tabs>
    </div>

    <!-- 메인 콘텐츠 -->
    <main class="board-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeTab = ref(0);

// 현재 라우트에 따라 활성 탭 설정
watch(
  () => route.name,
  () => {
    if (route.name.startsWith("notice")) {
      activeTab.value = 0;
    } else if (route.name.startsWith("qna")) {
      activeTab.value = 1;
    }
  },
  { immediate: true }
);

// 라우트 변경 함수
const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* 전체 컨테이너 */
.board-container {
  /* max-width: 1200px; */
  width: 90%;
  margin: 0 auto;
  /* padding: 20px; */
  /* background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

/* 헤더 섹션 */
.board-header {
  text-align: center;
  margin-bottom: 20px;
}

.board-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-main-theme);
  margin: 30px 0 0 0;
}

.board-description {
  font-size: 1rem;
  color: #666;
}

/* 콘텐츠 섹션 */
.board-content {
  /* margin-top: 20px; */
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  height: 80vh;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tabs {
  width: 90%;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab-menu {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}

.v-tab {
  font-size: 1rem;
  font-weight: bolder;
  width: 50%;
}

</style>


<!-- <template>
  <div class="board-container">

    <header class="board-header">
      <h1>게시판</h1>
      <p>공지사항과 QnA를 한 곳에서 관리할 수 있는 공간입니다.</p>
    </header>


    <BoardTabs />


    <main class="board-content mt-3">

      <router-view />
    </main>
  </div>
</template>

<script setup>
import BoardTabs from "@/components/board/BoardTabs.vue";
</script>

<style scoped>
.board-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.board-header {
  text-align: center;
  margin-bottom: 20px;
}

.board-header h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.board-header p {
  color: #666;
  font-size: 1rem;
}

.board-content {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> -->
