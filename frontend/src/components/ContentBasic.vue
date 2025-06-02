<!-- src/components/ContentWithoutMap.vue -->
<template>
    <div class="content-container">
        <div class="basic">
            <Header />
            <div class="scroll d-flex justify-center">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "./Header.vue";

export default {
    components: {
        Header,
    },
};
</script>

<style scoped>
.content-container {
    display: flex;
    width: 100%;
    background-color: #f7f9fc;
}

.basic {
    z-index: 10;
    width: 100%;
    max-height: 100vh;
    padding: 1rem;
    background-color: #f7f9fc;
    overflow-y: hidden;
}

.scroll {
    height: calc(96vh);
    overflow-y: auto;
    width: calc(100vw-60px);
}
</style>
