<template>
    <v-card class="apartment-item" v-if="apartment">
        <div class="d-flex">
            <div class="img-container">
                <img src="@/assets/default-apt-img.jpg" alt="apartment image" class="apartment-image" />
                <!-- 하트 아이콘 -->
                <font-awesome-icon  @click="toggleLike" 
                    :icon="[isLiked ? 'fas' : 'far', 'heart']" 
                    class="ml-2 like-icon" 
                    :class="{ liked: apartment.likedStatus }"
                />
            </div>
            <div class="pt-2" @click="selectApartment" >
                <v-card-title> <font-awesome-icon :icon="['fas', 'building']" class="mr-1" /> {{ apartment.name }}
                    
                </v-card-title>
                <v-card-text>
                    <small class="build-info mt-1">{{ apartment.buildYear }}년 준공</small>
                    <p class="loc-info"><font-awesome-icon :icon="['fas', 'location-dot']" /> {{ apartment.region.sido
                        }} {{
                        apartment.region.gugun }} {{ apartment.region.dong }} {{ apartment.road }}</p>

                </v-card-text>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { createHouseLike, deleteHouseLike } from "@/api/houses";
import { toggleFavorite } from "@/api/favorite";

const props = defineProps({
    apartment: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["apartment-selected"]);

const router = useRouter();

const selectApartment = () => {
    // emit("apartment-selected", props.apartment);
    router.push({ name: "house-detail", params: { id: props.apartment.houseId } });
};

// 초기 관심 상태
const isLiked = ref(false);
const userStore = useUserStore();

// 컴포넌트가 마운트될 때 초기 관심 상태 확인
onMounted(() => {
    // isLiked.value = props.apartment.value.likeStatus;
});

const toggleLike = (apartment) => {
  if (apartment) apartment.likeStatus = !apartment.likedStatus;
  if (apartment.likedStatus) {
    createHouseLike(apartment.houseId);
  } else {
    deleteHouseLike(apartment.houseId);
  }
}


</script>

<style scoped>
.apartment-item {
    margin-bottom: 1rem;
    cursor: pointer;
    background-color: #ffffff;
    transition: transform 0.2s ease-in-out;
}

.apartment-item:hover {
    transform: translateY(-5px);
}

.v-card-title {
    font-size: 1.05rem;
    font-weight: bold;
    color: rgb(12, 35, 58);
}

.loc-info {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: 0em;
    margin-bottom: 0.5rem;
    color: #8e8e8e;
}

.build-info {
    font-size: 0.6rem;
    color : black;
    /* font-weight: bold; */
}

.apartment-image {
    width: 120px;
    height: 100%;
    object-fit: cover;
}

.like-icon {
    position: absolute;
    left: 5px;
    top: 10px;
    cursor: pointer;
    color: gray;
    transition: color 0.3s ease;
}

.like-icon.liked {
    color: red;
}
</style>

