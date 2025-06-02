<template>
    <div class="header-container d-flex align-items-center" @click="goHome()">
        <div class="logo-placeholder">
            <img class="logo" src="@/assets/finger.png" alt="">
        </div>
        <span class="logo-title fw-bold">ZIP:DA <small class="fw-bold" style="font-size:0.75rem">집다</small></span>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.replace({name: 'home' });
}

</script>

<style scoped>
.header-container {
    background-color: #f7f9fc;
    padding: 0rem 0;
    margin-bottom: 1rem;
}

.logo-placeholder {
    padding: 0 0.2rem;
    height: 4vh;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* font-size: 1rem; */
    
    /* color: #ffffff; */
}

.logo {
    width: 100%;
    height: 100%;
    /* object-fit: contain; */
}

.logo-title {
    color: #E73C3C;
}


</style>
