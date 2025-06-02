<template>
    <v-container class="apt-type-container">
        <v-row align="center">
            <!-- Chip 목록 -->
            <v-col v-for="(option, index) in options" :key="index" cols="auto" class="py-1 pe-0">
                <v-chip class="chip" :color="isSelected(option) ? 'pink-darken-2' : 'grey lighten-5'"
                    :outlined="!isSelected(option)" @click="toggleSelection(option)">
                    {{ option }}
                </v-chip>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
import { ref, defineExpose } from "vue";

// 선택 가능한 옵션
const options = ref(["아파트", "빌라", "오피스텔"]);

// 선택된 옵션
const AptTypeSelectedOptions = ref([]);

// 선택 여부 확인
const isSelected = (option) => AptTypeSelectedOptions.value.includes(option);

// 선택/해제 토글
const toggleSelection = (option) => {
    if (isSelected(option)) {
        // 이미 선택된 경우 제거
        AptTypeSelectedOptions.value = AptTypeSelectedOptions.value.filter(
            (item) => item !== option
        );
    } else {
        // 선택된 경우 추가
        AptTypeSelectedOptions.value.push(option);
    }
};

// 초기화 메서드
const reset = () => {
    AptTypeSelectedOptions.value = [];
};

// 부모 컴포넌트에서 reset 메서드를 호출할 수 있도록 노출
defineExpose({
    reset,
});
</script>

<style scoped>

.v-container {
    padding: 0 0 0 1rem;
}
.v-row {
    margin: 0;
}

.v-col {
    padding-left: 0;
}

.apt-type {
    margin-top: -1.7rem;
}

.filter-label {
    font-weight: bold;
    font-size: 0.7rem;
    margin-bottom: 0;
}

.chip {
    font-size: 0.9rem;
    font-weight: bold;
    margin-right: 0.5rem;
    cursor: pointer;
}

/* .apt-type-container {
    background-color: white;
} */
</style>


