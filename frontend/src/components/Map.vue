<!-- <script setup>
import FilterPanel from "@/components/FilterPanel.vue";
import RegionFilter from "@/components/filter/RegionFilter.vue";
import ReviewList from "@/components/review/ReviewList.vue";

import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user"; // 관심지역 관리를 위한 Store
import { useAuthStore } from "@/stores/auth";

const map = ref();
const coordinate = {
  lat: 37.501448,
  lng: 127.039603,
};

const markerInfoList = ref([]);
const userStore = useUserStore(); // 관심 지역 저장에 사용
const authStore = useAuthStore(); // 로그인/로그아웃에 사용

const isLoggedIn = computed(() => authStore.isAuthenticated); // 로그인 여부

let geocoder;

// 아코디언 상태 관리
const isFilterPanelOpen = ref(false); // FilterPanel 상태

// 지도 로드 시 호출되는 함수
const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성
};

// 현재 지도 중심 좌표에서 법정동 코드와 주소 가져오기
const getCurrentRegionInfo = async () => {
  if (!map.value || !geocoder) return;

  const centerCoords = map.value.getCenter();

  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(centerCoords.getLng(), centerCoords.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const regionInfo = result.find((item) => item.region_type === "B");
        if (regionInfo) {
          resolve({
            name: regionInfo.address_name, // 법정동 이름
            code: regionInfo.code, // 법정동 코드
          });
        } else {
          reject("법정동 정보를 찾을 수 없습니다.");
        }
      } else {
        reject("주소 검색에 실패했습니다.");
      }
    });
  });
};

const router = useRouter();

// 관심 지역에 현재 중심 좌표 추가
const addCurrentRegionToFavorites = async () => {
  try {
    if (!isLoggedIn.value) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    const regionInfo = await getCurrentRegionInfo();
    if (regionInfo) {
      userStore.addFavoriteRegion(regionInfo); // Store에 관심 지역 추가
    }
  } catch (error) {
    console.error(error);
    alert("현재 지역을 추가하는 데 실패했습니다.");
  }
};

// 장소 검색 및 마커 추가
const searchPlace = (query) => {
  if (!query || !map.value) return;

  geocoder.addressSearch(query, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      markerInfoList.value = [
        {
          lat: result[0].y,
          lng: result[0].x,
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${query}</div>`,
        },
      ];

      map.value.setCenter(coords);
    } else {
      alert("주소를 다시 확인하세요.");
    }
  });
};

const props = defineProps({
  isReviewsHidden: {
    type: Boolean,
    default: false,
  },
});

const toggleReviewsHidden = () => {
  isReviewsHidden.value = true; // 리뷰 숨기기 상태로 변경
};

// const emit = defineEmits(["update:isReviewsHidden"]);

// const toggleReviewsHidden = () => {
//   emit("update:isReviewsHidden", true); // 부모 컴포넌트로 상태 변경 요청
// };


</script>

<template>
  <div class="d-flex">
    <v-container class="filter-container m-0">
      <div v-if="!isReviewsHidden" class="review-list-container">
        <ReviewList @collapse="toggleReviewsHidden" />
      </div>
      <v-card class="search-card">
        <div class="search-header">
          <RegionFilter @updateSearchQuery="searchPlace" />
          <v-btn variant="text" icon="mdi-magnify">
          </v-btn>
          <v-btn class="accordion-toggle" variant="text" @click="isFilterPanelOpen = !isFilterPanelOpen">
            <v-icon :class="{ rotated: isFilterPanelOpen }" class="search-condition">mdi-chevron-down</v-icon>
            <span class="search-condition"> 검색 조건</span>
          </v-btn>
        </div>

        <transition name="accordion">
          <div v-if="isFilterPanelOpen" class="filter-panel">
            <FilterPanel />
          </div>
        </transition>
      </v-card>
    </v-container>
    <div class="map-container">
      <KakaoMap class="map" :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
        @onLoadKakaoMap="onLoadKakaoMap">
        <KakaoMapMarker v-for="(marker, index) in markerInfoList" :key="index" :lat="marker.lat" :lng="marker.lng"
          :content="marker.content" :clickable="true" />
      </KakaoMap>
    </div>

    <v-btn class="plus-btn" color="primary" @click="addCurrentRegionToFavorites">
      <v-icon>{{ "mdi-playlist-plus" }}</v-icon>
      <v-spacer></v-spacer>현재 지역을 관심지역에 추가
    </v-btn>

  </div>
</template> -->


<script setup>
import FilterPanel from "@/components/FilterPanel.vue";
import RegionFilter from "@/components/filter/RegionFilter.vue";
import ReviewList from "@/components/review/ReviewList.vue";

import { KakaoMap, KakaoMapMarker, KakaoMapCustomOverlay } from "vue3-kakao-maps";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user"; // 관심지역 관리를 위한 Store
import { storeToRefs } from 'pinia'

import { useAuthStore } from "@/stores/auth";


import axios from "axios";


import { useHouseStore } from "@/stores/house"; // house CRUD

const houseStore = useHouseStore();

// Dropdown 관련 상태 관리
const cities = ref([]); // 시 데이터
const districts = ref([]); // 구/군 데이터
const subDistricts = ref([]); // 동 데이터

const selectedCity = ref("서울특별시");
const selectedDistrict = ref("강남구");
const selectedSubDistrict = ref("역삼동");
const dealType = ref("APT"); // apartment CRUD

let markers = []
let overlays = []


const searchHouses = async () => {
  const { value: selectedCityValue } = selectedCity || { };
  const { value: selectedDistrictValue } = selectedDistrict || {};
  const { value: selectedSubDistrictValue } = selectedSubDistrict || {};

  try {
    await houseStore.loadHouses(
      selectedCityValue,
      selectedDistrictValue,
      selectedSubDistrictValue,
      dealType // 아파트 타입 고정
    );
    // console.log('Houses loaded:', houseStore.houses);
  } catch (error) {
    console.error('Failed to search apartments:', error);
  }
}

houseStore.loadHouses("서울특별시", "강남구", "개포동", "APT"); // apartment CRUD
// const houses = computed(() => houseStore.houses); // apartment CRUD
const { houses } = storeToRefs(houseStore)
console.log(houses.value)
// console.log('houses:', houses.value);


const map = ref();
const coordinate = {
  lat: 37.396,
  lng: 127.110,
};

// const markerInfoList = ref([]);
const userStore = useUserStore(); // 관심 지역 저장에 사용
// const authStore = useAuthStore(); // 로그인/로그아웃에 사용

const isLoggedIn = computed(() => userStore.isLogin); // 로그인 여부


const router = useRouter();

const goTo = (id) => {
  router.push({ name: "house-detail", params: { id } });
}


let geocoder;

// 아코디언 상태 관리
const isFilterPanelOpen = ref(false); // FilterPanel 상태

// 지도 로드 시 호출되는 함수
let bounds = null; // LatLngBounds 객체

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성
  bounds = new kakao.maps.LatLngBounds(); // LatLngBounds 객체 생성
  // console.log("onloadmap houses loaded:", houses);

  // 초기 houses 데이터 반영
  updateMarkers(houses.value);
};



// 마커 및 지도 경계 업데이트 함수
const updateMarkers = (houses) => {
  bounds = new kakao.maps.LatLngBounds();

  houses.forEach((house) => {
    const position = new kakao.maps.LatLng(house.latitude, house.longitude);
    // 경계 확장
    bounds.extend(position);
  });

  if (houses.length > 0) {
    map.value.setBounds(bounds);
  } else {
    // console.warn("No valid houses to update markers.");
  }
};

watch(houses, (newHouses) => {
  if (map.value) {
    updateMarkers(newHouses);
  }
}, { deep: true });


const setBounds = () => {
  // LatLngBounds로 지도 범위를 재설정
  if (map.value !== undefined) {
    map.value.setBounds(bounds);
  }
};



// 현재 지도 중심 좌표에서 법정동 코드와 주소 가져오기
const getCurrentRegionInfo = async () => {
  if (!map.value || !geocoder) return;

  const centerCoords = map.value.getCenter();

  return new Promise((resolve, reject) => {
    geocoder.coord2RegionCode(centerCoords.getLng(), centerCoords.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const regionInfo = result.find((item) => item.region_type === "B");
        if (regionInfo) {
          resolve({
            name: regionInfo.address_name, // 법정동 이름
            code: regionInfo.code, // 법정동 코드
          });
        } else {
          reject("법정동 정보를 찾을 수 없습니다.");
        }
      } else {
        reject("주소 검색에 실패했습니다.");
      }
    });
  });
};


// 관심 지역에 현재 중심 좌표 추가
const addCurrentRegionToFavorites = async () => {
  try {
    if (!isLoggedIn.value) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    const regionInfo = await getCurrentRegionInfo();
    if (regionInfo) {
      console.log(regionInfo);
      userStore.addFavoriteRegion(regionInfo); // Store에 관심 지역 추가
    }
  } catch (error) {
    console.error(error);
    alert("현재 지역을 추가하는 데 실패했습니다.");
  }
};


const markerInfoList = ref([]);
// 장소 검색 및 마커 추가
const searchPlace = (query) => {
  if (!query || !map.value) return;

  geocoder.addressSearch(query, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      markerInfoList.value = [
        {
          lat: result[0].y,
          lng: result[0].x,
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${query}</div>`,
        },
      ];

      map.value.setCenter(coords);
    } else {
      alert("주소를 다시 확인하세요.");
    }
  });
};


const props = defineProps({
  isReviewsHidden: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["collapse-reviews"]);

// 리뷰 숨기기 요청
const collapseReviews = () => {
  emit("collapse-reviews");
};



// 시 데이터 로드
const loadCities = async () => {
  try {
    const response = await axios.get("http://localhost:8080/regions/sidos");
    cities.value = response.data.data.map((city) => ({
      name: city,
      value: city,
    }));
    // console.log("cities:", cities.value);
  } catch (error) {
    console.error("Failed to load cities", error);
  }
};

// 구/군 데이터 로드
const loadDistricts = async (cityName) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/regions/${cityName}/guguns`
    );
    districts.value = response.data.data.map((district) => ({
      name: district,
      value: district,
    }));
  } catch (error) {
    console.error("Failed to load districts", error);
  }
};

// 동 데이터 로드
const loadSubDistricts = async (cityName, districtName) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/regions/${cityName}/${districtName}/dongs`
    );
    subDistricts.value = response.data.data.map((subDistrict) => ({
      name: subDistrict,
      value: subDistrict,
    }));
  } catch (error) {
    console.error("Failed to load sub-districts", error);
  }
};

// 시 선택 시 구/군 목록 로드
watch(selectedCity, (newValue) => {
  if (newValue) {
    loadDistricts(newValue.value);
    selectedDistrict.value = null;
    subDistricts.value = []; // 구/군이 선택되면 동 목록 초기화
  }
});

// 구/군 선택 시 동 목록 로드
watch(selectedDistrict, (newValue) => {
  if (newValue && selectedCity.value) {
    loadSubDistricts(selectedCity.value.value, newValue.value);
    selectedSubDistrict.value = null; // 동 선택 초기화
  }
});

// 시 데이터를 처음 로드
loadCities();


// 평형/가격 계산
import { meterToPyung, koreanPrice } from '@/utils/house'



</script>

<template>
  <div class="d-flex">

    <v-container class="filter-container m-0">
      <div v-if="!isReviewsHidden" class="review-list-container">
        <ReviewList @collapse="collapseReviews" />
      </div>

      <!-- <v-card class="search-card">
        
      </v-card> -->

      <div class="search-sido-gugun">
        <!-- <div class="search-address">
          <div class="search-header">
            <RegionFilter @updateSearchQuery="searchPlace" />
            <v-btn variant="text" icon="mdi-magnify">
            </v-btn>
            <v-btn class="accordion-toggle" variant="text" @click="isFilterPanelOpen = !isFilterPanelOpen">
              <v-icon :class="{ rotated: isFilterPanelOpen }" class="search-condition">mdi-chevron-down</v-icon>
              <span class="search-condition"> 검색 조건</span>
            </v-btn>
          </div>

          
        </div> -->
        <div class="select-sido">
          <div class="d-flex">
            <!-- 시 선택 -->
            <select v-model="selectedCity" class="dropdown">
              <option disabled value="" selected hidden>시를 선택하세요</option>
              <option v-for="city in cities" :key="city.value" :value="city">
                {{ city.name }}
              </option>
            </select>
            <!-- <v-select
              v-model="selectedCity"
              :items="cities.name"
              item-value="value"
              item-text="name"
              label="시를 선택하세요"
              outlined
              density="compact"
              class="dropdown"
            ></v-select> -->

            <!-- 구/군 선택 -->
            <select v-model="selectedDistrict" class="dropdown" :disabled="!selectedCity">
              <option v-for="district in districts" :key="district.value" :value="district">
                {{ district.name }}
              </option>
            </select>
            <!-- <v-select
              v-model="selectedDistrict"
              :items="districts"
              item-value="value"
              item-text="name"
              label="구를 선택하세요"
              outlined
              dense
              class="dropdown"
              :disabled="!selectedCity"
            ></v-select> -->

            <!-- 동 선택 -->
            <select v-model="selectedSubDistrict" class="dropdown" :disabled="!selectedDistrict">
              <option v-for="subDistrict in subDistricts" :key="subDistrict.value" :value="subDistrict">
                {{ subDistrict.name }}
              </option>
            </select>
            <!-- <v-select
              v-model="selectedSubDistrict"
              :items="subDistricts"
              item-value="value"
              item-text="name"
              label="동을 선택하세요"
              outlined
              dense
              class="dropdown"
              :disabled="!selectedDistrict"
            ></v-select> -->

            <!-- 검색 버튼 -->
            <v-btn @click="searchHouses" class="search-button ml-2" icon="mdi-magnify" variant="text"
              size="small"></v-btn>

            <v-btn class="accordion-toggle" variant="text" @click="isFilterPanelOpen = !isFilterPanelOpen">
              <v-icon :class="{ rotated: isFilterPanelOpen }" class="search-condition">mdi-chevron-down</v-icon>
              <span class="search-condition"> 검색 조건</span>
            </v-btn>
          </div>
          
        </div>
        <transition name="accordion">
          <div v-if="isFilterPanelOpen" class="filter-panel">
            <div class="d-flex" style="max-width:800px">
            <RegionFilter @updateSearchQuery="searchPlace" />
            <FilterPanel />
            </div>
          </div>
        </transition>
      </div>

      <!-- <v-card class="search-card">
        <div class="search-header">
          <RegionFilter @updateSearchQuery="searchPlace" />
          <v-btn variant="text" icon="mdi-magnify">
          </v-btn>
          <v-btn class="accordion-toggle" variant="text" @click="isFilterPanelOpen = !isFilterPanelOpen">
            <v-icon :class="{ rotated: isFilterPanelOpen }" class="search-condition">mdi-chevron-down</v-icon>
            <span class="search-condition"> 검색 조건</span>
          </v-btn>
        </div>

        <transition name="accordion">
          <div v-if="isFilterPanelOpen" class="filter-panel">
            <FilterPanel />
          </div>
        </transition>
      </v-card> -->
    </v-container>


    <div class="map-container">
      <KakaoMap class="map" :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true"
        @onLoadKakaoMap="onLoadKakaoMap">

        <div v-for="house in houses" :key="house.houseId">
          <!-- <KakaoMapMarker v-if="house.latitude && house.longitude" :lat="house.latitude" :lng="house.longitude" /> -->
          <KakaoMapCustomOverlay v-if="house.latitude && house.longitude" :lat="house.latitude" :lng="house.longitude"
            :yAnchor="1.3" :xAnchor="1" @click="goTo(house.houseId)">

            <div class="marker-container">
              <div class="button-box" @click="goTo(house.houseId)">
                <font-awesome-icon :icon="['fas', 'building']" />
              </div>
              <div>
                <div class="text-box-area"><span>
                    {{ meterToPyung(house.deal.exclusiveArea) }} 평</span>
                </div>

                <div class="text-box-price">{{ koreanPrice(house.deal.price) }}</div>
              </div>
            </div>

          </KakaoMapCustomOverlay>
        </div>
      </KakaoMap>

    </div>

    <!-- 지도 범위 재설정 버튼 -->
    <v-btn class="set-bounds-btn" color="primary" @click="setBounds">
      <v-icon>{{ "mdi-map-outline" }}</v-icon>
      지도 범위 재설정
    </v-btn>

    <v-btn class="plus-btn" color="primary" @click="addCurrentRegionToFavorites">
      <v-icon>{{ "mdi-playlist-plus" }}</v-icon>
      <v-spacer></v-spacer>현재 지역을 관심지역에 추가
    </v-btn>

  </div>
</template>


<style scoped>
.map-container {
  /* flex-grow: 1; */
  width: 100%;
  height: 100%;
  max-height: 90vh;
  overflow: hidden !important;
}

.map {
  position: absolute;
  left: 280px;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
}

.filter-container {
  width: 0px;
  padding: 0;
  z-index: 3;
}

.search-card {
  width: calc(100vw - 60px - 400px);
  max-width: calc(100vw - 60px - 400px);
  margin: 0 auto;
  padding: 1rem;
  z-index: 10;
  background-color: #fffffff1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plus-btn {
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  color: white;
  background-color: var(--vt-c-navy);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: max-height transform 0.3s;
}

.plus-btn:hover {
  transform: scale(1.1);
}

/* 아코디언 전환 효과 */
.accordion-enter-active,
.accordion-leave-active {
  transition: 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px;
  overflow: hidden;
}

.accordion-toggle {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
}

.accordion-toggle .mdi-chevron-down {
  transition: transform 0.2s ease;
}

.accordion-toggle .mdi-chevron-down.rotated {
  transform: rotate(180deg);
}


.filter-panel {
  position: absolute; /* select-sido 기준으로 위치 설정 */
  top: 100%; /* select-sido 바로 아래에 표시 */
  right: 0;
  width: 100%; /* select-sido와 동일한 너비 */
  background-color: var(--vt-c-navy);
  padding-left: 0.9rem;
  /* padding: 1rem; */
  /* border-radius: 10px; */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10; /* 다른 요소 위로 표시 */
}

/* .filter-buttons {
  margin: 50px;
} */


.search-condition {
  font-size: 0.8rem;
}



.review-list-container {
  /* padding: 16px; */
  background-color: #f7f9fc;
  border-left: 1px solid rgba(107, 107, 107, 0.1);
  position: absolute;
  z-index: 30;
  width: 350px;
  height: 100vh;
  overflow-y: auto;
}


.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review-title {
  font-weight: bold;
}

.custom-overlay {
  background: #E73C3C;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  font-size: 13px;
  width: 250px;
}

.custom-overlay .info h4 {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px;
}

.custom-overlay .info p {
  font-size: 12px;
  color: #555;
  margin: 0 0 10px;
}

.custom-overlay .details {
  display: flex;
  justify-content: space-between;
}

.custom-overlay .details .size {
  font-size: 10px;
  color: #007aff;
}

.custom-overlay .details .price {
  /* font-size: 10px; */
  font-weight: bold;
  color: #E73C3C;
}

.info-win {
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.text-info {
  font-size: 10px;
  font-weight: bold;
  margin-right: 10px;
}

.link-info {
  flex: 0 0 30%;
  /* 고정된 30% 영역 */
  text-decoration: none;
  text-align: center;
  color: white;
  background-color: rgb(155, 223, 138);
  padding: 10px 0;
  font-size: 18px;
  border-left: 2px solid #e0e0e0;
  /* 구분선 추가 */
}

.marker-container {
  display: flex;
  align-items: center;
  background-color: rgb(255, 231, 231);
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
}

.marker-container:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 31px 10px 0;
  border-color: rgb(255, 231, 231) transparent;
  display: block;
  width: 0;
  z-index: 1;
  bottom: -28px;
  right: 10px;
}

.marker-container:before {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 31px 10px 0;
  border-color: rgba(0, 0, 0, 0.2) transparent;
  display: block;
  width: 0;
  z-index: 0;
  bottom: -29px;
  right: 10px;
}


.search-button {
  height: 20px;
}


.text-box-area {
  padding: 10px 15px 0 15px;
  margin-bottom: -5px;
  align-content: center;
  
  white-space: nowrap;
  font-size: 9px;
  font-weight: bold;

  display: flex;
  /* Flexbox 활성화 */
  align-items: center;
  /* 세로 가운데 정렬 */
  justify-content: center;
  /* 가로 가운데 정렬 */
}

.text-box-area span {
  padding: 0 auto;
  color: #d12e2e;
  font-size: 11px;
  font-weight: bold;
}

.text-box-price {
  padding: 0 15px 10px 15px;
  color: black;
  white-space: nowrap;
  font-size: 15px;
  font-weight: bold;
}

.button-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #E73C3C;
  padding: 20px 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.button-box:hover {
  background-color: #d32f2f;
  color: white;
}



.btn {
  font-size: 18px;
  padding: 5px 10px;
  height: 110%;
}

.set-bounds-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 10;
  color: white;
  background-color: #1e88e5;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.set-bounds-btn:hover {
  background-color: #1565c0;
}

.search-sido-gugun {
  position: absolute;
  width: 100%;
  min-width: 800px;
  height: 80px;
  gap: 8px;
  top: 0;
  left: 460px;
  z-index: 20;
  background-color: var(--vt-c-navy);
  color: white;
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px 10px 20px;
}

.dropdown {
  padding: 8px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 140px;
  background-color: white;
  /* 드롭다운 배경색 */
  color: #333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-address {
  /* max-width: 100%; */
  width: 30rem;
  max-width: 40%;
  position: absolute;
  left: calc(480px);
}

.select-sido {
  margin: auto 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}


</style>







