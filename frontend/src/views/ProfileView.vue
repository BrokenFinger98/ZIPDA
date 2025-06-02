<template>
    <v-container class="profile-view-container">
        <!-- 프로필 섹션 -->
        <v-card class="profile-card">
            <v-row align="center" justify="space-between">
                <!-- 프로필 이미지 -->
                <v-col cols="4" class="text-center">
                    <v-avatar size="80">
                        <v-img :src="user.profileImage || defaultProfileImage" alt="Profile Image" />
                    </v-avatar>
                </v-col>
                <!-- 유저 정보 -->
                <v-col cols="8" class="profile-info">
                    <span class="profile-name">{{ user.name }}</span>
                    <span class="profile-role">{{ userRole }}</span>
                    <div class="follow-info">
                        <span>팔로워: {{ user.followers }}</span>
                        <span>팔로잉: {{ user.following }}</span>
                    </div>
                    <v-btn small color="primary" @click="toggleFollow">
                        {{ isFollowing ? "언팔로우" : "팔로우" }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

        <!-- 작성한 리뷰 섹션 -->
        <v-card class="reviews-card mt-4">
            <h4 class="section-title">작성한 리뷰</h4>
            <v-list v-if="user.reviews.length > 0">
                <v-list-item v-for="(review, index) in user.reviews" :key="index">
                    <v-list-item-content>
                        <v-list-item-title>{{ review.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ review.content }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <p v-else>작성된 리뷰가 없습니다.</p>
        </v-card>

        <!-- 작성한 매물 섹션 -->
        <v-card class="listings-card mt-4">
            <h4 class="section-title">작성한 매물</h4>
            <v-list v-if="user.listings.length > 0">
                <v-list-item v-for="(listing, index) in user.listings" :key="index">
                    <v-list-item-content>
                        <v-list-item-title>{{ listing.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ listing.price }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <p v-else>작성된 매물이 없습니다.</p>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const user = ref({
    id: null,
    name: "",
    role: "",
    followers: 0,
    following: 0,
    profileImage: "",
    reviews: [],
    listings: [],
});

const defaultProfileImage = "https://via.placeholder.com/80/003f8e/ffffff?text=+"; // 기본 이미지 URL

const isFollowing = ref(false);
const userRole = ref("");
const route = useRoute();

const getRole = (role) => {
    switch (role) {
        case "admin":
            return "관리자";
        case "agent":
            return "공인중개사";
        case "user":
        default:
            return "일반 사용자";
    }
};

const toggleFollow = () => {
    isFollowing.value = !isFollowing.value;
    user.value.followers += isFollowing.value ? 1 : -1;
};

const loadUserData = async (userId) => {
    const mockData = {
        id: userId,
        name: "홍길동",
        role: "agent",
        profileImage: "https://via.placeholder.com/80",
        followers: 151,
        following: 200,
        reviews: [
            { title: "리뷰 제목 1", content: "리뷰 내용 1" },
            { title: "리뷰 제목 2", content: "리뷰 내용 2" },
        ],
        listings: [
            { name: "강남 아파트", price: "5억" },
            { name: "서초 빌라", price: "3억" },
        ],
    };
    user.value = mockData;
    userRole.value = getRole(mockData.role);
};

onMounted(() => {
    const userId = route.params.id;
    loadUserData(userId);
});
</script>

<style scoped>
.profile-view-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
}

.profile-info {
    
    padding: 1rem;
}

.profile-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.profile-name {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
}

.profile-role {
    font-size: 0.6rem;
    font-weight: 700;
    color: #666;
    margin: 0.5rem 0.6rem;
}

.follow-info {
    font-size: 0.9rem;
    color: #333;
    margin: 0.5rem 0;
}

.reviews-card,
.listings-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.section-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}
</style>
