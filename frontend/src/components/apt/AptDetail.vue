<template>
    <div class="deal-result">
        <!-- AptSummary -->
        <!-- <div class="detail-container text-center">
        </div> -->
        <div class="detail-container text-center">
            <img src="@/assets/default-apt-img.jpg" width="100%" class="mb-4" />

            <!-- 제목과 아이콘 -->
            <div class="header-container">

                <!-- 즐겨찾기 버튼 -->
                <!-- <div class="star-icon px-1" :class="{ active: isFavorited }" @click="toggleFavorite"> -->
                <div class="star-icon px-1 active" @click="toggleFavorite">
                    <font-awesome-icon :icon="['fas', 'star']" />
                </div>

                <!-- 뒤로 가기 -->
                <div class="back-icon px-1" @click="goHome">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </div>


                <h4 class="fw-bold mb-1">{{ houseInfo.name }}</h4>


                <!-- 리뷰 팝업 -->
                <div class="header-container">
                    <div class="comment-icon" @click="toggleReviews">
                        <font-awesome-icon :icon="['fas', 'comments']" />
                    </div>
                </div>

            </div>

            <p class="loc-info">
                <font-awesome-icon :icon="['fas', 'location-dot']" /> 
                {{ houseInfo.address }}
            </p>

            <div class="apt-info">
                <small>준공연도: {{ houseInfo.buildYear }}년</small> &nbsp; <small>선릉역 도보 10분</small>
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
                        <AptAvgDealItem
                            :avgDeal="avgDeal"
                            v-for="avgDeal in avgDeals"
                            v-if="avgDeals"
                            :key="avgDeal.id"
                        ></AptAvgDealItem>
                        <tr v-else>
                            <td colspan="3" class="text-center">데이터를 준비중입니다.</td>
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
                <font-awesome-icon :icon="['fas', 'caret-down']" /> 총 {{ isNow? houseDeals.length : housePastDeals.length }} 개의 결과가 있습니다
            </p>
            <div class="deal-list p-2">
                <v-list v-if="!isNow">
                    <!-- <v-list-item>
                        <AptChart :chartData="chartData" />
                    </v-list-item> -->
                    <DealItem v-for="(deal, index) in housePastDeals" :key="index" :dealItem="deal"
                        @deal-selected="handleDealSelected" class="mb-3" />
                </v-list>
                <v-list v-else>
                    <DealItem v-for="(deal, index) in houseDeals" :key="index" 
                        :dealItem="deal" :houseName="houseInfo.name"
                        @deal-selected="handleDealSelected" class="mb-3" />
                </v-list>
            </div>
        </div>
    </div>
</template>

<script setup>
import DealItem from "./DealItem.vue";
import AptChart from "@/components/apt/AptChart.vue";
import AptAvgDealItem from "@/components/apt/AptAvgDealItem.vue";
import { ref, computed, watch, onMounted, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHouseStore } from "@/stores/house";
import { useUserStore } from "@/stores/user";
import { getHouse } from "@/api/houses";
import { getAvgDealByHouse } from "@/api/deals";
import { getDealByHouse } from "@/api/deals";

const router = useRouter();
const route = useRoute();
const houseStore = useHouseStore();
const userStore = useUserStore();

const houseInfo = ref({});
const houseDeals = ref([]);
const housePastDeals = ref([]);
const avgDeals = ref([]);

const chartData = ref([]);





let houseId = route.params.id;

onMounted(() => {
    watch(
        () => route.params.id,
        (newHouseId) => {
            houseId = newHouseId;
            loadHouse()
            loadDeal()
        },
        { immediate: true }
    ),
    // `housePastDeals`가 변경되면 차트 데이터를 갱신
    watch(
        housePastDeals,
        (newDeals) => {
            chartData.value = newDeals.map((deal) => ({
                date: deal.dealDate.split(' ')[0], // 날짜 정보
                price: deal.price, // 가격 정보
            }));
        },
        { immediate: true }
    );
})


function loadHouse() {
    getHouse(houseId).then((res) => {
        console.log("houseInfo", res.data);
        houseInfo.value = res.data
        houseInfo.value.address = Object.values(houseInfo.value.region).join(' ') + ' ' + houseInfo.value.jibun
    })
}

const imageUrl = computed(() =>
    houseInfo.value?.imageUrl[0] || new URL('@/assets/default-apt-img.jpg', import.meta.url).href
);


function loadDeal() {
    getAvgDealByHouse(houseId).then((res) => {
        avgDeals.value = res.data.averageResponses.sort(
        (a, b) => a.exclusiveArea - b.exclusiveArea
        )
        avgDeals.value = avgDeals.value.map((a) => {
        const area = a.exclusiveArea
        const avgPrice = a.typeAndPrice[0].averagePrice
        return { area, avgPrice }
        })
    })
    getDealByHouse(houseId).then((res) => {
        houseDeals.value = res.data.deals.filter((deal) => deal.status != 'COMPLETED')
        housePastDeals.value = res.data.deals.filter((deal) => deal.status == 'COMPLETED')
        console.log("houseDeals", houseDeals);
        console.log("housePastDeals", housePastDeals);
    })
}


const isNow = computed(() => houseStore.isNow);

const setIsNow = (value) => {
    houseStore.setIsNow(value);
};

const handleDealSelected = (deal) => {
    console.log("Deal selected:", deal);
    router.push({ name: "deal-detail", params: { id: deal.dealId } });
};

const sortOptions = [
    { label: "최신 순", value: "latest" },
    { label: "좋아요 순", value: "favorites" },
];

const setSortCondition = (option) => {
    houseStore.setSortCondition(option.value);
};

// const toggleFavorite = () => {
//     if (isFavorited.value) {
//         userStore.removeFavorite(selectedApartment.value?.id);
//     } else {
//         userStore.addFavorite(selectedApartment.value?.id);
//     }
// };

const goBack = () => {
    router.back();
};

const goHome = () => {
    router.push('/')
//     router.push('/').then(() => {
//     window.location.reload(); // 새로고침
// });
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
    color: #273442;
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
    position: absolute;
    right: 1rem;
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

img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

th {
    font-weight: 700;
}

table {
    font-size: 13px;
}

.detail-container th {
    font-weight: 700;
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

.star-icon.active {
    color: rgb(255, 246, 85);
    /* 즐겨찾기 활성화 상태 */
    transform: scale(1.1);
    /* 활성 상태에서의 효과 */
}

.loc-info {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
    color: #8e8e8e;
}

.apt-info small {
    font-weight: 500;
    color: #8e8e8e
}
</style>
