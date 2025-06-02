<template>
    <div class="deal-result">
        <!-- AptSummary -->
        <!-- <div class="detail-container text-center">
        </div> -->
        <div class="detail-container text-center">
            <img src="@/assets/apt_profile_ex.png" width="100%" class="mb-4" />

            <!-- 제목과 아이콘 -->
            <div class="header-container">

                <!-- 즐겨찾기 버튼 -->
                <!-- <div class="star-icon px-1" :class="{ active: isFavorited }" @click="toggleFavorite"> -->
                <div class="star-icon px-1 active" @click="toggleFavorite">
                    <!-- <font-awesome-icon :icon="['fas', 'star']" /> -->
                </div>

                <!-- 뒤로 가기 -->
                <div class="back-icon px-1" @click="goBack">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </div>


                <h4 class="fw-bold mb-1">{{ apartment.name }}</h4>


                <!-- 리뷰 팝업 -->
                <div class="header-container">
                    <div class="comment-icon" @click="toggleReviews">
                        <!-- <font-awesome-icon :icon="['fas', 'comments']" /> -->
                    </div>
                </div>

            </div>

            <div>
                <small>준공연도: {{ apartment.buildYear }}</small> &nbsp; <small>선릉역 도보 10분</small>
            </div>
            <div class="table-responsive m-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" class="table-title">평수</th>
                            <th scope="col" class="table-title">평균 매매가</th>
                            <th scope="col" class="table-title">평균 전세가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">120</th>
                            <td>6.1억</td>
                            <td>1억</td>
                        </tr>
                        <tr>
                            <th scope="row">150</th>
                            <td>7.5억</td>
                            <td>2억</td>
                        </tr>
                        <tr>
                            <th scope="row">180</th>
                            <td>10억</td>
                            <td>3억</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- AptList -->
        <div class="list-result p-3">
            <div class="list-header">
                <div>
                    <div class="mb-3 apt-btn-container">
                        <button type="button" class="apt-btn" :class="{ 'btn-basic': !isNow, 'btn-selected': isNow }"
                            @click="setIsNow(true)">
                            거래 가능
                        </button>
                        <button type="button" class="apt-btn" :class="{ 'btn-basic': isNow, 'btn-selected': !isNow }"
                            @click="setIsNow(false)">
                            거래 완료
                        </button>
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
                        <v-list-item v-for="(option, index) in sortOptions" :key="index"
                            @click="setSortCondition(option)">
                            <v-list-item-title>{{ option.label }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <p class="fw-bold list-num">
                <!-- <font-awesome-icon :icon="['fas', 'caret-down']" /> 총 {{ deals.length }} 개의 결과가 있습니다 -->
            </p>
            <div class="deal-list p-2">
                <v-list>
                    <v-list-item v-if="!isNow">
                        <AptChart />
                    </v-list-item>
                    <!--<DealItem v-for="(deal, index) in deals" :key="index" :dealItem="deal"
                        @apartment-selected="handleDealSelected" class="mb-3" /> -->
                </v-list>
            </div>
        </div>
    </div>
</template>

<script setup>
import DealItem from "./DealItem.vue";
import AptChart from "@/components/apt/AptChart.vue";
import { ref, computed, onMounted, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHouseStore } from "@/stores/house";
import { useUserStore } from "@/stores/user";
import { getHouse } from "@/api/houses";

const router = useRouter();
const route = useRoute();
const aptStore = useHouseStore();
const userStore = useUserStore();

const apartment = ref(null);

const apartmentId = route.params.id;

onMounted(() => {
    getHouse(apartmentId).then((res) =>{
        apartment.value = res.data.house
    }).catch((err) => console.log(err))
}),


// const deals = computed(() => aptStore.sortedApartments);
// const selectedApartment = computed(() => aptStore.selectedApartment);
// const isFavorited = computed(() => userStore.isFavorited(selectedApartment.value?.id));

const isNow = computed(() => aptStore.isNow);
const reviewPopupOpen = ref(false);

const dealReviews = computed(() => {
    const selectedDeal = aptStore.selectedApartment;
    return selectedDeal?.reviews || [];
});


const setIsNow = (value) => {
    aptStore.setIsNow(value);
};

const handleDealSelected = (deal) => {
    aptStore.selectApartment(deal);
    console.log("Deal selected:", deal);
    router.push({ name: "deal-detail", params: { id: deal.id } });
};

const sortOptions = [
    { label: "최신 순", value: "latest" },
    { label: "오래된 순", value: "oldest" },
    { label: "좋아요 순", value: "favorites" },
];

const setSortCondition = (option) => {
    aptStore.setSortCondition(option.value);
};

const toggleFavorite = () => {
    if (isFavorited.value) {
        userStore.removeFavorite(selectedApartment.value?.id);
    } else {
        userStore.addFavorite(selectedApartment.value?.id);
    }
};

const goBack = () => {
    router.back();
};


const emit = defineEmits(["toggle-reviews"]);

// 리뷰 토글 요청
const toggleReviews = () => {
    console.log("toggleReviews called");
    emit("toggle-reviews");
};

</script>

<style scoped>
/* Styles from both AptSummary.vue and AptList.vue combined */
.detail-container {
    margin-bottom: 1rem;
    background-color: #ffffff;
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.detail-container img {
    border-radius: 0.5rem 0.5rem 0 0;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.list-result {
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    max-height: calc(80vh);
}

.list-num {
    font-size: 0.8rem;
    color: #3b4b5b;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
}

.deal-list {
    max-height: 50vh;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer/Edge */
}

.comment-icon {
    font-size: 1.3rem;
    margin-right: 0;
    color: var(--color-main-theme);
    cursor: pointer;
}

.back-icon {
    cursor: pointer;
    color: white;

    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
    /* 기본 색상 */
    cursor: pointer;
    transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
    font-size: 1.5rem;
    z-index: 10;
}

.btn-basic {
    background-color: #e9ecf3;
    color: #1b3b7abc;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 13px;
}

.btn-selected {
    background-color: #1b3b7a;
    color: #ffffff;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 13px;
}

.sort-btn {
    color: #1b3b7a;
    font-weight: bold;
    text-transform: capitalize;
    padding: 0.5rem 1rem;
}

.apt-btn {
    margin-right: 0.5rem;
    font-size: 0.8rem;
}

.list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: 1px solid #e9ecf3; */
}

th {
    font-weight: 600;
}

table {
    font-size: 13px;
}

.detail-container th {
    font-weight: 600;
}

.detail-containertable {
    font-size: 13px;
}

.detail-container.table-title {
    font-weight: 800;
}

h4 {
    flex: 1;
    text-align: center;
    margin: 0;
}


.star-icon {
    position: absolute;
    /* 부모 기준 위치 설정 */
    top: 1rem;
    /* 이미지 위에 표시 */
    right: 1rem;
    /* 오른쪽 상단에 고정 */
    font-size: 2rem;
    color: gray;
    /* 기본 색상 */
    cursor: pointer;
    transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
    font-size: 1.5rem;
    z-index: 10;
    /* 이미지 위로 배치 */
}

/* .star-icon.active {
    color: rgb(255, 225, 57);
    transform: scale(1.1);
} */

.star-icon.active {
    color: rgb(255, 246, 85);
    /* 즐겨찾기 활성화 상태 */
    transform: scale(1.1);
    /* 활성 상태에서의 효과 */
}
</style>
