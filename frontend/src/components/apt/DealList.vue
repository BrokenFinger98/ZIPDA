<template>
    <div class="apartment-result p-3">
        <div class="list-header">
            <div>
                <div class="mb-3 btn-container">
                    <button type="button" class="btn" :class="{ 'btn-basic': !isNow, 'btn-selected': isNow }"
                        @click="setIsNow(true)">거래 가능</button>
                    <button type="button" class="btn" :class="{ 'btn-basic': isNow, 'btn-selected': !isNow }"
                        @click="setIsNow(false)">거래 완료</button>
                </div>
            </div>
            <!-- 정렬 조건 드롭다운 -->
            <v-menu close-on-content-click offset-y>
                <template v-slot:activator="{ props }">
                    <v-btn variant="text" v-bind="props" class="sort-btn">
                        정렬 조건
                        <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(option, index) in sortOptions" :key="index" @click="setSortCondition(option)">
                        <v-list-item-title>{{ option.label }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <p class="fw-bold list-num">
            <font-awesome-icon :icon="['fas', 'caret-down']" /> 총 {{ apartments.length }} 개의 결과가 있습니다
        </p>
        <div class="apartment-list p-2">
            <v-list>
                <v-list-item v-if="!isNow">
                    <AptChart />
                </v-list-item>
                <DealItem v-for="(apartment, index) in apartments" :key="index" :dealItem="apartment"
                    @apartment-selected="handleApartmentSelected" class="mb-3" :to="{name:deal-detail, id:apartment.}" />
            </v-list>
        </div>
    </div>
</template>

<script setup>
import { useApartmentStore } from "@/stores/house";
import DealItem from "./DealItem.vue";
import AptChart from "@/components/apt/AptChart.vue";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const apartmentStore = useApartmentStore();
const apartments = computed(() => apartmentStore.sortedApartments); // 정렬된 아파트 목록 가져오기
const isNow = computed(() => apartmentStore.isNow); // 거래 상태

const setIsNow = (value) => {
    apartmentStore.setIsNow(value); // 거래 상태 변경
};

const handleApartmentSelected = (apartment) => {
    apartmentStore.selectApartment(apartment); // 선택된 아파트 저장
    router.push({ name: "apt-detail", params: { id: apartment.id } });
};

// 정렬 조건
const sortOptions = [
    { label: "최신 순", value: "latest" },
    { label: "오래된 순", value: "oldest" },
    { label: "좋아요 순", value: "favorites" },
];

// 정렬 조건 변경
const setSortCondition = (option) => {
    apartmentStore.setSortCondition(option.value); // Pinia store에 정렬 조건 전달
};

onMounted(() => {
    // apartmentStore.fetchApartments(); // 컴포넌트 마운트 시 아파트 데이터 로드
});
</script>

<style scoped>
h5,
h6 {
    color: #3b4b5b;
}

.list-num {
    font-size: 0.8rem;
    color: #3b4b5b;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
}

.btn-container {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.4rem;
}

.favorite-icon {
    font-size: 1.3rem;
    color: var(--color-main-theme);
    cursor: pointer;
}

.apartment-result {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    max-height: calc(80vh);
}

.apartment-list {
    max-height: 50vh;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer/Edge */
}

.apartment-list::-webkit-scrollbar {
    display: none;
}

.btn-basic {
    background-color: #e9ecf3;
    color: #1b3b7abc;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 13px;
}

.btn-basic:hover {
    background-color: #1b3b7a;
    color: #ffffff;
}

.btn-selected {
    background-color: #1b3b7a;
    color: #ffffff;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 13px;
}

.btn-selected:hover {
    background-color: #1b3b7a;
    color: #ffffff;
}

.sort-btn {
    color: #1b3b7a;
    font-weight: bold;
    text-transform: capitalize;
    padding: 0.5rem 1rem;
}
</style>

