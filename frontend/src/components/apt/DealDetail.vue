<template>
    <v-container class="apartment-detail-container">
        <v-card v-if="dealItem" class="apartment-detail-card">
            <v-card-actions class="p-0 mt-2">
                <v-btn icon density="comfortable" color="var(--color-main-theme)" @click="goBack" class="btn-back">
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </v-btn>
            </v-card-actions>
            <v-img :src="imageUrl" alt="Apartment Image" class="detail-img" />
            
            
            

            <div class="d-flex align-items-center pt-4 pb-0">
                <v-chip
                    class="ma-2"
                    color="success"
                    prepend-icon="mdi-cash"
                    size="small"
                    >
                    {{ defineSaleType(dealItem.type) }}
                </v-chip>
                <v-chip
                    class="ma-2"
                    color="orange"
                    prepend-icon="mdi-checkbox-marked-circle"
                    size="small"
                    >
                    {{ meterToPyung(dealItem.exclusiveArea) }}평
                </v-chip>     
            </div>

            <v-card-title class="d-flex fw-bold pb-0 justify-space-between" >
                
                    <p class="fw-bold">{{ koreanPrice(dealItem.price) }} 원</p>
                    <p class="favorite-icon pt-2 mb-0" style="line-height: 0.5rem;" 
                        :class="{ active: isFavorited }">
                        <font-awesome-icon @click=" toggleFavorite" :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                        <br />
                        <small style="font-size: 0.5rem;">{{ dealItem.countLike }}</small>
                    </p>
            
            </v-card-title>

            <v-card-text class="deal-info">
                <!-- <font-awesome-icon :icon="['fas', 'location-dot']" /> {{ dealItem.address }} -->
                <p></p>
                <p><strong>층수: </strong> {{ dealItem.floor }} 층</p>
                <p><strong>평수: </strong> {{ meterToPyung(dealItem.exclusiveArea) }}평</p>
                <p><strong>작성자: </strong> 
                    <span @click="viewProfile(dealItem.dealerId)" class="clickable">
                        {{ dealItem.agentNickName }}
                    </span>
                </p>
            </v-card-text>

        </v-card>

        <v-progress-circular v-else indeterminate color="primary" class="mt-5 p-4" />
    </v-container>

</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getDeal } from "@/api/deals";
import { meterToPyung, defineSaleType, koreanPrice } from "@/utils/house";
import { addFavoriteDeal } from "@/api/favorite";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

let dealId = route.params.id;
console.log(route.params.id)

const isFavorited = ref(false);
const countLike = ref(0);
const dealItem = ref(null);

const props = defineProps({
    houseName: { type: String
        , required: true 
     },
});


console.log("houseName", props.houseName);

// 로딩 후 데이터 없을 시 방어 처리
onMounted(() => {
    getDeal(dealId).then((res)=>{
        dealItem.value = res.data
        console.log("get Deal: ", dealItem.value)
        console.log(dealItem.value?.imageUrl)
    })
});

// const imageUrl = computed(() =>
//     dealItem.value?.imageUrl[0] || aptImg
// );

const imageUrl = computed(() =>
    dealItem.value?.imageUrl[0] || new URL('@/assets/default-apt-img.jpg', import.meta.url).href
);


// // 좋아요 토글
// const toggleFavorite = () => {
//     if (!dealItem.value) return;

//     // 좋아요 상태 반전
//     isFavorited.value = !isFavorited.value;
//     dealItem.countLike.value += isFavorited.value ? 1 : -1;

//     // 사용자 데이터 업데이트
//     if (isFavorited.value) {
//         userStore.addLike(dealItem.value.id);
//     } else {
//         userStore.removeLike(dealItem.value.id);
//     }

//     // 아파트 데이터 업데이트
//     apartmentStore.updateLikeCount(dealItem.value.id, likeCount.value);
// };

const toggleFavorite = () => {
    if (!dealItem.value) {
        console.warn("dealItem is not loaded yet.");
        return; // dealItem이 없을 때 함수 실행 중단
    }

    // 좋아요 상태 반전
    isFavorited.value = !isFavorited.value;

    // countLike를 안전하게 수정
    dealItem.value.countLike = (dealItem.value.countLike || 0) + (isFavorited.value ? 1 : -1);

    addFavoriteDeal(dealId).then((res) => {
        console.log("addFavoriteDeal success");
    });
    // // 사용자 데이터 업데이트
    // if (isFavorited.value) {
    //     userStore.addLike(dealItem.value.id);
    // } else {
    //     userStore.removeLike(dealItem.value.id);
    // }
};


// 뒤로 가기
const goBack = () => {
    router.back();
};

// 작성자 프로필 보기
const viewProfile = (dealerId) => {
    if (!dealerId) return;
    router.push({ name: "profile", params: { id: dealerId } });
};
</script>

<style scoped>
.apartment-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
}

.apartment-detail-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.deal-info {
    color: #423530;
}

.favorite-icon {
    font-size: 1rem;
    color: var(--color-main-theme);
    cursor: pointer;
    text-align: center;
    line-height: 1.2rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.favorite-icon.active {
    color: rgb(248, 71, 71);
    transform: scale(1.1);
}

.v-card-actions {
    min-height: 1rem;
    height: 1rem;
    width: 1rem;
    padding-top: 1rem;
}

.btn-back {
    font-size: 1rem;
    padding: 0 0.9rem;
    color: var(--color-main-theme);
    cursor: pointer;
}
</style>


<!-- <template>
    <v-container class="apartment-detail-container">
        <v-card v-if="apartment" class="apartment-detail-card">
            <v-img :src="dealItem.image" alt="Apartment Image" class="detail-img" />
            <v-card-title class="d-flex fw-bold" style="justify-content: space-between;">
                {{ dealItem.name }}
                <div style="line-height: 0.5rem; text-align: center;">
                    <p class="favorite-icon" @click="toggleFavorite" :class="{ active: isFavorited }">
                        <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                        <br />
                        <small style="font-size: 0.5rem;">{{ likeCount }}</small>
                    </p>
                </div>
            </v-card-title>

            <v-card-subtitle>
                {{ dealItem.type }} | {{ dealItem.price }}
            </v-card-subtitle>
            <v-card-text>
                <p><strong>동:</strong> {{ dealItem.dong }}동</p>
                <p><strong>층수:</strong> {{ dealItem.floor }}</p>
                <p><strong>평수:</strong> {{ dealItem.size }}㎡</p>
                <p><strong>거리:</strong> {{ dealItem.distance }}km</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="goBack">뒤로 가기</v-btn>
            </v-card-actions>
        </v-card>
        <v-progress-circular v-else indeterminate color="primary" class="mt-5" />
    </v-container>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHouseStore } from "@/stores/apartment";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const router = useRouter();
const apartmentStore = useHouseStore();
const userStore = useUserStore();

const isFavorited = ref(false);
const likeCount = ref(0);

const apartment = computed(() => {
    return (
        apartmentStore.selectedApartment ||
        apartmentStore.getApartmentById(route.params.id) ||
        null
    );
});

// 로딩 후 데이터 없을 시 방어 처리
onMounted(() => {
    if (!dealItem.value) {
        console.warn("아파트 정보를 찾을 수 없습니다.");
        router.replace({ name: "home" });
    } else {
        // 좋아요 초기값 설정
        isFavorited.value = userStore.isLiked(dealItem.value.id);
        likeCount.value = dealItem.value.like || 0;
    }
});

// 좋아요 토글
const toggleFavorite = () => {
    if (!dealItem.value) return;

    // 좋아요 상태 반전
    isFavorited.value = !isFavorited.value;
    likeCount.value += isFavorited.value ? 1 : -1;

    // Store 업데이트
    userStore.toggleLike(dealItem.value.id);
    apartmentStore.updateLikeCount(dealItem.value.id, likeCount.value);
};

// 뒤로 가기
const goBack = () => {
    router.back();
};
</script>

<style scoped>
.apartment-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

.apartment-detail-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.favorite-icon {
    font-size: 1rem;
    color: var(--color-main-theme);
    cursor: pointer;
    text-align: center;
    line-height: 1.2rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.favorite-icon.active {
    color: rgb(248, 71, 71);
    transform: scale(1.1);
}
</style> -->


<!-- <template>
    <v-container class="apartment-detail-container">
        <v-card v-if="apartment" class="apartment-detail-card">
            <v-img :src="dealItem.image" alt="Apartment Image" class="detail-img" />
            <v-card-title class="d-flex fw-bold" style="justify-content: space-between;">
                {{ dealItem.name }}
                <div style="line-height: 0.5rem; text-align: center;">
                    <p class="favorite-icon" @click="toggleFavorite" :class="{ active: isFavorited }">
                        <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                        <br />
                        <small style="font-size: 0.5rem;">{{ likeCount }}</small>
                    </p>
                </div>
            </v-card-title>

            <v-card-subtitle>
                {{ dealItem.type }} | {{ dealItem.price }}
            </v-card-subtitle>
            <v-card-text>
                <p><strong>동:</strong> {{ dealItem.dong }}동</p>
                <p><strong>층수:</strong> {{ dealItem.floor }}</p>
                <p><strong>평수:</strong> {{ dealItem.size }}㎡</p>
                <p><strong>거리:</strong> {{ dealItem.distance }}km</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="goBack">뒤로 가기</v-btn>
            </v-card-actions>
        </v-card>
        <v-progress-circular v-else indeterminate color="primary" class="mt-5" />
    </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHouseStore } from "@/stores/apartment";

const route = useRoute();
const router = useRouter();
const apartmentStore = useHouseStore();

const isFavorited = ref(false);
const likeCount = ref(0);

const apartment = computed(() => {
    return apartmentStore.selectedApartment || apartmentStore.getApartmentById(route.params.id) || null;
});

// 로딩 후 데이터 없을 시 방어 처리
onMounted(() => {
    if (!dealItem.value) {
        console.warn("아파트 정보를 찾을 수 없습니다.");
        router.replace({ name: "home" });
    } else {
        likeCount.value = dealItem.value.like || 0; // 좋아요 초기값
    }
});

// 좋아요 토글
const toggleFavorite = () => {
    isFavorited.value = !isFavorited.value;
    likeCount.value += isFavorited.value ? 1 : -1; // 좋아요 수 증가/감소
};

// 뒤로 가기
const goBack = () => {
    router.back();
};
</script>

<style scoped>
.apartment-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

.apartment-detail-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.favorite-icon {
    font-size: 1rem;
    color: var(--color-main-theme);
    cursor: pointer;
    text-align: center;
    line-height: 0.rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.favorite-icon.active {
    color: rgb(248, 71, 71);
    transform: scale(1.1);
}
</style> -->


<!-- <template>
    <v-container class="apartment-detail-container">
        <v-card v-if="apartment" class="apartment-detail-card">
            <v-img :src="dealItem.image" alt="Apartment Image" class="detail-img" />
            <v-card-title class="d-flex fw-bold" style="justify-content: space-between;">
                {{ dealItem.name }}
                <div style="line-height: 0.5rem; text-align:center">
                    <p class="favorite-icon center" @click="toggleFavorite" :class="{ active: isFavorited }">
                        <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                        <br />
                        <small style="font-size: 0.5rem;">{{ dealItem.like }}</small>
                    </p>
                </div>
            </v-card-title>

            <v-card-subtitle>
                {{ dealItem.type }} | {{ dealItem.price }}
            </v-card-subtitle>
            <v-card-text>
                <p><strong>동:</strong> {{ dealItem.dong }}동</p>
                <p><strong>층수:</strong> {{ dealItem.floor }}</p>
                <p><strong>평수:</strong> {{ dealItem.size }}㎡</p>
                <p><strong>거리:</strong> {{ dealItem.distance }}km</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="goBack">뒤로 가기</v-btn>
            </v-card-actions>
        </v-card>
        <v-progress-circular v-else indeterminate color="primary" class="mt-5" />
    </v-container>
</template>

<script setup>

import { useRoute, useRouter } from "vue-router";
import { useHouseStore } from "@/stores/apartment";

const route = useRoute();
const router = useRouter();
const apartmentStore = useHouseStore();

const apartment = apartmentStore.selectedApartment || apartmentStore.getApartmentById(route.params.id);

const goBack = () => {
    router.back();
};

export default {
    name: "AptDetailView",
    data() {
        return {
            isFavorited: false, // 초기값은 비어있는 하트
            apartment,
            goBack,
        };
    },
    methods: {
        toggleFavorite() {
            this.isFavorited = !this.isFavorited; // 하트 상태를 반대로 토글
        },
    }

};


// import { useRoute, useRouter } from "vue-router";
// export default {
//     name: "AptDetailView",
//     setup() {
//         const route = useRoute();
//         const router = useRouter();

//         const apartment = route.state || null; // `route.state`로 데이터 가져오기
//         console.log("apartment:", apartment);
//         const goBack = () => {
//             router.back();
//         };

//         return {
//             apartment,
//             goBack,
//         };
//     },
// };
</script>

<style scoped>
.apartment-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
}

.apartment-detail-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.favorite-icon {
    font-size: 1rem;
    color: var(--color-main-theme);
    cursor: pointer;
    text-align: center;
    line-height: 0.rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.favorite-icon.active {
    color: rgb(248, 71, 71);
    transform: scale(1.1);
}
</style> -->


<!-- <template>
    <v-container>
        <AptDetail :apartment="apartment" />
    </v-container>
</template>

<script>
import AptDetail from '@/components/apt/AptDetail.vue';

export default {
    components: {
        AptDetail,
    },
    data() {
        return {
            apartment: null,
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    async created() {
        // ID를 이용해 아파트 상세 정보를 API 또는 더미 데이터로 가져옵니다.
        this.apartment = await this.fetchApartmentDetail(this.id);
    },
    methods: {
        async fetchApartmentDetail(id) {
            // 예제: 더미 데이터 또는 API 요청
            const apartments = [
                { id: '1', name: '롯데캐슬 1단지', price: '6억', dong: 101, floor: '10층', type: '매매', size: 84, image: '/apt_image_1.jpg' },
                { id: '2', name: '롯데캐슬 2단지', price: '5억', dong: 102, floor: '8층', type: '전세', size: 64, image: '/apt_image_2.jpg' },
            ];
            return apartments.find((apt) => apt.id === id);
        },
    },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style> -->
