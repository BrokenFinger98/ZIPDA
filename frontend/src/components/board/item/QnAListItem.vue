<script setup>
import { ref, onMounted } from "vue"
import { getQuestion } from "@/api/qna"
const props = defineProps({ 
    article: {
      type: Object,
      required: true,
    },
 });

// console.log('qna article', props.article.questionId)

// const article = props.article
// console.log('article', article)



</script>

<template>
  <tr class="text-center" v-if="article && article.questionId">
    <th scope="row">{{ article.questionId }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'qna-detail', params: { articleno: article.questionId } }"
        class="article-title link-dark"
      >
        {{ article.title }}
      </router-link>
    </td>
    <td>{{ article.nickname }}</td>
    <!-- <td class="created-at">{{ article.createdAt }}</td> -->
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}

.article-title {
  font-weight: 700;
}

.created-at {
  color: #888;
}
</style>
