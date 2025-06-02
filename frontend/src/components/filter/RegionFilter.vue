<template>
    <!-- 검색창 -->
    <v-text-field
        v-model="searchQuery"
        label="관심지역 검색"
        placeholder="관심지역 주소로 검색하세요"
        hint="시도/시군구/읍면동/도로명 단위로 검색하세요. 예) 강남, 광주 서구, 미금로201"
        color="white"
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-map-marker"
        append-inner-icon="mdi-magnify"
        rounded="pill"
        @keyup.enter="emitSearchQuery"
        class="px-2 search-region"
    ></v-text-field>

</template>

<script setup>
import { ref } from "vue";
// 부모 컴포넌트로 값을 전달하기 위한 emit 정의
const emit = defineEmits(["updateSearchQuery"]);

const searchQuery = ref("");

// 입력값 변경 시 검색어를 부모로 전달
const emitSearchQuery = () => {
    console.log("검색어:", searchQuery.value);
    // 원하는 로직을 추가하거나, emit으로 부모 컴포넌트에 값을 전달
    emit("updateSearchQuery", searchQuery.value);
};
</script>


<style scoped>
.search-region {
    width: 400px;
}
</style>



<!-- <template>
    <v-container>
        <v-card class="search-card">

            <v-text-field v-model="searchQuery" label="지역 검색" placeholder="지역 이름을 입력하세요" outlined clearable
                prepend-inner-icon="mdi-magnify" @input="filterRegions"></v-text-field>


            <v-list v-if="filteredRegions.length">
                <v-list-item v-for="(region, index) in filteredRegions" :key="index" @click="selectRegion(region)">
                    <v-list-item-title>{{ region }}</v-list-item-title>
                </v-list-item>
            </v-list>


            <div v-else class="no-results">
                검색 결과가 없습니다.
            </div>
        </v-card>


        <v-card v-if="selectedRegion" class="selected-region-card">
            <v-card-title>선택한 지역</v-card-title>
            <v-card-text>{{ selectedRegion }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from "vue";

const regions = ref([

]);

const searchQuery = ref("");
const filteredRegions = ref([...regions.value]); // 검색 결과
const selectedRegion = ref(null);

// 검색 필터 함수
const filterRegions = () => {
    if (searchQuery.value.trim() === "") {
        filteredRegions.value = [...regions.value]; // 초기화
    } else {
        filteredRegions.value = regions.value.filter((region) =>
            region.includes(searchQuery.value.trim())
        );
    }
};

// 지역 선택
const selectRegion = (region) => {
    selectedRegion.value = region; // 선택된 지역 업데이트
    searchQuery.value = ""; // 검색창 초기화
    filteredRegions.value = [...regions.value]; // 결과 초기화
};
</script>

<style scoped>
.search-card {
    max-width: 400px;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-results {
    text-align: center;
    color: #999;
    margin-top: 1rem;
}

.selected-region-card {
    max-width: 400px;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f1f1f1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> -->


<!-- <template>
    <div class="d-flex flex-wrap region">
        <div v-for="(filter, key) in regionFilters" :key="key" class="mx-1">
            <v-menu close-on-content-click offset-y absolute>
                <template v-slot:activator="{ props }">
                    <v-btn variant="outlined" class="fw-bold mx-1 dropdown-toggle" v-bind="props"
                        :class="{ 'selected-btn': selectedFilters[key], 'default-btn': !selectedFilters[key] }">
                        {{ selectedFilters[key] || filter.label }}
                    </v-btn>
                </template>

                <v-list class="dropdown-menu">
                    <v-list-item v-for="option in filter.options" :key="option" @click="selectOption(key, option)"
                        class="dropdown-item">
                        <v-list-item-title>{{ option }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            regionFilters: {
                city: { label: "시도", options: ["서울특별시", "경기도", "부산광역시", "대전광역시", "광주광역시", "대구광역시"] },
                district: { label: "시군구", options: ["강남구", "송파구", "서초구", "은평구", "마포구", "성북구"] },
                neighborhood: { label: "읍면동", options: ["잠실동", "신천동", "삼전동", "논현동", "역삼동", "청담동"] },
            },
            selectedFilters: {
                city: "",
                district: "",
                neighborhood: "",
            },
        };
    },
    methods: {
        selectOption(key, option) {
            this.selectedFilters[key] = option;
        },
    },
};
</script>

<style scoped>
.region {
    overflow: visible;
    /* 부모 컨테이너의 overflow 문제 해결 */
}

.dropdown-toggle {
    display: inline-flex;
    align-items: center;
    color: #1b3b7a;
    border-radius: 1.5rem;
    background-color: #ffffff;
    transition: background-color 0.2s ease, color 0.2s ease;
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
    font-weight: bold;
    color: #ffffff;
}

.dropdown-menu {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    padding: 0.5rem;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-height: 300px;
    min-height: 200px;
    overflow-y: auto;
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition: background-color 0.2s ease;
}

.dropdown-item:hover {
    background-color: #e0f7fa;
}

.v-list-item-title {
    font-size: 1rem;
}
</style> -->
