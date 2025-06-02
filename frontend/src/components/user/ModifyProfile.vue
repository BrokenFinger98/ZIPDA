<template>
    <v-container class="member-info-container mb-4 p-0">
        <v-card class="member-info-card">
            <v-toolbar flat color="var(--color-main-theme)">
                <v-btn icon @click="goBack" class="icon" style="color:white">
                    <v-icon>{{ "mdi-chevron-left" }}</v-icon>
                </v-btn>
                <v-toolbar-title class="fw-bold fs-5" style="color:white">회원정보 수정</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleEditing" class="icon" style="color:white">
                    <v-icon>{{ isEditing ? "mdi-close" : "mdi-pencil" }}</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-form ref="formRef" v-model="formValid" lazy-validation @submit.prevent="handleSubmit">

                    <div class="profile-image-section">
                        <input ref="fileInput" type="file" accept="image/*" @change="handleImageUpload"
                            class="d-none" />
                        <div class="profile-image-wrapper" @click="triggerFileInput">
                            <v-avatar size="100" class="clickable">
                                <v-img :src="formData.profileImage || defaultProfileImage" />
                            </v-avatar>
                            <div v-if="isEditing" class="edit-overlay">
                                <p>편집</p>
                            </div>
                        </div>
                        <p v-if="isEditing" class="upload-instruction">프로필 이미지를 클릭하면 변경할 수 있습니다.</p>
                    </div>

                    <!-- 아이디 -->
                    <v-text-field v-if="isGeneralLogin" v-model="formData.id" label="아이디"
                        :rules="[rules.required, rules.minLength, rules.maxLength]" :disabled="!isEditing" outlined clearable
                        class="mb-4" />

                    <!-- 닉네임 -->
                    <v-text-field v-model="formData.nickname" label="닉네임" :rules="[rules.required, rules.nicknameMaxLength, rules.nicknameMinLength]"
                        :disabled="!isEditing" outlined clearable class="mb-4" />

                    <!-- 비밀번호 -->
                    <v-text-field v-if="isGeneralLogin" v-model="formData.password" label="비밀번호"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="toggleShowPassword" :rules="[rules.required, rules.minLength, rules.maxLength]"
                        :disabled="!isEditing" outlined clearable class="mb-4" />

                    <!-- 비밀번호 확인 -->
                    <v-text-field v-if="isGeneralLogin & isEditing" v-model="formData.confirmPassword" label="비밀번호 확인"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="toggleShowConfirmPassword" :rules="[rules.required, formData.confirmPassword === formData.password || '비밀번호가 일치하지 않습니다.']"
                        :disabled="!isEditing" outlined clearable class="mb-4" />

                    <!-- 이메일 -->
                    <v-text-field v-model="formData.email" label="이메일" :rules="[rules.required, rules.emailCheck]"
                        :disabled="!isEditing" outlined clearable class="mb-4" />

                    <!-- 멤버 권한 -->
                    <v-select v-model="formData.role" label="멤버 권한" :items="roles" outlined clearable disabled
                        class="mb-4" />

                    <!-- 로그인 타입 -->
                    <!-- <v-select v-model="formData.loginType" label="로그인 타입" :items="loginTypes" outlined clearable
                        disabled class="mb-4" /> -->
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="submitForm" :disabled="!isEditing || !formValid">저장</v-btn>
                <v-btn text @click="goBack">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { rules, validations } from '@/utils/form'
import { useUserStore } from "@/stores/user";
import { updateCurrentMemberInfo, updateProfileImage } from "@/api/user";

const router = useRouter();
const userStore = useUserStore();

const formRef = ref(null);
const formValid = ref(false);
const isEditing = ref(false); // 수정 가능 상태

const fileInput = ref(null);

// 기본 프로필 이미지
const defaultProfileImage = "https://cdn.vuetifyjs.com/images/john.png" ;

onMounted(() => {
    console.log(userStore.user);
})

// 사용자 정보
const formData = reactive({
    id: userStore.user.loginId,
    password: "",
    confirmPassword: "",
    nickname: userStore.user.nickname,
    email: userStore.user.email,
    profileImage: userStore.user.imageUrl||defaultProfileImage,
    // profileImageFile: null,
    role: userStore.user.memberRole,
    loginType: userStore.user.socialType,
});

// 로그인 타입 및 멤버 권한
// const loginTypes = ["일반 로그인", "카카오 로그인", "구글 로그인", "네이버 로그인"];
const roles = ["일반 사용자", "관리자", "공인중개사"];

// 로그인 타입에 따른 조건
const isGeneralLogin = computed(() => formData.loginType === "NONE");

// 비밀번호 마스킹
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};
const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};



const closeForm = () => {
    formRef.value.reset();
    formData.profileImage = userStore.user.imageUrl || defaultProfileImage;
    isEditing.value = !isEditing.value;
}


// 프로필 이미지 업로드 처리
const triggerFileInput = () => {
    if (isEditing.value && fileInput.value) {
        fileInput.value.click();
    }
};

// const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             formData.profileImage = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// };

// 폼 제출
const submitForm = () => {
    if (formRef.value.validate()) {
        alert("회원 정보가 저장되었습니다.");

        // userStore.user.loginId = formData.id;
        // userStore.user.nickname = formData.nickname;


        // updateMemberNickname({ nickname: formData.nickname.value })
        // .then(() => {
        //   alert('닉네임 변경 성공')
        // })
        // .catch((err) => {
        //   alert(err.response.data.message)
        // })

        // updateCurrentMemberInfo({
        //     nickname: formData.nickname.value,
        //     name: userStore.user.name,
        //     email: formData..value,
        // })
        //     .then((res) => {
        //     alert('이메일 변경 성공')
        //     })
        //     .catch((err) => {
        //     alert(err.response.data.message)
        //     })

        console.log("저장된 데이터:", { ...formData });
        isEditing.value = false; // 저장 후 수정 종료
    }
};

const handleSubmit = () => {
    updateProfileImage({ file: fileInput.value.files[0] })
      .then((res) => {
        console.log('Profile image updated:', res)
      })
      .catch((err) => {
        console.error('Failed to update profile image:', err)
      })
}

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            formData.profileImage = reader.result;
        };
        reader.readAsDataURL(file);
        handleSubmit()
        console.log('File selected:', file)
    }
};

// // 폼 초기화
// const resetForm = () => {
//     formRef.value.reset();
//     formData.profileImage = defaultProfileImage;
//     isEditing.value = false; // 취소 후 수정 종료
// };

// 수정 모드 토글
const toggleEditing = () => {
    isEditing.value = !isEditing.value;
    if (!isEditing.value) {

    }
    console.log(isEditing.value);
};

// 뒤로 가기
const goBack = () => {
    router.back();
};
</script>

<style scoped>
.member-info-container {
    max-width: 1000px;
    /* width: 100%; */
    padding: 1rem;
    height: 95vh;
    margin-bottom: 1rem;
}

.member-info-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 90vh;
    overflow-y: auto;
}

.profile-image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
}

.v-avatar {
    width: 150px !important;
    height: 150px !important;
}

.profile-image-wrapper {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.profile-image-wrapper:hover .edit-overlay {
    opacity: 1;
}

.edit-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(84, 84, 84, 0.3);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.upload-instruction {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

.d-none {
    display: none;
}

.icon {
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
}

.v-card {
    padding: 0;
}

header {
    padding: 0.5rem;
}

.v-toolbar-title {
    font-weight: 800;
}

</style>


<!-- <template>
    <v-container class="member-info-container">
        <v-card class="member-info-card">
            <v-card-title class="fw-bold">회원정보 수정</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="formRef" v-model="formValid" lazy-validation>

                    <div class="profile-image-section mb-4">
                        <input ref="fileInput" type="file" accept="image/*" @change="handleImageUpload"
                            class="d-none" />
                        <div class="profile-image-wrapper" @click="triggerFileInput">
                            <v-avatar size="100" class="clickable">
                                <v-img :src="formData.profileImage || defaultProfileImage" />
                            </v-avatar>
                            <div class="edit-overlay">
                                <p>편집</p>
                            </div>
                        </div>
                        <p class="upload-instruction">프로필 이미지를 클릭하면 변경할 수 있습니다.</p>
                    </div>


                    <v-text-field v-if="isGeneralLogin" v-model="formData.id" label="아이디"
                        :rules="[rules.required, rules.checkId]" outlined clearable class="mb-4" />


                    <v-text-field v-model="formData.nickname" label="닉네임" :rules="[rules.required]" outlined clearable
                        class="mb-4" />


                    <v-text-field v-if="isGeneralLogin" v-model="formData.password" label="비밀번호"
                        :type="showPassword ? 'text' : 'password'"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="toggleShowPassword" :rules="[rules.required, rules.minLength]" outlined
                        clearable class="mb-4" />


                    <v-text-field v-if="isGeneralLogin" v-model="formData.confirmPassword" label="비밀번호 확인"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="toggleShowConfirmPassword" :rules="[rules.required, rules.matchPassword]"
                        outlined clearable class="mb-4" />


                    <v-text-field v-model="formData.email" label="이메일" :rules="[rules.required, rules.validEmail]"
                        outlined clearable class="mb-4" />


                    <v-select v-model="formData.role" label="멤버 권한" :items="roles" outlined clearable disabled
                        class="mb-4" />


                    <v-select v-model="formData.loginType" label="로그인 타입" :items="loginTypes" outlined clearable
                        disabled class="mb-4" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="submitForm" :disabled="!formValid">저장</v-btn>
                <v-btn text @click="resetForm">취소</v-btn>
            </v-card-actions>
        </v-card>

    </v-container>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const formRef = ref(null);
const formValid = ref(false);
const fileInput = ref(null);

// 기본 프로필 이미지
const defaultProfileImage = "https://via.placeholder.com/80/003f8e/ffffff?text=+";

// 사용자 정보
const formData = reactive({
    id: "user123",
    password: "",
    confirmPassword: "",
    nickname: "홍길동",
    email: "user@example.com",
    profileImage: defaultProfileImage,
    profileImageFile: null, // 실제 업로드 파일
    role: "일반 사용자",
    loginType: "카카오 로그인",
});

// 로그인 타입 및 멤버 권한
const loginTypes = ["일반 로그인", "카카오 로그인", "구글 로그인", "네이버 로그인"];
const roles = ["일반 사용자", "관리자", "공인중개사"];

// 로그인 타입에 따른 조건
const isGeneralLogin = computed(() => formData.loginType === "일반 로그인");

// 비밀번호 마스킹
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
};
const toggleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

// 유효성 검사 규칙
const rules = {
    required: (value) => !!value || "필수 입력 항목입니다.",
    checkId: (value) => value !== "admin" || "해당 아이디는 사용할 수 없습니다.",
    minLength: (value) => value.length >= 6 || "비밀번호는 최소 6자 이상이어야 합니다.",
    validEmail: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "유효한 이메일 주소를 입력하세요.",
    matchPassword: (value) =>
        value === formData.password || "비밀번호가 일치하지 않습니다.",
};

// 프로필 이미지 업로드 처리
const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            formData.profileImage = e.target.result; // 미리보기 업데이트
        };
        reader.readAsDataURL(file);
    }
};

// 폼 제출
const submitForm = () => {
    if (formRef.value.validate()) {
        alert("회원 정보가 저장되었습니다.");
        console.log("저장된 데이터:", { ...formData });
    }
};

// 폼 초기화
const resetForm = () => {
    formRef.value.reset();
    formData.profileImage = defaultProfileImage; // 초기 프로필 이미지 복원
};
</script>

<style scoped>
.member-info-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
}

.member-info-card {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-image-wrapper {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.profile-image-wrapper:hover .edit-overlay {
    opacity: 1;
}


.edit-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(84, 84, 84, 0.3);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.upload-instruction {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

.d-none {
    display: none;
}
</style> -->
