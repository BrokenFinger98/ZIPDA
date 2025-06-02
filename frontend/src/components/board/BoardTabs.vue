<template>
    <div>
        <!-- 탭 UI -->
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link class="nav-link" :class="{ active: $route.name.startsWith('notice') }"
                    to="/board/notice/list">
                    공지사항
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :class="{ active: $route.name.startsWith('qna') }" to="/board/qna/list">
                    QnA
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script setup>
/* BoardTabs는 탭 UI와 콘텐츠 영역을 관리합니다 */
</script>

<style scoped>
.nav-link {
    color: #343a40;
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.3s ease;
}

.nav-tabs .nav-link.active {
    font-weight: bold;
    border-bottom: 2px solid #007bff;
}

.tab-content {
    padding: 1rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-top: none;
}
</style>
