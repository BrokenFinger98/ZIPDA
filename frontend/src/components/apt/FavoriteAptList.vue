<template>
    <div class="apartment-result">
        <div class="tab-header"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-1 mt-1" /> 관심 아파트 ({{
            houseInfos.length || 0 }})</div>
        <div class="apartment-list">
            <v-row dense>
                <!-- <v-col
                    v-for="houseInfo in houseInfos"
                    :key="houseInfo.houseId"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                > -->
                <v-col
                    v-for="houseInfo in houseInfos"
                    :key="houseInfo.houseId"
                    cols="10"
                >
                    <v-card elevation="2" class="hover-card">
                    <v-img :src="houseInfo.imageUrl[0] || aptImage" height="200px"></v-img>

                    <v-card-title
                        class="text-h4 d-flex justify-space-between align-center text-h6"
                        ><strong>{{ houseInfo.name }}</strong>
                        <v-btn
                        icon
                        @click="toggleLike(houseInfo)"
                        variant="text"
                        color="red"
                        size="x-large"
                        :class="{ liked: houseInfo.likedStatus }"
                        >
                        <v-icon size="x-large">
                            {{ houseInfo.likeStatus ? "mdi-heart" : "mdi-heart-outline" }}
                        </v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-subtitle class="text-subtitle">
                        <p class="address">
                        <font-awesome-icon :icon="['fas', 'location-dot']"></font-awesome-icon>
                        {{ houseInfo.region.sido }}
                        {{ houseInfo.region.gugun }} {{ houseInfo.region.dong }} {{ houseInfo.jibun }}
                        </p>
                    </v-card-subtitle>
                    <v-card-text>
                        <div>건축 연도: {{ houseInfo.buildYear }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary" @click="showDetails(houseInfo)">
                            <font-awesome-icon :icon="['fas', 'info-circle']" class="mr-1" /> 아파트 정보
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useHouseStore } from "@/stores/house";
import { getLikeHouses } from "@/api/user"
import { createHouseLike, deleteHouseLike } from "@/api/houses";
import aptImage from "@/assets/default-apt-img.jpg";
import Swal from "sweetalert2";
import ApartmentItem from "@/components/apt/ApartmentItem.vue";

// Pinia Store & Router
const houseStore = useHouseStore();
const router = useRouter();


// const houseInfos = ref([]);
const houseInfos = ref([
  {
    houseId: 7183,
    imageUrl: [],
    name: "삼익대청아파트",
    road: "서울특별시 강남구 도산대로",
    region: { sido: "서울특별시", gugun: "강남구", dong: "개포동" },
    jibun: "12",
    buildYear: 1992,
    recentPrice: "12억",
    likedStatus: true,
  },
  {
    houseId: 7322,
    imageUrl: ["https://via.placeholder.com/200x200?text=Apartment2"],
    name: "개포우성3차",
    road: "서울특별시 강남구 개포동 652",
    region: { sido: "서울특별시", gugun: "강남구", dong: "개포동" },
    jibun: "456-78",
    buildYear: 1984,
    recentPrice: "15억",
    likedStatus: false,
  },
  {
    houseId: 7335,
    imageUrl: ["https://via.placeholder.com/200x200?text=Apartment3"],
    name: "그린빌리지",
    road: "서울특별시 송파구 올림픽로",
    region: { sido: "서울특별시", gugun: "강남구", dong: "개포동" },
    jibun: "1167",
    buildYear: 1996,
    recentPrice: "18억",
    likedStatus: true,
  },
]);


onMounted(() => {
    // Get liked houses
    
    // getLikeHouses().then((res) => {
    //     console.log(res.data);
    //     houseInfos.value = res.data.likeHouses.map((house) => ({
    //         ...house,
    //         likeStatus: true,}
    //     ));
    // });
    
});

const showDetails = (house) => {
    console.log("showDetails", house);
    router.push({ name: "house-detail", params: { id: house.houseId } });
};

const handleApartmentSelected = (house) => {
    router.push({ name: "house-detail", params: { id: house.houseId } });
};

// Sorting Options
const sortOptions = [
    { label: "최신 순", value: "latest" },
    { label: "좋아요 순", value: "favorites" },
];

const toggleLike = (houseInfo) => {
    houseInfo.likedStatus = !houseInfo.likedStatus
    if (houseInfo.likeStatus) {
        createHouseLike(houseInfo.houseId)
    } else {
        deleteHouseLike(houseInfo.houseId);
    }
};

</script>

<style scoped>
.apartment-result {
    border-radius: 8px;
    max-height: 92vh;
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
