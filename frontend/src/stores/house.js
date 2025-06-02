// src/stores/apartment.js
import { defineStore } from "pinia";
import axios from "axios";

export const useHouseStore = defineStore("house", {
    state: () => ({
        isNow: true,
        sortCondition: "latest", // 정렬 조건
        houses: [],
        isLoading: false,
        selectedApartment: null,
        error: null,
    }),
    getters: {
        sortedHouses(state) {
        if (!Array.isArray(state.houses)) {
            // console.warn("houses is not an array:", state.houses);
            return state.houses || []; // 배열이 아닌 경우 빈 배열 반환
        }

        const sorted = [...state.houses]; // 배열 복사
        switch (state.sortCondition) {
            case "latest":
                return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            case "favorites":
                return sorted.sort((a, b) => b.favorites - a.favorites);
            default:
                return sorted;
        }
    },
        // sortedHouses(state) {
        //     const sorted = [...state.houses];
        //     console.log("sortedHouses:", sorted);
        //     switch (state.sortCondition) {
        //         case "latest":
        //             return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        //         case "favorites":
        //             return sorted.sort((a, b) => b.favorites - a.favorites);
        //         default:
        //             return sorted;
        //     }
        // },
    },
    actions: {
        // 서버에서 houses 데이터 로드
        async loadHouses(sido, gugun, dong, houseType) {
            this.isLoading = true;
            this.error = null;
            // console.log("loadHouses:", sido, gugun, dong, houseType);
            try {
                const response = await axios.get("http://localhost:8080/houses", {
                    params: { 
                        sido: sido?.value || sido,
                        gugun: gugun?.value || gugun,
                        dong: dong?.value || dong,
                        houseType: houseType?.value || houseType,},
                    // required: true,
                });
                this.houses = response.data.houses; // 서버에서 가져온 데이터를 저장
                // console.log("Loaded houses:", this.houses);
            } catch (error) {
                this.error = error.message || "Failed to load houses";
                console.error("loadHouses Error:", error);
            } finally {
                this.isLoading = false;
            }
        },
        selectHouse(apartment) {
            this.selectedHouse = apartment;
        },
        setIsNow(value) {
            this.isNow = value;
        },
        setSortCondition(condition) {
            this.sortCondition = condition;
        },
        getHouseById(id) {
            return this.houses.find((house) => house.id === id);
        },
        updateLikeCount(id, newLikeCount) {
            const house = this.getHouseById(id);
            if (house) {
                house.like = newLikeCount;
            } else {
                console.error(`아파트 ID ${id}를 찾을 수 없습니다.`);
            }
        },  
    },
    // actions: {
    //     // 서버에서 houses 데이터 로드
    //     async loadHouses(sido, gugun, dong, houseType) {
    //         this.isLoading = true;
    //         this.error = null;
    //         try {
    //             const data = await fetchHouses(sido, gugun, dong, houseType);
    //             this.houses = data; // 서버에서 가져온 데이터를 저장
    //         } catch (error) {
    //             this.error = error.message || 'Failed to load houses';
    //         } finally {
    //             this.isLoading = false;
    //         }
    //     },
    // },



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
    // actions: {
    //     // selectApartment(house) {
    //     //     this.selectedApartment = apartment;
    //     // },
    //     setIsNow(value) {
    //         this.isNow = value;
    //     },
    //     setSortCondition(condition) {
    //         this.sortCondition = condition;
    //     },
    //     getApartmentById(id) {
    //         return this.houses.find((apartment) => apartment.id === id);
    //     },
    //     // 특정 아파트의 좋아요 수를 업데이트
    //     updateLikeCount(id, newLikeCount) {
    //         const apartment = this.getApartmentById(id);
    //         if (apartment) {
    //             apartment.like = newLikeCount;
    //         } else {
    //             console.error(`아파트 ID ${id}를 찾을 수 없습니다.`);
    //         }
    //     },
    // },
});
