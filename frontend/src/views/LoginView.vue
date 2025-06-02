<!-- <template>
    <v-container class="login-signup-container">

        <v-tabs v-model="activeTab" class="tabs" grow>
            <v-tab>로그인</v-tab>
            <v-tab>회원가입</v-tab>
        </v-tabs>


        <div class="tabs-content">


            <div v-if="activeTab === 0" class="form-container">
                <div class="text-field">
                    <v-text-field id="id" v-model="id" label="Email(필수)" variant="underlined" dense
                     />
                    <v-text-field id="pw" v-model="pw" label="비밀번호" type="password" variant="underlined"
                        dense />
                </div>
                <button class="login-button basic-login" @click="submitLogin">로그인</button>

                <div class="social-login-buttons mt-2">
                    <button class="social-button naver login-button"><img src='@/assets/logo/naver-icon.png'
                            alt="네이버 로그인" /> 네이버로
                        로그인</button>
                    <button class="social-button kakao login-button"><img src='@/assets/logo/kakao-icon.png'
                            alt="카카오 로그인" /> 카카오로
                        로그인</button>
                    <button class="social-button google login-button"><img src='@/assets/logo/google_logo.png'
                            alt="구글 로그인" /> Sign
                        with Google</button>

                </div>

                <v-btn variant="text" color="secondary" class="mt-4" @click="findAccount">아이디/비밀번호 찾기</v-btn>
            </div>

            <div v-else class="form-container">
                <div class="text-field">

                    <v-text-field v-model="signUpName.value" label="이름(필수)" variant="underlined" dense
                        :rules="[rules.required]" />

 
                    <v-text-field v-model="signUpId.value" label="아이디(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.checkId]" />


                    <v-text-field v-model="signupForm.email" label="Email(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.validEmail]" />

 
                    <v-text-field v-model="signUpPassword.value" label="비밀번호(8자 이상)" type="password" variant="underlined"
                        dense :rules="[rules.required, rules.minLength]" />


                    <v-text-field v-model="signUpConfirmPassword.value" label="비밀번호 확인" type="password"
                        variant="underlined" dense :rules="[rules.required, matchPassword]" />

                </div>

                <button class="login-button basic-login" @click="submitSignup">회원가입</button>

                <div class="social-login-buttons mt-2">
                    <button class="social-button naver login-button"><img src='@/assets/logo/naver-icon.png'
                            alt="네이버 로그인" /> 네이버로
                        시작하기</button>
                    <button class="social-button kakao login-button"><img src='@/assets/logo/kakao-icon.png'
                            alt="카카오 로그인" /> 카카오로
                        시작하기</button>
                    <button class="social-button google login-button"><img src='@/assets/logo/google_logo.png'
                            alt="구글 로그인" />
                        Sign with Google</button>
                </div>
            </div>


        </div>
    </v-container>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
// import AuthLoginOAuth from './AuthLoginOAuth.vue'
import { login } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { rules, validations } from '@/utils/form'

defineProps(['routes'])
const emit = defineEmits(['route', 'loggedIn'])

const userStore = useUserStore()

const id = ref('')
const pw = ref('')
const error = ref('')
const isValid = computed(() => {
    return (
        validations.required(id.value) &&
        validations.minLength(id.value) &&
        validations.maxLength(id.value) &&
        validations.required(pw.value) &&
        validations.minLength(pw.value) &&
        validations.maxLength(pw.value)
    )
})

watch([id, pw], () => {
    error.value = ''
})

const handleLogin = () => {
    if (!isValid.value) {
        error.value = '입력값을 확인해주세요.'
        return
    }
    login({
        loginId: id.value,
        password: pw.value,
    })
        .then((res) => {
            userStore.login(res.data.accessToken)
            emit('loggedIn')
        })
        .catch((err) => {
            console.error(err)
            error.value = '아이디 또는 비밀번호가 일치하지 않습니다.'
        })
}
</script>


<style scoped>
.login-signup-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.form-container .v-input {
    width: 100%;
    padding: 10px 10px 0 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

.text-field {
    width: 100%;
    padding: 10px 10px 0 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

.tabs {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
}

.or-text {
    margin: 20px 0;
    text-align: center;
    font-weight: bold;
    color: #999;
}

.social-login-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.social-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}

.social-button.naver {
    background-color: #03c75a;
    color: white;
    font-size: 0.9rem;
}

.social-button.kakao {
    background-color: #fee500;
    color: #381e1f;
    font-size: 0.9rem;
}

.social-button.google {
    background-color: white;
    border: 1px solid #ccc;
    color: #757575;
}

.basic-login {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: var(--color-main-theme);
    font-weight: 600;
    color: #ffffff;
}

/* 네이버 로그인 스타일 */
.naver-login {
    color: white;
    background-color: #03c75a;
    font-weight: bold;
}

.naver img {
    width: 10%;
    height: auto;
}


.kakao-login {
    color: #3c1e1e;
    font-weight: bold;
}

.kakao img {
    width: 10%;
    height: auto;
}

.kakao-login .kakao-icon {
    font-size: 20px;
    margin-right: 10px;
}


.basic-login:hover {
    background-color: #eaeaea;
}


.login-button:hover {
    filter: brightness(90%);
}


.google:hover {
    border: 1px solid #f4f4f4;
}

.google {
    font-size: 0.9rem;
}

.google img {
    width: 1.5rem;
    height: auto;
    margin-right: 1rem;
}

.roboto-medium {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
}
</style> -->




<template>
    <v-container class="login-signup-container">

        <v-tabs v-model="activeTab" class="tabs" grow>
            <v-tab>로그인</v-tab>
            <v-tab>회원가입</v-tab>
        </v-tabs>

        <!-- <v-form class="tabs-content" fast-fail @submit.prevent="handleLogin"> -->

            <div v-if="activeTab === 0" class="form-container">
                <v-form class="tabs-content" fast-fail @submit.prevent="handleLogin">
                <div class="text-field mb-4">
                    <v-text-field id="id" v-model="LoginId" label="아이디" variant="underlined" dense
                        :rules="[rules.required, rules.minLength, rules.maxLength]" />
                    <v-text-field id="pw" v-model="LoginPw" label="비밀번호" type="password" variant="underlined" dense
                        :rules="[rules.required, rules.minLength, rules.maxLength]" />
                </div>
                <button class="login-button basic-login" type="submit">로그인</button>

                <div class="social-login-buttons mt-2">
                    <button class="social-button naver login-button"><img src='@/assets/logo/naver-icon.png'
                            alt="네이버 로그인" /> 네이버로
                        로그인</button>
                    <button class="social-button kakao login-button"><img src='@/assets/logo/kakao-icon.png'
                            alt="카카오 로그인" /> 카카오로
                        로그인</button>
                    <button class="social-button google login-button"><img src='@/assets/logo/google_logo.png'
                            alt="구글 로그인" /> Sign
                        with Google</button>

                </div>

                <v-btn variant="text" color="secondary" class="mt-4" @click="">아이디/비밀번호 찾기</v-btn>
                </v-form>
            </div>
        

            <div v-else class="form-container">
                <v-form class="tabs-content" fast-fail @submit.prevent="register">
                <div class="text-field  mb-4">

                    <v-text-field v-model="signUpName" label="이름(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.nameMinLength, rules.nameMaxLength]" />

                    <v-text-field v-model="signUpNickname" label="닉네임(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.nicknameMinLength, rules.nicknameMaxLength]" />


                    <v-text-field v-model="signUpId" label="아이디(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.minLength, rules.maxLength]" />


                    <v-text-field v-model="signUpEmail" label="Email(필수)" variant="underlined" dense
                        :rules="[rules.required, rules.emailCheck]" />


                    <v-text-field v-model="signUpPassword" name="signUpPassword" label="비밀번호(5자 이상)" type="password" variant="underlined"
                        dense :rules="[rules.required, rules.minLength]" />

                    <v-text-field v-model="signUpConfirmPassword" label="비밀번호 확인" type="password"
                        variant="underlined" dense :rules="[signUpPassword===signUpConfirmPassword||'비밀번호가 일치하지 않습니다.']"   />
                    <!-- <v-text-field v-model="signUpConfirmPassword" label="비밀번호 확인" type="password"
                        variant="underlined" dense :rules="[rules.required, rules.passwordCheck]" /> -->

                </div>

                <button class="login-button basic-login" type="submit">회원가입</button>

                <div class="social-login-buttons mt-2">
                    <button class="social-button naver login-button"><img src='@/assets/logo/naver-icon.png'
                            alt="네이버 로그인" /> 네이버로
                        시작하기</button>
                    <button class="social-button kakao login-button"><img src='@/assets/logo/kakao-icon.png'
                            alt="카카오 로그인" /> 카카오로
                        시작하기</button>
                    <button class="social-button google login-button" type="submit"><img src='@/assets/logo/google_logo.png'
                            alt="구글 로그인" />
                        Sign with Google</button>
                </div>
                </v-form>
            </div>


        <!-- </v-form> -->
    </v-container>
</template>


<script setup>
import { computed, ref, watch } from 'vue'
// import AuthLoginOAuth from './AuthLoginOAuth.vue'
import { login, createMember } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { rules, validations } from '@/utils/form'
import { ROLES } from '@/utils/user';

import { useRouter } from 'vue-router';


// 활성 탭 상태 (0: 회원가입, 1: 로그인)
const activeTab = ref(0);

// 로그인
// defineProps(['routes'])
// const emit = defineEmits(['route', 'loggedIn'])
// const emit = defineEmits(['loggedIn']);

const userStore = useUserStore()

const LoginId = ref('')
const LoginPw = ref('')
const LoginError = ref('')
const isValidLogin = computed(() => {
    return (
        validations.required(LoginId.value) &&
        validations.minLength(LoginPw.value) &&
        validations.maxLength(LoginId.value) &&
        validations.required(LoginPw.value) &&
        validations.minLength(LoginPw.value) &&
        validations.maxLength(LoginPw.value)
    )
})

watch([LoginId, LoginPw], () => {
    LoginError.value = ''
})

const router = useRouter();

const handleLogin = () => {
    console.log(LoginId.value, LoginPw.value)
    if (!isValidLogin.value) {
        LoginError.value = '입력값을 확인해주세요.'
        return
    }
    login({
        loginId: LoginId.value,
        password: LoginPw.value,
    })
    .then((res) => {
        userStore.login(res.data.accessToken)
        console.log(userStore.user)
        router.push({name: 'mypage'})
    })
    .catch((err) => {
        LoginError.value = '아이디 또는 비밀번호가 일치하지 않습니다.'
        alert(LoginError.value)
        LoginId.value = '';
        LoginPw.value = '';
        router.push({name: 'login'})
    })
}

// 회원가입

// const signupForm = ref({
//     name: "",
//     id: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
// });


const signUpId = ref('')
const signUpPassword = ref('')
const signUpConfirmPassword = ref('')
const signUpName = ref('')
const signUpNickname = ref('')
const signUpEmail = ref('')

// role = user / broker
const role = ref(ROLES.user)
const error = ref('')


const isValidRegister = computed(() => {
    return (
        validations.required(signUpId.value) &&
        validations.minLength(signUpId.value) &&
        validations.maxLength(signUpId.value) &&
        validations.required(signUpPassword.value) &&
        validations.minLength(signUpPassword.value) &&
        validations.maxLength(signUpPassword.value) &&
        validations.passwordCheck(signUpPassword.value, signUpConfirmPassword.value) &&
        validations.required(signUpConfirmPassword.value) &&
        validations.minLength(signUpConfirmPassword.value) &&
        validations.maxLength(signUpConfirmPassword.value) &&
        validations.required(signUpName.value) &&
        validations.nameMinLength(signUpName.value) &&
        validations.nameMaxLength(signUpName.value) &&
        validations.required(signUpNickname.value) &&
        validations.nicknameMinLength(signUpNickname.value) &&
        validations.nicknameMaxLength(signUpNickname.value)
    )
})

const invalidPassword = computed(() => {
    return signUpPassword.value!== signUpConfirmPassword.value
})

const register = () => {
    console.log('회원가입')
    if (invalidPassword.value) {
        console.log('비밀번호가 일치하지 않습니다.')
        error.value = '비밀번호가 일치하지 않습니다.'
        alert(error.value)
        return
    }
    if (!isValidRegister.value) {
        console.log('입력값을 확인해주세요.')
        error.value = '입력값을 확인해주세요.'
        return
    }
    // alert('회원가입 성공!')
    createMember({
        nickname: signUpNickname.value,
        name: signUpName.value,
        email: signUpEmail.value,
        loginId: signUpId.value,
        password: signUpPassword.value,
        memberRole: role.value, // USER, ADMIN 등 역할에 따라 설정
    })
    .then((res) => {
        // emit('route', props.routes.LOGIN)
        // alert('회원가입 성공?')
        signUpNickname.value = ''
        signUpName.value = '',
        signUpEmail.value = '',
        signUpId.value = '',
        signUpPassword.value = '',
        signUpConfirmPassword.value = '',
        role.value = ROLES.user,
        error.value = ''
        // router.push({name: 'home'})
        activeTab.value = 0;
    })
    .catch((err) => {
        // console.error(err)
        error.value = err.response.data.message
        alert(error.value)
    })
}
</script>


<style scoped>
.login-signup-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.form-container .v-input {
    width: 100%;
    padding: 10px 10px 0 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

.text-field {
    width: 100%;
    padding: 10px 10px 0 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
}

.tabs {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;
}

.or-text {
    margin: 20px 0;
    text-align: center;
    font-weight: bold;
    color: #999;
}

.social-login-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.social-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}

.social-button.naver {
    background-color: #03c75a;
    color: white;
    font-size: 0.9rem;
}

.social-button.kakao {
    background-color: #fee500;
    color: #381e1f;
    font-size: 0.9rem;
}

.social-button.google {
    background-color: white;
    border: 1px solid #ccc;
    color: #757575;
}

.basic-login {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: var(--color-main-theme);
    font-weight: 600;
    color: #ffffff;
}

/* 네이버 로그인 스타일 */
.naver-login {
    color: white;
    background-color: #03c75a;
    font-weight: bold;
}

.naver img {
    width: 10%;
    height: auto;
}


.kakao-login {
    color: #3c1e1e;
    font-weight: bold;
}

.kakao img {
    width: 10%;
    height: auto;
}

.kakao-login .kakao-icon {
    font-size: 20px;
    margin-right: 10px;
}


.basic-login:hover {
    background-color: #eaeaea;
}


.login-button:hover {
    filter: brightness(90%);
}


.google:hover {
    border: 1px solid #f4f4f4;
}

.google {
    font-size: 0.9rem;
}

.google img {
    width: 1.5rem;
    height: auto;
    margin-right: 1rem;
}

.roboto-medium {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-style: normal;
}
</style>











<!-- <script setup>
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// 활성 탭 상태 (0: 회원가입, 1: 로그인)
const activeTab = ref(0);

// 회원가입 폼 데이터
// 회원가입 폼 데이터
const signupForm = ref({
    name: "",
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
});

// 로그인 폼 데이터
const loginForm = ref({
    email: "",
    password: "",
});

// 유효성 검사 규칙
const rules = {
    required: (value) => !!value || "필수 입력 항목입니다.",
    checkId: (value) => value !== "admin" || "해당 아이디는 사용할 수 없습니다.",
    minLength: (value) => (value && value.length >= 8) || "비밀번호는 최소 8자 이상이어야 합니다.",
    validEmail: (value) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "유효한 이메일 주소를 입력하세요.",
};

// 비밀번호 확인
const matchPassword = (value) => {
    return value === signupForm.value.password || "비밀번호가 일치하지 않습니다.";
};

// 전체 폼 유효성 검사
const isValid = computed(() => {
    return (
        signupForm.value.name &&
        signupForm.value.id &&
        signupForm.value.email &&
        signupForm.value.password &&
        signupForm.value.confirmPassword &&
        signupForm.value.agreeTerms &&
        signupForm.value.agreePrivacy &&
        signupForm.value.over14 &&
        matchPassword(signupForm.value.confirmPassword) === true
    );
});

// 회원가입 제출
const submitSignup = () => {
    if (!signupForm.value.name || !signupForm.value.email || !signupForm.value.password) {
        alert("모든 필드를 입력해주세요.");
        return;
    }
    if (!signupForm.value.agreeTerms || !signupForm.value.agreePrivacy || !signupForm.value.over14) {
        alert("필수 약관에 동의해주세요.");
        return;
    }
    alert("회원가입 완료!");
};

// 로그인 제출
const submitLogin = () => {
    if (!loginForm.value.email || !loginForm.value.password) {
        alert("모든 필드를 입력해주세요.");
        return;
    }
    alert("로그인 성공!");
    login();
};

// 아이디/비밀번호 찾기
const findAccount = () => {
    alert("아이디/비밀번호 찾기 페이지로 이동합니다.");
};


const login = () => {
    authStore.login();
    router.push({ name: 'mypage' }); // 로그인 후 MyPage로 이동
};

const join = () => {
    router.push({ name: 'join' });
}
</script> -->

