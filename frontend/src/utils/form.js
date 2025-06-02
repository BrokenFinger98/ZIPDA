export const rules = {
  required: (value) => !!value || '필수값입니다.',
  minLength: (value) => value.length >= 4 || '5글자 이상 입력하세요.',
  maxLength: (value) => value.length < 15 || '14글자 이내로 입력하세요.',
  // passwordCheck: (value) =>  value === signUpPassword.value || '비밀번호가 일치하지 않습니다.',
  emailCheck: (value) => /.+@.+\..+/.test(value) || '이메일 형식이 아닙니다.',
  phoneCheck: (value) =>
    /^\d{3}-\d{3,4}-\d{4}$/.test(value) || '전화번호 형식이 아닙니다.',
  nameMinLength: (value) => value.length > 2 || '2글자 이상 입력하세요.',
  nameMaxLength: (value) => value.length < 6 || '5글자 이내로 입력하세요.',
  nicknameMinLength: (value) => value.length > 2 || '2글자 이상 입력하세요.',
  nicknameMaxLength: (value) => value.length < 15 || '14글자 이내로 입력하세요.',
}

export const validations = {
  required: (value) => !!value,
  minLength: (value) => value.length >= 4,
  maxLength: (value) => value.length < 15,
  passwordCheck: (password, confirmPassword) => password === confirmPassword,
  emailCheck: (value) => /.+@.+\..+/.test(value),
  phoneCheck: (value) => /^\d{3}-\d{3,4}-\d{4}$/.test(value),
  nameMinLength: (value) => value.length > 2,
  nameMaxLength: (value) => value.length < 6,
  nicknameMinLength: (value) => value.length > 2,
  nicknameMaxLength: (value) => value.length < 15,
}
