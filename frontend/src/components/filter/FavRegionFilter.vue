<template>
    <div class="dropdown">
        <v-menu close-on-content-click offset-y>
            <template v-slot:activator="{ props }">
                <v-btn variant="outlined" class="fw-bold mx-1 dropdown-toggle" v-bind="props"
                    :class="{ 'selected-btn': selectedRegion, 'default-btn': !selectedRegion }">
                    {{ selectedDisplay }}
                </v-btn>
            </template>
            <!-- 로그인 상태일 때만 관심 지역 표시 -->
            <template v-if="isLoggedIn">
                <v-list v-if="favoriteRegions.length > 0">
                    <v-list-item v-for="(region, index) in favoriteRegions" :key="index" @click="selectRegion(region)">
                        <v-list-item-title>{{ region.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list v-else class="no-results">
                    관심 지역이 없습니다.
                </v-list>
            </template>
            <!-- 비로그인 상태 메시지 -->
            <template v-else>
                <v-list class="no-results">
                    로그인 후 이용 가능한 서비스입니다.
                </v-list>
            </template>
        </v-menu>
    </div>
</template>

<script setup>
import { ref, computed, defineExpose } from "vue";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";

const userStore = useUserStore();
// const authStore = useAuthStore();

// 로그인 상태
const isLoggedIn = computed(() => userStore.isLogin);

// Store에서 관심지역 데이터 가져오기
const favoriteRegions = computed(() => userStore.favoriteRegions || []);
console.log("favoriteRegions:", favoriteRegions.value);

// 선택된 관심지역 상태
const selectedRegion = ref("");

// 선택된 관심지역 표시 텍스트
const selectedDisplay = computed(() => selectedRegion.value || "관심 지역");

// 관심지역 선택 로직
const selectRegion = (region) => {
    if (!region) return;
    if (region === "전체") {
        selectedRegion.value = "관심 지역";
    } else {
        selectedRegion.value = region.name;
    }
};

// 초기화 메서드
const reset = () => {
    selectedRegion.value = "";
};

defineExpose({
    reset,
});
</script>


<style scoped>
.dropdown-toggle {
    display: inline-flex;
    align-items: center;
    color: #1b3b7a;
    border-radius: 1.5rem;
    background-color: #ffffff;
}

.dropdown-toggle:hover {
    background-color: #1b3b7a;
    color: #ffffff;
}

.default-btn {
    border-color: lightgray;
    color: lightgray;
    font-weight: bold;
}

.selected-btn {
    border-color: #1b3b7a;
    background-color: #1b3b7a;
    color: #ffffff;
}

.v-list-item {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition: background-color 0.2s ease;
}

.v-list-item:hover {
    background-color: #e0f7fa;
}

.no-results {
    padding: 1rem;
    font-size: 0.8rem;
    text-align: center;
    color: gray;
}
</style>

