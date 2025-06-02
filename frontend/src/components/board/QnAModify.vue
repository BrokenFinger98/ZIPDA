<script setup>
import QnAFormItem from "./item/QnAFormItem.vue";
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글수정</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <QnAFormItem type="modify" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
