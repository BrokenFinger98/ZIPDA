<template>
    <div class="apt-result-list">

        <!-- Tab Content -->
        <div class="tab-content-0">
            <div v-if="activeTab === 0" class="tab">
                <AptList :apartments="filteredHouses" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Components for each tab
import AptList from "@/components/apt/AptList.vue";
import FavoriteAptList from "@/components/apt/FavoriteAptList.vue";


// Tabs configuration
const tabs = [
  { label: "검색된 아파트" },
//   { label: "관심 아파트" },
//   { label: "관심 매물" },
];

const activeTab = ref(0); // Default tab is the first one

// Store and data setup
import { useRouter } from "vue-router";
import { useHouseStore } from "@/stores/house";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const houseStore = useHouseStore();
const userStore = useUserStore();

// Houses data from store
const houses = computed(() => houseStore.sortedHouses);
const filteredHouses = computed(() => {
  return houses.value.filter((house) => house.price); // Example filter
});

const filteredHousesCount = computed(() => filteredHouses.value.length);
console.log('cnt',filteredHousesCount.value);

// const selectedDeal = computed(() => houseStore.selectedHouse);
// const isFavorited = computed(() => userStore.isFavorited(selectedDeal.value?.id));

</script>

<style scoped>
.apt-result-list {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}

.menu-tabs {
    /* background: white; */
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 16px;
    justify-content: center;
}

.tab {
    height: 100%;
}

.tab-content {
    background: white;
    border-radius: 8px;
    padding: 16px;
    /* 다른 높이 규칙 제거 */
    overflow-y: auto;
    scrollbar-width: none;
}
.tab-content-0 {
    background: white;
    border-radius: 8px;
    padding: 16px;
    height: 100%;
    /* max-height: 92vh; */
    /* 다른 높이 규칙 제거 */
    overflow-y: auto;
    scrollbar-width: none;
}

.tab-header {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 16px;
}

.v-tab {
    font-size: 0.9rem;
    font-weight: bold;
    color: #424242;
    text-transform: none;
}

.apartment-result {
    max-height: 90vh;
}

.v-tabs {
    display: flex;
    justify-content: space-around;
}

.v-slide-group__content {
    justify-content: center !important;
}
</style>
