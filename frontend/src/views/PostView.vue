<template>
  <v-container class="my-posts-page">
    <v-row>
      <v-col cols="12" md="4" v-for="post in posts" :key="post.id">
        <v-card class="post-card">
          <v-img
            :src="post.image || defaultImage"
            class="post-image"
            alt="Post Image"
          ></v-img>
          <v-card-title class="post-title">{{ post.title }}</v-card-title>
          <v-card-subtitle class="post-apartment">
            <font-awesome-icon icon="fa-solid fa-building" class="mr-2" />
            {{ post.apartment.name }} - {{ post.apartment.location }}
          </v-card-subtitle>
          <v-card-text class="post-content">
            {{ post.content }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editPost(post.id)">수정</v-btn>
            <v-btn color="error" @click="deletePost(post.id)">삭제</v-btn>
          </v-card-actions>
          <v-footer class="post-footer">
            <small>작성일: {{ formatDate(post.createdAt) }}</small>
          </v-footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMyPosts, deletePostById } from "@/api/posts"; // API 함수 호출
import { useRouter } from "vue-router";

const posts = ref([]); // 사용자의 글 데이터
const defaultImage = "@/assets/default-post-image.jpg"; // 기본 이미지 경로
const router = useRouter();

// 페이지 로드 시 데이터 가져오기
onMounted(async () => {
  try {
    posts.value = await getMyPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});

// 날짜 포맷 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 수정 기능
const editPost = (id) => {
  router.push({ name: "edit-post", params: { id } }); // 수정 페이지로 이동
};

// 삭제 기능
const deletePost = async (id) => {
  try {
    await deletePostById(id); // 서버에서 삭제
    posts.value = posts.value.filter((post) => post.id !== id); // UI에서 삭제
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
</script>


<style scoped>
.my-posts-page {
  max-width: 1200px;
  margin: auto;
}

.post-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.post-image {
  height: 150px;
  object-fit: cover;
}

.post-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.post-apartment {
  font-size: 0.9rem;
  color: #555;
}

.post-content {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

.post-footer {
  text-align: right;
  color: #999;
}
</style>
