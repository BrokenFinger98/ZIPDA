<script setup>
import NoticeFormItem from "./item/NoticeFormItem.vue";
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h3 class="my-2 pb-4 text-center title">
          <span class="fw-bold">글 쓰기</span>
        </h3>
      </div>
      <div class="col-lg-10 text-start">
        <NoticeFormItem type="regist" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #1b3b7a;
}
</style>
