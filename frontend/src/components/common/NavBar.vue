<template>
    <div class="nav-bar">
        <!-- <div class="nav-item" :class="{ active: isActive(item.route) }" v-for="(item, index) in navItems" :key="index">
            <router-link class="router-link" :to="{ name: item.route }" @click="setActive(index)">
                <font-awesome-icon :icon="item.icon" />
            </router-link>
            <p>{{ item.label }}</p>

        </div> -->
        <div class="nav-item" :class="{ active: isActive(item.route) }" v-for="(item, index) in dynamicNavItems"
            :key="index">
            <router-link class="router-link" :to="{ name: item.route }" @click="setActive(index)">
                <font-awesome-icon :icon="item.icon" />
            </router-link>
            <p>{{ item.label }}</p>
        </div>
    </div>
</template>

<script>
// import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

export default {

    computed: {
        // 로그인 여부에 따라 동적으로 메뉴 변경
        dynamicNavItems() {
            const userStore = useUserStore();
            const baseItems = [
                { label: "지도", icon: "fas fa-map", route: "list" },
                // { label: "관심 아파트", icon: "fas fa-building", route: "fav-apt" },
                // { label: "관심 매물", icon: "fas fa-door-open", route: "like-deal" },
                { label: "공지사항", icon: "fas fa-bullhorn", route: "board" },
                { label: "AI챗봇", icon: "fas fa-headset", route: "chatbot" },
            ];
            console.log(userStore.isLogin);
            // 로그인 여부에 따라 '마이페이지' 또는 '로그인' 추가
            const userItem = userStore.isLogin
                ? { label: "마이페이지", icon: "fas fa-user-circle", route: "mypage" }
                : { label: "로그인", icon: "fas fa-user-circle", route: "login" };
            // 로그인 상태에서만 추가되는 항목
            const loggedInItems = userStore.isLogin? [
                    { label: "관심 아파트", icon: "fas fa-building", route: "fav-apt" },
                    { label: "관심 매물", icon: "fas fa-door-open", route: "like-deal" },
                ]: [];

            
            return [baseItems[0], userItem, ...loggedInItems, ...baseItems.slice(1)];
            
            // return authStore.isAuthenticated ? [baseItems[0], userItem, ...loggedInItems, ...baseItems.slice(1)] : [baseItems[0], userItem, ...baseItems.slice(1)];
        },
    },

    methods: {
        setActive(index) {
            this.activeIndex = index;
        },
        isActive(routeName) {
            const currentRoute = this.$route;
            // console.log(currentRoute.name, routeName);
            if ((currentRoute === 'msg' || currentRoute === 'modify')&& routeName === 'mypage') {
                return true;
            }
            if (currentRoute === 'house-detail' && routeName === 'list') {
                return true;
            }
            const targetRoute = this.dynamicNavItems.find((item) => item.route === routeName);
            return (
                currentRoute.name === routeName ||
                (targetRoute && currentRoute.path.startsWith(`/${routeName}`))
            );
        },
    },

};
</script>

<style scoped>
/* Left Navigation Bar */
.nav-bar {
    min-width: 60px;
    background-color: #ffffff;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 20;
}

.nav-item, .router-link {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #3b4b5b;
    
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.router-link {
    cursor: pointer;
}

.nav-item.active {
    color: #3b4b5b;
    transform: scale(1.1); /* 아이콘을 살짝 확대 */
}

.nav-item p {
    font-size: 0.6rem;
    font-weight: bold;
    margin: 0;
}

/* 비활성화된 아이템 스타일 */
.nav-item:not(.active) {
    opacity: 0.7;
    /* 비활성화된 아이템은 투명도 60% */
}

.nav-item:not(.active) i {
    color: #3b4b5bc5;
    /* 비활성화된 아이콘 색상 */
}

.nav-item:not(.active) p {
    color: #3b4b5bc5;
}

</style>
