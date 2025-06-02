<template>
    <div class="apartment-result">
        <div class="tab-header"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-1 mt-1" /> 검색 결과 ({{
            apartments.length || 0 }})</div>
        <div class="apartment-list">
            <v-list>
                <ApartmentItem v-for="(apartment, index) in apartments" :key="index" :apartment="apartment" />
                <!-- <ApartmentItem v-for="(apartment, index) in apartments" :key="index" :apartment="apartment"
                    @apartment-selected="handleApartmentSelected" /> -->
            </v-list>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useHouseStore } from "@/stores/house";
import ApartmentItem from "@/components/apt/ApartmentItem.vue";

// Pinia Store & Router
const houseStore = useHouseStore();
const router = useRouter();

// Computed States
const apartments = computed(() => houseStore.sortedHouses);
// const isNow = computed(() => houseStore.isNow);

// Functions
const setIsNow = (value) => {
    houseStore.setIsNow(value);
};

const handleApartmentSelected = (house) => {
    // houseStore.selectApartment(apartment);
    router.push({ name: "house-detail", params: { id: house.houseId } });
};

// Sorting Options
const sortOptions = [
    { label: "최신 순", value: "latest" },
    // { label: "오래된 순", value: "oldest" },
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
    /* scrollbar-width: none; */
}

.list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.tab-header {
    font-size: 1.1rem;
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
</style>
