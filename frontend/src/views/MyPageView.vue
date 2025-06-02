<template>
    <v-container class="mypage-container" ref="containerRef">
        <!-- 프로필 섹션 -->
        <v-card class="profile-card">
            <v-row align="center" justify="space-between">
                <!-- 프로필 아이콘 -->
                <v-col cols="8" class="text-center profile-img-name">
                    <v-avatar size="40">
                        <!-- "https://cdn.vuetifyjs.com/images/john.png" -->
                        <v-img :src="imageUrl"></v-img>
                    </v-avatar>
                    <div class="profile-info">
                        <div class="profile-name-section">
                            <h3 class="profile-name">{{ user.nickname }}님</h3>
                            <v-btn icon class="profile-icon" variant="text">
                                <router-link class="router-link profile-icon-link" :to="{ name: 'modify' }">
                                    <font-awesome-icon :icon="['fas', 'pen']" />
                                </router-link>
                            </v-btn>

                            <v-btn icon class="profile-icon" variant="text">
                                <router-link class="router-link profile-icon-link" :to="{ name: 'msg' }">
                                    <font-awesome-icon :icon="['fas', 'envelope']" />
                                </router-link>
                            </v-btn>
                            <v-btn icon class="profile-icon" variant="text" @click="logout">
                                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
                            </v-btn>
                        </div>
                        <p class="profile-email">{{ user.email }}</p>
                    </div>
                </v-col>

                <!-- 팔로우/팔로잉 -->
                <v-col cols="3" class="text-end follow">
                    <div class="profile-follow">
                        <p @click="togglePopup('follow', $event)" class="clickable">
                            팔로우 <span class="count">100명</span>
                        </p>
                        <p @click="togglePopup('following', $event)" class="clickable">
                            팔로잉 <span class="count">200명</span>
                        </p>
                    </div>
                </v-col>
            </v-row>
        </v-card>

        <div class="menu-container">
            <!-- 아코디언 섹션 -->
            <v-card class="accordion-card mt-5 p-0">
                <v-expansion-panels v-model="expanded" variant="accordion" class="p-0" elevation="0">
                    <!-- 나의 관심사 -->
                    <v-expansion-panel>
                        <v-expansion-panel-title class="title-navy">
                            나의 관심사
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-list class="sm-title py-0">
                                <v-list-item link @click="openFavoriteRegionModal">
                                    관심 지역 설정
                                </v-list-item>
                                <v-list-item link>
                                    <!-- <font-awesome-icon :icon="['fas', 'building']" />  -->
                                    관심 아파트 설정
                                </v-list-item>
                                <v-list-item link>
                                    <!-- <font-awesome-icon :icon="['fas', 'door-open']" />  -->
                                    관심 매물 설정
                                </v-list-item>
                                <v-list-item link>
                                    관심 게시글 설정
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- 내 활동 -->
                    <v-expansion-panel>
                        <v-expansion-panel-title class="title-navy">
                            내 활동
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-list class="sm-title">
                                <v-list-item link>
                                    내가 쓴 게시글
                                </v-list-item>
                                <v-list-item link>
                                    내가 쓴 댓글
                                </v-list-item>
                                <v-list-item link @click="logout">
                                    로그아웃
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>

        <!-- 관심 지역 설정 모달 -->
        <v-dialog v-model="isFavoriteRegionModalOpen" max-width="600px">
            <v-card>
                <v-card-title class="modal-header">
                    <div class="fs-5 fw-bold">관심 지역 설정</div>
                    <v-spacer></v-spacer>
                    <v-btn icon variant="text" @click="closeFavoriteRegionModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <!-- 관심 지역 설정 내용 -->
                    <FavoriteRegion />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card v-if="popupVisible" :style="popupStyles" class="popup-card" ref="popupRef">
            <v-card-title class="follow-title">{{ popupTitle }}</v-card-title>
            <v-divider class="my-0"></v-divider>
            <v-card-text class="p-1">
                <v-list>
                    <v-list-item v-for="person in currentProfiles" :key="person.id">
                        <v-avatar size="40" class="me-3">
                            <v-img :src="person.image" />
                        </v-avatar>
                        <span>{{ person.name }}</span>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

// 기본적으로 "나의 관심사"가 펼쳐짐
const expanded = ref([0]);
// const authStore = useAuthStore(); // 인증 상태 가져오기
const userStore = useUserStore(); // 유저 상태 가져오기
const user = storeToRefs( userStore).user;

const defaultProfileImage = ["https://cdn.vuetifyjs.com/images/john.png"];
console.log(user.imageUrl);
const imageUrl = user.imageUrl || defaultProfileImage[0];

console.log("user: ", user);

const router = useRouter(); // 라우터 가져오기


const logout = () => {
    userStore.logout();
};

// 팝업 상태 관리
const popupVisible = ref(false);
const popupTitle = ref('');
const popupStyles = ref({});
const currentProfiles = ref([]);
const popupRef = ref(null); // 팝업 DOM 참조
const containerRef = ref(null); // 전체 컨테이너 참조

// 더미 데이터
const followProfiles = [
    { id: 1, name: '유저 1', image: 'https://via.placeholder.com/40' },
    { id: 2, name: '유저 2', image: 'https://via.placeholder.com/40' },
];

const followingProfiles = [
    { id: 1, name: '유저 A', image: 'https://via.placeholder.com/40' },
    { id: 2, name: '유저 B', image: 'https://via.placeholder.com/40' },
];

// 팝업 토글
const togglePopup = (type, event) => {
    const rect = event.target.getBoundingClientRect();

    // 팝업이 열려 있고 같은 버튼 클릭 시 팝업 닫기
    if (popupVisible.value && popupTitle.value === (type === 'follow' ? '팔로우 목록' : '팔로잉 목록')) {
        popupVisible.value = false;
        popupStyles.value = {};
        return;
    }

    popupVisible.value = true;
    popupTitle.value = type === 'follow' ? '팔로우 목록' : '팔로잉 목록';
    currentProfiles.value =
        type === 'follow' ? followProfiles : followingProfiles;

    // 팝업 위치 설정
    popupStyles.value = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.right + 10}px`,
    };
};

// 팝업 외부 클릭 감지
const handleDocumentClick = (event) => {
    const popupElement = popupRef.value?.$el || popupRef.value; // DOM 요소 가져오기
    if (
        popupVisible.value &&
        popupElement &&
        !popupElement.contains(event.target)
    ) {
        popupVisible.value = false;
        popupStyles.value = {}; // 팝업 스타일 초기화
    }
};

onMounted(() => {
    document.addEventListener('mousedown', handleDocumentClick, { passive: true }); // 외부 클릭 감지
});

onUnmounted(() => {
    document.removeEventListener('mousedown', handleDocumentClick, { passive: true }); // 이벤트 제거
});

import FavoriteRegion from '@/components/FavoriteRegion.vue'; // 관심 지역 컴포넌트 추가
import { storeToRefs } from 'pinia';



// 관심 지역 설정 모달 상태
const isFavoriteRegionModalOpen = ref(false);

// 관심 지역 모달 열기
const openFavoriteRegionModal = () => {
    isFavoriteRegionModalOpen.value = true;
};

// 관심 지역 모달 닫기
const closeFavoriteRegionModal = () => {
    isFavoriteRegionModalOpen.value = false;
};

</script>

<style scoped>
.mypage-container {
    max-width: 800px;
    margin: 0;
    padding: 0;
}

.profile-card {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-img-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* 프로필 정보 */
.profile-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.profile-name-section {
    display: flex;
    align-items: center;
}

.profile-name {
    margin: 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--vt-c-navy);
}

.profile-icon {
    margin-left: 3px;
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.7rem;
    color: var(--vt-c-navy);
    cursor: pointer;
    padding: 1px;
    transition: color 0.3s ease;
}

.profile-icon:hover {
    color: #003f8e;
}

.profile-email {
    margin: 3px 0 0 0;
    color: #666;
    font-size: 0.8rem;
}

/* 팔로우/팔로잉 섹션 */
.profile-follow {
    text-align: right;
}

.profile-follow p {
    margin: 0;
    font-size: 0.7rem;
    color: #333;
    cursor: pointer;
}

.profile-follow .clickable:hover {
    text-decoration: underline;
}

.count {
    font-weight: bold;
    color: #003f8e;
}

.menu-container {
    background-color: #ffffff;
    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 아코디언 카드 */
.accordion-card {
    padding: 10px;
    height: 85vh;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-border {
    border:none;
}

.title-navy {
    font-weight: bold;
    font-size: 1rem;
    color: var(--vt-c-navy);
}

.sm-title {
    font-weight: bold;
    font-size: 0.8rem;
    color: var(--vt-c-navy);
}

.follow {
    padding-left: 0;
}

/* 팝업 스타일 */
.popup-card {
    position: absolute;
    z-index: 10;
    width: 250px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.follow-title {
    font-weight: bold;
    font-size: 1rem;
    color: var(--vt-c-navy);
}

.router-link {
    border-radius: 50%;
}

.profile-icon-link {
    color: var(--vt-c-navy);
}

.modal-header {
    display: flex;
    justify-content: space-between;
}
</style>
