<template>
    <div class="filter-buttons">
        <div class="d-flex justify-space-between mx-1">
            <div class="d-flex filters mt-1">
                <FavRegionFilter ref="favRegionFilter" />
                <AptTypeFilter ref="aptTypeFilter" />

                <v-btn icon variant="text" color="var(--vt-c-navy)" class="reset-btn" @click="resetFilters">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </div>
            <!-- <div class="header-buttons">
                <span class="favorite-icon" @click="toggleFavorite" :class="{ active: favClicked }">
                    <font-awesome-icon :icon="['fas', 'heart-circle-check']" />
                </span>

            </div> -->
        </div>

    </div>

</template>

<script>
import AptTypeFilter from '@/components/filter/AptTypeFilter.vue';
import FavRegionFilter from '@/components/filter/FavRegionFilter.vue';

export default {
    components: {
        AptTypeFilter,
        FavRegionFilter,
    },
    data() {
        return {
            regionFilters: {
                city: { label: "시도", options: ["서울특별시", "경기도", "부산광역시"] },
                district: { label: "시군구", options: ["강남구", "송파구", "서초구"] },
                neighborhood: { label: "읍면동", options: ["잠실동", "신천동", "삼전동"] },
            },
            selectedFilters: {
                city: '',
                district: '',
                neighborhood: '',
            },
            aptFilters: {
                apartment: { label: "아파트명", options: ["롯데캐슬아파트", "래미안아파트", "자이아파트"] },
            },
            selectedAptFilters: {
                city: '',
                district: '',
                neighborhood: '',
                apartment: ''
            },
            favClicked: false,
        };
    },
    methods: {
        toggleFavorite() {
            this.favClicked = !this.favClicked; // 하트 상태를 반대로 토글
        },
        resetFilters() {
            this.$refs.aptTypeFilter.reset(); // AptTypeFilter 초기화
            this.$refs.favRegionFilter.reset(); // FavRegionFilter 초기화
        },
    }
};
</script>

<style scoped>

.reset-btn {
    margin-top: -0.3rem;
    margin-left: 1rem;
    font-size: 0.8rem;
}

.filters {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.filter-container {
    /* max-width: 30px; */
    position: fixed;
    /* 오른쪽 위에 고정 */
    right:0rem;
    z-index: 3;
    padding: 0.8rem;
}

.btn-fav {
    background-color: #e9ecf3;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 13px;
}

.favorite-icon {
    background-color: #ffffff;
    border-color: rgb(248, 71, 71);
    border-radius: 50px;
    padding: 4px 8px;
    font-size: 1.3rem;
    color: rgb(248, 71, 71);
    cursor: pointer;
}

.favorite-icon.active {
    /* color: rgb(248, 71, 71);
    border: rgb(248, 71, 71); */
    background-color: rgb(248, 71, 71);
    color: #ffffff;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: bold;
}

.form-label{
    font-size: 1rem;
}
.form-select {
    font-size: 1rem;
    margin: 0;
    border-radius: 1rem;
}
.region {
    justify-content: space-between;
    padding: 0.3rem;
}
.form-control {
    font-size: 0.8rem;
    width: 100%;
    padding: 0.5rem;
}

.header-buttons {
    /* 오른쪽 위에 정렬 + 버튼들 세로로 나열 */
    display: flex;
    justify-content: flex-end;
    padding: 0.3rem;
}
.header-buttons .btn {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin-left: 0.25rem;
    border-radius: 1rem;
    background-color: #ffffff;
}

.v-btn {
    margin-left: 0;
}

</style>
