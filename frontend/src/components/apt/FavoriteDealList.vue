<template>
    <div class="apartment-result">
        <div class="tab-header"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-1 mt-1" /> 관심 아파트 ({{
            houseDeals.length || 0 }})</div>
        <div class="apartment-list">
            <v-list>
                <ApartmentItem v-for="(houseDeal, index) in houseDeals" :key="index" :houseDeal="houseDeal"
                    @deal-selected="handleApartmentSelected" />
            </v-list>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useHouseStore } from "@/stores/house";
import { getLikeDeals } from "@/api/user"
import ApartmentItem from "@/components/apt/ApartmentItem.vue";

// Pinia Store & Router
const houseStore = useHouseStore();
const router = useRouter();


const houseDeals = ref([]);

onMounted(() => {
    // Get liked houses
    
    getLikeDeals().then((res) => {
        console.log(res.data);
        houseDeals.value = res.data.likeDeals;
    });
});

const handleApartmentSelected = (house) => {
    router.push({ name: "house-detail", params: { id: house.houseId } });
};

// Sorting Options
const sortOptions = [
    { label: "최신 순", value: "latest" },
    { label: "좋아요 순", value: "favorites" },
];

const setSortCondition = (option) => {
    houseStore.setSortCondition(option.value);
};
</script>

<style scoped>
.apartment-result {
    border-radius: 8px;
    max-height: 82vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    
}

.list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.tab-header {
    font-size: 1.3rem;
    font-weight: bold;
    margin-left: 7px;
    margin-bottom: 16px;
    color: var(--color-main-theme)
}

.btn-container {
    display: flex;
    gap: 0.5rem;
}

.list-num {
    margin-bottom: 1rem;
    color: #555;
}

.apartment-list {
    max-height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
}

.btn-basic {
    background: #e9ecf3;
    color: #1b3b7a;
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

.btn-selected {
    background: #1b3b7a;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

.tab-content {
    background: white;
    border-radius: 8px;
    padding: 16px;
    /* 다른 높이 규칙 제거 */
    overflow-y: auto;
    scrollbar-width: none;
}
.apartment-result {
    background: white;
    border-radius: 8px;
    padding: 16px;
    height: 100%;
    /* max-height: 92vh; */
    /* 다른 높이 규칙 제거 */
    overflow-y: auto;
    scrollbar-width: none;
}
</style>
