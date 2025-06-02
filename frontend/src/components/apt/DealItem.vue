<template>
    <!-- <v-list-item class="apartment-item p-0" link @click="selectDeal"> -->
    <v-list-item class="apartment-item p-0" link  @click="selectDeal">
        <div class="d-flex apt-content">
            <!-- 아파트 이미지 -->
            <!-- <v-avatar>
                <img class="list-apt-img" :srcdealItem.image alt="Apt Image" />
            </v-avatar> -->
            <div class="item-content">
                <div class="apartment-header">
                    <v-list-item-title class="d-flex">
                        <p class="fw-bold fs-5 mr-3">{{ koreanPrice(dealItem.price) }}</p>
                        <div class="d-flex align-items-center">
                        <v-chip
                                class="ma-2"
                                color="success"
                                prepend-icon="mdi-cash"
                                size="x-small"
                                >
                                {{ dealType }}
                            </v-chip>
                            <v-chip
                                class="ma-2"
                                color="orange"
                                prepend-icon="mdi-checkbox-marked-circle"
                                size="x-small"
                                >
                                {{ meterToPyung(dealItem.exclusiveArea) }}평
                            </v-chip>     
                        </div>
                    </v-list-item-title>
                    <v-icon>
                        <p class="favorite-icon center" :class="{ active: dealItem.likeStatus }">
                        <!-- <p class="favorite-icon center active" > -->
                            <font-awesome-icon :icon="[dealItem.likeStatus ? 'fas' : 'far', 'heart']" />
                            <br />
                            <small style="font-size: 0.5rem;">{{ dealItem.countLike || 0 }}</small>
                        </p>
                    </v-icon>
                </div>
                <div class="detail-info p-2 mb-2">
                    <p v-if="dealItem.status==='COMPLETED'" class="my-2">
                        거래일: {{ dealItem.dealDate.split(' ')[0] }}
                    </p> 
                    <!-- <p class="my-2">중개인: @{{ dealItem.agentNickName }} </p> -->
                    
                    <p class="my-">
                        <!-- <span class="clickable" @click="viewProfile(dealItem.agentId)">
                            @{{ dealItem.agentNickName }}
                        </span> -->
                        <p class="my-2">
                        중개인: 
                        <span class="clickable"> <!--openProfileDialog(dealItem.agentId)-->
                            @{{ dealItem.agentNickName }}
                        </span>
                    </p>
                        
                    </p>
                    
                </div>
            </div>
        </div>
        <v-divider class="m-0" />
        <!-- <v-dialog v-model="isProfileDialogOpen" max-width="400">
            <template v-slot:activator="{ props }">
                <span v-bind="props" class="hover-info">@{{ dealItem.agentNickName }}</span>
            </template>
            <v-card>
                <v-card-text>
                    <v-avatar size="80">
                        <v-img :src="agentProfile.image || defaultProfileImage" alt="Profile Image" />
                    </v-avatar>
                    <h3>{{ agentProfile.name }}</h3>
                    <p>{{ agentProfile.role }}</p>
                    <p>팔로워: {{ agentProfile.followers }}</p>
                </v-card-text>
            </v-card>
        </v-dialog> -->
    </v-list-item>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { meterToPyung, koreanPrice } from '@/utils/house'
import { ref, computed, onMounted } from "vue";

const props = defineProps({
    dealItem: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["deal-selected"]);

const selectDeal = () => {
    console.log("select deal: ", props.dealItem);
    emit("deal-selected", props.dealItem);
};


const dealType = computed(() => {
  switch (props.dealItem.type) {
    case 'SALE':
      return '매매';
    case 'RENT':
      return '전세';
    case 'MONTHLY_RENT':
      return '월세';
    default:
      return '매매'; // 예외 처리
  }
});

const defaultProfileImage = "https://cdn.vuetifyjs.com/images/john.png";
const viewProfile = (dealerId) => {
    if (!dealerId) return;
    const router = useRouter();
    router.push({ name: "profile", params: { id: dealerId } });
};

// // 프로필 다이얼로그 상태
// const isProfileDialogOpen = ref(false);

// // 중개인 프로필 정보 불러오기
// const openProfileDialog = (agentId) => {
//     if (!agentId) return;
//     // API 호출 또는 데이터 설정
//     agentProfile.value = {
//         name: "홍길동",
//         role: "공인중개사",
//         image: "https://via.placeholder.com/80",
//         followers: 120,
//     };
//     isProfileDialogOpen.value = true; // 다이얼로그 열기
// };


onMounted(() => {

})


</script>

<style scoped>
.apartment-item {
    padding: 0;
}

.apt-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
}

p {
    font-size: 0.8rem;
}

.apartment-header {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
}

.favorite-icon {
    font-size: 1rem;
    color: var(--color-main-theme);
    text-align: center;
    line-height: 1.2rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.favorite-icon.active {
    color: rgb(248, 71, 71);
    transform: scale(1.1);
}

.list-apt-img {
    width: 100px;
    height: 100px;
    object-fit: cover !important;
    border-radius: 10px;
}

.item-content {
    flex: 1;
    min-width: 0;
    /* 콘텐츠 줄바꿈 허용 */
}

.favorite-icon small {
    display: block;
    font-size: 0.7rem;
    margin-top: 0;
    color: gray;
}

.v-avatar {
    width: 100px !important;
    height: 100px !important;
    border-radius: 10px;
    overflow: hidden;
}

.v-icon {
    height: 3.5rem;
}

.v-chip {
    padding: 0 15px;
    margin-left: 0 !important;
}



.detail-info p {
    font-weight: 600;
    color: rgb(67, 67, 67);
}
</style>


<!-- <template>
    <v-list-item class="apartment-item p-0" link @click="selectApartment">
        <div class="d-flex apt-content">
            <v-list-item-avatar>
                <img class="list-apt-img" :srcdealItem.image alt="Apartment Image" />
            </v-list-item-avatar>
            <v-list-item-content class="item-content">
                <div class="apartment-header">
                    <v-list-item-title>
                        <h7 class="fw-bold">{{dealItem.type }} {{dealItem.price }}</h7>
                    </v-list-item-title>
                    <v-list-item-icon>
                        <div>
                            <p class="favorite-icon center" :class="{ active: isFavorited }">
                                <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                                <br />
                                <small style="font-size: 0.5rem;">{{dealItem.like }}</small>
                            </p>
                        </div>

                    </v-list-item-icon>
                </div>
                <v-list-item-subtitle>
                    <p class="fw-bold mb-1">{{dealItem.dong }}동</p>

                </v-list-item-subtitle>
                <div>
                    <p>
                        층수: {{dealItem.floor }}<br>
                        평수: {{dealItem.size }}㎡<br>
                    </p>
                </div>
            </v-list-item-content>
        </div>
        <v-divider class="m-0" />
    </v-list-item>

</template>

<script>


export default {
    props: ["apartment"],
    emits: ["apartment-selected"],
    data() {
        return {
            // isFavorited: false, // 초기값은 비어있는 하트
        };
    },
    methods: {
        selectApartment() {
            this.$emit("apartment-selected", this.apartment);
        },
    },
};

</script>

<style scoped>
.apartment-item {
    padding: 0;
}

.apt-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
}

p {
    font-size: 0.8rem;
}

.small-title {
    font-size: 1rem;
}

.small-subtitle {
    font-size: 0.8rem;
}
.apartment-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.list-apt-img {
    width: 100px;
    object-fit: cover !important;
    border-radius: 10px ;
}

.item-content {
    flex: 1;
    min-width: 0;
}

.favorite-icon small {
    display: block;
    font-size: 0.7rem;
    margin-top: 0;
    color: gray;
}

</style> -->
