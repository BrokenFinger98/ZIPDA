<template>
    <div class="text-center detail-container">
        <img src="@/assets/apt_profile_ex.png" width="100%" class="mb-4">

        <!-- 제목과 아이콘 -->
        <div class="header-container">
            <h4 class="fw-bold mb-1">롯데캐슬아파트 7단지</h4>

            <!-- 리뷰 팝업 -->
            <!-- <v-menu v-model="reviewPopupOpen" close-on-content-click="false" offset-y> -->
            <v-menu v-model="reviewPopupOpen" :close-on-content-click="false" offset-x :location="'right'"
                :persistent="true">
                <template v-slot:activator="{ props }">
                    <!-- <div class="comment-icon" v-bind="props" @click="openReviewPopup"> -->
                    <div class="comment-icon" v-bind="props" @click="$emit('toggle-review-popup')">
                        <font-awesome-icon :icon="['fas', 'comment-dots']" />
                    </div>
                </template>

                <v-card>
                    <div class="d-flex justify-space-between">
                        <v-card-title>
                            <span class="text-h6 fw-bold">리뷰</span>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn icon color="var(--color-main-theme)" plain @click="closeReviewPopup" class="x-btn">
                                <font-awesome-icon :icon="['fas', 'xmark']" />
                            </v-btn>
                        </v-card-actions>
                    </div>
                    <v-card-text>
                        <ul v-if="apartmentReviews.length > 0">
                            <li v-for="(review, index) in apartmentReviews" :key="index">
                                {{ review }}
                            </li>
                        </ul>
                        <p v-else>리뷰가 없습니다.</p>
                    </v-card-text>

                </v-card>
            </v-menu>
        </div>

        <div>
            <small>준공연도: 2019</small> &nbsp; <small><img src=""> 선릉역 도보 10분</small>
        </div>
        <div class="table-responsive m-3">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" class="table-title">평수</th>
                        <th scope="col" class="table-title">세대수</th>
                        <th scope="col" class="table-title">평균 매매/전세가</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">120</th>
                        <td>5</td>
                        <td>6.1억 / 1억</td>
                    </tr>
                    <tr>
                        <th scope="row">150</th>
                        <td>6</td>
                        <td>7.5억 / 2억</td>
                    </tr>
                    <tr>
                        <th scope="row">180</th>
                        <td>7</td>
                        <td>10억 / 3억</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useApartmentStore } from "@/stores/house";

export default {
    setup() {
        const apartmentStore = useApartmentStore();
        const reviewPopupOpen = ref(false); // 팝업 상태 관리

        const apartmentReviews = computed(() => {
            const selectedApartment = apartmentStore.selectedApartment;
            return selectedApartment?.reviews || [];
        });

        const openReviewPopup = () => {
            // if (!apartmentStore.selectedApartment) {
            //     alert("리뷰를 보기 위해 아파트를 먼저 선택해주세요.");
            //     return;
            // }
            reviewPopupOpen.value = true;
        };

        const closeReviewPopup = () => {
            reviewPopupOpen.value = false;
        };

        return {
            reviewPopupOpen,
            apartmentReviews,
            openReviewPopup,
            closeReviewPopup,
        };
    },
};
</script>

<style scoped>
img {
    border-radius: 0.6em 0.6em 0 0;
}

th {
    font-weight: 600;
}

table {
    font-size: 13px;
}

.table-title {
    font-weight: 800;
}

.detail-container {
    margin-bottom: 1rem;
    background-color: #ffffff;
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.detail-container small {
    color: #7f7f7f;
}

/* 헤더 컨테이너: 제목과 아이콘 */
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    /* 좌우 여백 */
}

/* 제목 스타일 */
h4 {
    flex: 1;
    text-align: center;
    margin: 0;
}

/* 코멘트 아이콘 */
.comment-icon {
    font-size: 1.3rem;
    color: var(--color-main-theme);
    cursor: pointer;
    margin: 0 10px;
    /* 제목과 아이콘 사이 간격 */
}

.v-card {
    width: 20rem;
    margin-left: 1rem;
    border-radius: 1rem !important;
}

.x-btn {
    
}
</style>

