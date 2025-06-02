<template>
    <!-- goBack 버튼 추가 -->
    <v-card class="mx-auto" max-width="344" title="회원가입">
        <v-container>
            <!-- 이름 입력 -->
            <v-text-field v-model="formData.first" color="primary" label="이름" variant="underlined"
                :rules="[rules.required]"></v-text-field>

            <!-- 아이디 입력 -->
            <v-text-field v-model="formData.id" color="primary" label="아이디" variant="underlined"
                :rules="[rules.required, rules.checkId]"></v-text-field>

            <!-- 이메일 입력 -->
            <v-text-field v-model="formData.email" color="primary" label="Email" variant="underlined"
                :rules="[rules.required, rules.validEmail]"></v-text-field>

            <!-- 비밀번호 입력 -->
            <v-text-field v-model="formData.password" type="password" color="primary" label="Password"
                placeholder="Enter your password" variant="underlined"
                :rules="[rules.required, rules.minLength]"></v-text-field>

            <!-- 비밀번호 확인 -->
            <v-text-field v-model="formData.confirmPassword" type="password" color="primary" label="Confirm Password"
                variant="underlined" :rules="[rules.required, matchPassword]"></v-text-field>

            <!-- 약관 동의 -->
            <v-checkbox v-model="formData.terms" color="secondary" label="I agree to site terms and conditions"
                :rules="[rules.required]"></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn variant="text" @click="goBack">
                <v-icon icon="mdi-arrow-left" start></v-icon>
                돌아가기
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" :disabled="!isValid" @click="submitForm">
                가입하기
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// 폼 데이터
const formData = ref({
    first: "",
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
});

// 유효성 검사 규칙
const rules = {
    required: (value) => !!value || "필수 입력 항목입니다.",
    checkId: (value) => value !== "admin" || "해당 아이디는 사용할 수 없습니다.",
    minLength: (value) =>
        (value && value.length >= 6) || "비밀번호는 최소 6자 이상이어야 합니다.",
    validEmail: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "유효한 이메일 주소를 입력하세요.",
};

// 비밀번호 확인
const matchPassword = (value) => {
    return value === formData.value.password || "비밀번호가 일치하지 않습니다.";
};

// 전체 폼 유효성 검사
const isValid = computed(() => {
    return (
        formData.value.first &&
        formData.value.id &&
        formData.value.email &&
        formData.value.password &&
        formData.value.confirmPassword &&
        formData.value.terms &&
        matchPassword(formData.value.confirmPassword) === true
    );
});

// 뒤로가기 버튼
const router = useRouter();
const goBack = () => {
    router.go(-1);
};

// 폼 제출
const submitForm = () => {
    if (isValid.value) {
        alert("회원가입이 완료되었습니다!");
        console.log("폼 데이터:", formData.value);
        // 서버로 데이터 전송 로직 추가 가능
    } else {
        alert("모든 필드를 올바르게 입력하세요.");
    }
};
</script>

<style scoped>
.v-card {
    padding: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-btn {
    font-weight: bold;
}
</style>
