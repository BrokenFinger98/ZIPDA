// import { defineStore } from "pinia";
// import { getCurrentMemberInfo } from "@/api/user";
// import { setAuthToken, removeAuthToken } from "@/utils/request";

// export const useUserStore = defineStore("user", {
//   // State 정의
//   state: () => ({
//     user: {}, // 사용자 정보
//     isLogin: false, // 로그인 여부
//     accessToken: "", // 액세스 토큰
//     likeDeal: [], // 좋아요 목록
//     favoriteApt: [], // 즐겨찾기 목록
//     favoriteRegions: [
//       { name: "서울특별시 강남구 역삼동" },
//       { name: "서울특별시 강동구 명일동" },
//     ], // 관심 지역 목록
//   }),

//   // Getter 정의
//   getters: {
//     isFavorited: (state) => (apartmentId) => state.favoriteApt.includes(apartmentId),
//     isLiked: (state) => (dealId) => state.likeDeal.includes(dealId),
//   },

//   // Actions 정의
//   actions: {
//     // 로그인
//     login(token) {
//       this.accessToken = token;
//       this.isLogin = true;

//       setAuthToken(token);

//       // 사용자 정보 가져오기
//       getCurrentMemberInfo()
//         .then((res) => {
//           this.user = res.data;
//         })
//         .catch((err) => {
//           console.error("사용자 정보를 가져오는 중 오류:", err);
//         });
//     },

//     // 로그아웃
//     logout() {
//       this.accessToken = "";
//       this.isLogin = false;
//       this.user = {};
//       removeAuthToken();
//     },

//     // 즐겨찾기 추가
//     addFavorite(apartmentId) {
//       if (!this.favoriteApt.includes(apartmentId)) {
//         this.favoriteApt.push(apartmentId);
//       }
//     },

//     // 즐겨찾기 제거
//     removeFavorite(apartmentId) {
//       this.favoriteApt = this.favoriteApt.filter((id) => id !== apartmentId);
//     },

//     // 좋아요 추가
//     addLike(dealId) {
//       if (!this.likeDeal.includes(dealId)) {
//         this.likeDeal.push(dealId);
//       }
//     },

//     // 좋아요 제거
//     removeLike(dealId) {
//       this.likeDeal = this.likeDeal.filter((id) => id !== dealId);
//     },

//     // 관심 지역 추가
//     addFavoriteRegion(region) {
//       const exists = this.favoriteRegions.some((favRegion) => favRegion.name === region.name);
//       if (!exists) {
//         this.favoriteRegions.push(region);
//         alert(`현재 지역 (${region.name})이 관심 지역에 추가되었습니다.`);
//       } else {
//         alert("이미 등록된 관심 지역입니다.");
//       }
//     },

//     // 관심 지역 제거
//     removeFavoriteRegion(region) {
//       this.favoriteRegions = this.favoriteRegions.filter(
//         (item) => item.name !== region.name
//       );
//     },

//     // 사용자 정보 초기화
//     resetUserInfo() {
//       this.user = {};
//       this.likeDeal = [];
//       this.favoriteApt = [];
//       this.favoriteRegions = [];
//     },
//   },
// });



// // import { getCurrentMemberInfo } from '@/api/user'
// // import { defineStore } from 'pinia'
// // import { ref, watch } from 'vue'
// // import { removeAuthToken, setAuthToken } from '@/utils/request'

// // export const useUserStore = defineStore(
// //   'user',
// //   () => {
// //     const user = ref({})
// //     const isLogin = ref(false)
// //     const accessToken = ref('')

// //     watch(accessToken, (token) => {
// //       if (token) {
// //         isLogin.value = true
// //         setAuthToken(token)
// //       } else {
// //         isLogin.value = false
// //         removeAuthToken()
// //       }
// //     })

// //     const login = (token) => {
// //       accessToken.value = token
// //       isLogin.value = true

// //       setAuthToken(token)

// //       getCurrentMemberInfo()
// //         .then((res) => {
// //           console.log(res)
// //           user.value = res.data
// //         })
// //         .catch((err) => {
// //           console.log(err)
// //         })
// //     }

// //     const logout = () => {
// //       accessToken.value = ''
// //       isLogin.value = false
// //     }

// //     const likeDeal = ref([]); // 사용자가 좋아요를 누른 아파트 ID 목록
// //     const favoriteApt = ref([]); // 즐겨찾기 저장소
// //     // const userInfo: null; // 사용자 정보
// //     const favoriteRegions = ref([
// //       { name: "서울특별시 강남구 역삼동" },
// //       { name: "서울특별시 강동구 명일동" },
// //     ]); // 관심 지역 목록


// //     // 즐겨찾기 추가
// //     const addFavorite = (apartmentId) => {
// //         if (!favoriteApt.includes(apartmentId)) {
// //             favoriteApt = [...favoriteApt, apartmentId]; // 새로운 배열 생성
// //         }
// //     }
// //     // 즐겨찾기 제거
// //     const removeFavorite = (apartmentId) => {
// //         favoriteApt = favoriteApt.filter((id) => id !== apartmentId);
// //     }
// //     // 즐겨찾기 여부 확인
// //     const isFavorited = (apartmentId) => {
// //         return favoriteApt.includes(apartmentId);
// //     }

// //     // 좋아요 추가
// //     const addLike = (dealId) => {
// //         if (!likeDeal.includes(dealId)) {
// //             likeDeal = [...likeDeal, dealId]; // 새로운 배열 생성
// //         }
// //     }
// //     // 좋아요 제거
// //     const removeLik = (dealId) => {
// //         likeDeal = likeDeal.filter((id) => id !== dealId);
// //     }
// //     // 좋아요 여부 확인
// //     const isLiked = (dealId) => {
// //         return likeDeal.includes(dealId);
// //     }

// //     // 사용자 정보 설정
// //     const setUserInfo = (userInfo) => {
// //         user = userInfo;
// //     }
// //     // 사용자 정보 초기화
// //     const resetUserInfo = () => {
// //         userInfo = null;
// //         likeDeal = [];
// //         favoriteApt = [];
// //         favoriteRegions = [];
// //     }

// //     // // 관심 지역 추가
// //     // const addFavoriteRegion = (region) => {
// //     //     // 중복 확인 후 추가
// //     //     const exists = favoriteRegions.some((favRegion) => favRegion.name === region.name);
// //     //     if (!exists) {
// //     //         favoriteRegions = [...favoriteRegions, region];
// //     //         alert(`현재 지역 (${region.name})이 관심 지역에 추가되었습니다.`);
// //     //     } else {
// //     //         alert("이미 등록된 관심 지역입니다."); // 중복 시 알림
// //     //     }
// //     // }
// //     // // 관심 지역 제거
// //     // const removeFavoriteRegion = (region) => {
// //     //     favoriteRegions = favoriteRegions.filter((item) => item.name !== region.name);
// //     // }


// //     // 관심 지역 추가
// //     const addFavoriteRegion = (region) => {
// //       // 중복 확인 후 추가
// //       const exists = favoriteRegions.some((favRegion) => favRegion.name === region.name);
// //       if (!exists) {
// //         favoriteRegions.push(region); // 기존 배열에 값 추가
// //         alert(`현재 지역 (${region.name})이 관심 지역에 추가되었습니다.`);
// //       } else {
// //         alert("이미 등록된 관심 지역입니다."); // 중복 시 알림
// //       }
// //     };

    
// //     // 관심 지역 제거
// //     const removeFavoriteRegion = (region) => {
// //       const index = favoriteRegions.findIndex((item) => item.name === region.name);
// //       if (index !== -1) {
// //         favoriteRegions.splice(index, 1); // 기존 배열에서 값 제거
// //       }
// //     };


// //     // 관심 지역 전체 조회
// //     const getFavoriteRegions = () => {
// //         return favoriteRegions;
// //     }

// //     return {
// //       user,
// //       isLogin,
// //       accessToken,
// //       logout,
// //       login,
// //       addFavorite,
// //       removeFavorite,
// //       isFavorited,
// //       addLike,
// //       isLiked,
// //       setUserInfo,
// //       resetUserInfo,
// //       addFavoriteRegion,
// //       removeFavoriteRegion,
// //       getFavoriteRegions,
// //     }
// //   },
// //   {
// //     persist: { storage: sessionStorage },
// //   }
// // )

import { getCurrentMemberInfo } from '@/api/user'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { removeAuthToken, setAuthToken } from '@/utils/request'
import { ROLES } from '@/utils/user'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const user = ref({})
    const isLogin = ref(false)
    const accessToken = ref('')
    const favoriteRegions = ref([])

    watch(accessToken, (token) => {
      if (token) {
        isLogin.value = true
        setAuthToken(token)
      } else {
        isLogin.value = false
        removeAuthToken()
      }
    })

    const login = (token) => {
      accessToken.value = token
      isLogin.value = true

      setAuthToken(token)

      getCurrentMemberInfo()
        .then((res) => {
          console.log(res)
          user.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // 관심 지역 추가
    const addFavoriteRegion = (region) => {
      // 중복 확인 후 추가
      const exists = favoriteRegions.value.some((favRegion) => favRegion.name === region.name);
      if (!exists) {
        favoriteRegions.value.push(region); // 기존 배열에 값 추가
        alert(`현재 지역 (${region.name})이 관심 지역에 추가되었습니다.`);
      } else {
        alert("이미 등록된 관심 지역입니다."); // 중복 시 알림
      }
    };

    const logout = () => {
      accessToken.value = ''
      isLogin.value = false
      user.value = { memberRole: ROLES.guest }
      router.replace({ name: 'login' })
    }

    return {
      user,
      isLogin,
      accessToken,
      favoriteRegions,
      logout,
      login,
      addFavoriteRegion,
    }
  },
  {
    persist: { storage: sessionStorage },
  }
)
