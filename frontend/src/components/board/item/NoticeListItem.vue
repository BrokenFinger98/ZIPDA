<script setup>
const props = defineProps({ article: Object });

console.log('notice article',props.article)

</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.noticeId }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'notice-detail', params: { articleno: article.noticeId } }"
        class="article-title link-dark"
      >
        {{ article.title }}
      </router-link>
    </td>
     <td class="created-at">{{ article.createdAt }}</td>
    
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
