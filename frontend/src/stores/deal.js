// src/stores/apartment.js
import { defineStore } from "pinia";
import axios from "axios";

export const useApartmentStore = defineStore("apartment", {
    state: () => ({
        // apartments: [], // SQL에서 가져온 아파트 목록
        // selectedApartment: null, // 선택된 아파트

        apartments: [
          { id: 1, name: "롯데캐슬아파트 7단지", price: "6억", dong: 701, floor: "5층", type: "매매", size: 84, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: 'https://via.placeholder.com/40' },
          { id: 2, name: "롯데캐슬아파트 7단지", price: "6.5억", dong: 709, floor: "2층", type: "매매", size: 84, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 3, name: "롯데캐슬아파트 7단지", price: "3억", dong: 703, floor: "7층", type: "전세", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: '@/assets/apt_profile_ex.png' },
          { id: 4, name: "롯데캐슬아파트 7단지", price: "6.8억", dong: 711, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 5, name: "롯데캐슬아파트 7단지", price: "6.2억", dong: 704, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 6, name: "롯데캐슬아파트 7단지", price: "2.8억", dong: 702, floor: "7층", type: "전세", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 7, name: "롯데캐슬아파트 7단지", price: "5.8억", dong: 704, floor: "5층", type: "매매", size: 84, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 8, name: "롯데캐슬아파트 7단지", price: "6.6억", dong: 701, floor: "2층", type: "매매", size: 84, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 9, name: "롯데캐슬아파트 7단지", price: "6.4억", dong: 706, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 10, name: "롯데캐슬아파트 7단지", price: "6.2억", dong: 701, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 11, name: "롯데캐슬아파트 7단지", price: "6억", dong: 709, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
          { id: 12, name: "롯데캐슬아파트 7단지", price: "6.9억", dong: 702, floor: "7층", type: "매매", size: 100, distance: 5, like: 10, dealerName: '김중개', dealerId:10234, address: '경기도 성남시 분당구 판교로21', image: "@/assets/apt_profile_ex.png" },
        ],
        selectedApartment: null,
        isNow: true,
        sortCondition: "latest", // 정렬 조건
    }),
    getters: {
        sortedApartments(state) {
            const sorted = [...state.apartments];
            switch (state.sortCondition) {
                case "latest":
                    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                case "oldest":
                    return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
                case "favorites":
                    return sorted.sort((a, b) => b.favorites - a.favorites);
                default:
                    return sorted;
            }
        },
    },
    // actions: {
    //     // SQL에서 아파트 목록 가져오기
    //     async fetchApartments(filter = {}) {
    //         try {
    //             const response = await axios.get("/api/apartments", { params: filter });
    //             this.apartments = response.data; // 서버에서 받은 데이터를 스토어에 저장
    //         } catch (error) {
    //             console.error("아파트 목록 가져오기 실패:", error);
    //         }
    //     },

    //     // 특정 아파트 정보 가져오기
    //     async fetchApartmentById(id) {
    //         try {
    //             const response = await axios.get(`/api/apartments/${id}`);
    //             this.selectedApartment = response.data;
    //         } catch (error) {
    //             console.error("아파트 정보 가져오기 실패:", error);
    //         }
    //     },
    // },
    actions: {
        selectApartment(apartment) {
            this.selectedApartment = apartment;
        },
        setIsNow(value) {
            this.isNow = value;
        },
        setSortCondition(condition) {
            this.sortCondition = condition;
        },
        getApartmentById(id) {
            return this.apartments.find((apartment) => apartment.id === id);
        },
        // 특정 아파트의 좋아요 수를 업데이트
        updateLikeCount(id, newLikeCount) {
            const apartment = this.getApartmentById(id);
            if (apartment) {
                apartment.like = newLikeCount;
            } else {
                console.error(`아파트 ID ${id}를 찾을 수 없습니다.`);
            }
        },
    },
});
