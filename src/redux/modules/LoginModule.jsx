const initialState = {
  email: '',
  password: '',
  passwordCheck: '',
  nickName: '',
  emailMessage: '',
  passwordMessage: '',
  passwordCheckMessage: '',
  nickNameMessage: '',
};

const LoginModule = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };

    case 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'CHANGE_PASSWORDCHECK':
      return {
        ...state,
        passwordCheck: action.payload,
      };
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        nickName: action.payload,
      };
    case 'CHANGE_EMAIL_MESSAGE':
      return {
        ...state,
        emailMessage: action.payload,
      };

    case 'CHANGE_PASSWORD_MESSAGE':
      return {
        ...state,
        passwordMessage: action.payload,
      };
    case 'CHANGE_PASSWORDCHECK_MESSAGE':
      return {
        ...state,
        passwordCheckMessage: action.payload,
      };
    case 'CHANGE_NICKNAME_MESSAGE':
      return {
        ...state,
        nickNameMessage: action.payload,
      };

    default:
      return state;
  }
};
export default LoginModule;
