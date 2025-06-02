import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'; // Pinia Auth Store
import AptResultList from '@/components/apt/AptResultList.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'list' },
      children:[
        {
          path: 'list',
          name: 'list',
          component: AptResultList,
        },
        {
          path: '/list/house-detail/:id',
          name: 'house-detail',
          component: () => import('@/components/apt/AptDetail.vue'),
        },
        {
          path: '/deal-detail/:id',
          name: 'deal-detail',
          component: () => import('@/components/apt/DealDetail.vue'), // AptDetailView
          props: true, // 이 설정이 있어야 params를 컴포넌트의 props로 전달
        },
      ]
    },
    
    
    
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'), // ProfileView
    }
    ,
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'), // BoardView 레이아웃 사용
      redirect: '/board/notice/list', // 기본 경로는 공지사항 리스트로 리디렉션
      children: [
        {
          path: 'notice',
          children: [
            {
              path: 'list',
              name: 'notice-list',
              component: () => import('@/components/board/NoticeList.vue'),
            },
            {
              path: 'write',
              name: 'notice-write',
              component: () => import('@/components/board/NoticeWrite.vue'),
            },
            {
              path: 'modify/:articleno',
              name: 'notice-modify',
              component: () => import('@/components/board/NoticeModify.vue'),
            },
            {
              path: 'detail/:articleno',
              name: 'notice-detail',
              component: () => import('@/components/board/NoticeDetail.vue'),
            },
          ],
        },
        {
          path: 'qna',
          children: [
            {
              path: 'list',
              name: 'qna-list',
              component: () => import('@/components/board/QnAList.vue'),
            },
            {
              path: 'write',
              name: 'qna-write',
              component: () => import('@/components/board/QnAWrite.vue'),
            },
            {
              path: 'modify/:articleno',
              name: 'qna-modify',
              component: () => import('@/components/board/QnAModify.vue'),
            },
            {
              path: 'detail/:articleno',
              name: 'qna-detail',
              component: () => import('@/components/board/QnADetail.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    
    // {
    //   path: '/join',
    //   name: 'join',
    //   component: () => import('@/components/user/Join.vue'),
    //   meta: { requiresGuest: true },
    // },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('@/views/MyPageView.vue'),
      children: [
        
      ],
      meta: { requiresAuth: true },
    },
    {
      path: '/mypage/modify',
      name: 'modify',
      component: () => import('@/components/user/ModifyProfile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mypage/msg',
      name:'msg',
      component: () => import('@/views/MessageView.vue'),
      meta: { requiresAuth: true },
      redirect: '/mypage/msg/list',
      children: [
        {
          path: 'list',
          name:'msg-list',
          component: () => import('@/components/message/MessageList.vue'),
        },
        {
          path: 'write',
          name:'msg-write',
          component: () => import('@/components/message/WriteMessage.vue'),
        },
      ]
    },
    {
      path: '/fav-apt',
      name: 'fav-apt',
      component: () => import('@/components/apt/FavoriteAptList.vue'),
    },
    {
      path: '/like-deal',
      name: 'like-deal',
      component: () => import('@/components/apt/FavoriteDealList.vue'),
    },
    {
      path: '/chatbot',
      name: 'chatbot',
      component: () => import('@/views/ChatbotView.vue'),
    },
  ],
})


// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLogin) {
    // 로그인하지 않은 사용자가 보호된 경로로 접근 시 로그인 페이지로 리다이렉트
    next({ name: 'login' });
  } else if (to.meta.requiresGuest && userStore.isLogin) {
    // 로그인한 사용자가 로그인 페이지로 접근 시 마이페이지로 리다이렉트
    next({ name: 'mypage' });
  } else {
    // 그 외의 경우 허용
    next();
  }
});

export default router
