import types from "./Auth.types";

const initialStates = {
    isRegister: false,
    errorRegister: false,
    RegisterErrorMessage: '',

    isLogin: false,
    logged: false,
    errorLogin: false,
    LoginErrorMessage: '',
    user: null,

    isLogOut: false,
    errorLogout: false,
    errorLogoutMessage: false,
}

export default (state = initialStates, action) => {
    switch (action.type) {
        case types.IS_REGISTER:
            return {
                ...state,
                isRegister: true
            }
        case types.REGISTER_FINISHED:
            return {
                ...state,
                isRegister: false,
                logged: true,
                user: action.payload
            }
        case types.REGISTER_ERROR:
            return {
                ...state,
                isRegister: false,
                errorRegister: true,
                RegisterErrorMessage: action.payload
            }

        //

        case types.IS_LOGIN:
            return {
                ...state,
                isLogin: true
            }
        case types.LOGIN_FINISHED:
            return {
                ...state,
                user: action.payload,
                isLogin: false,
                logged: true,
                errorLogin: false,
                LoginErrorMessage: ''
            }
        case types.LOGIN_ERROR:
            return {
                ...state,
                errorLogin: true,
                LoginErrorMessage: action.payload
            }

        //

        case types.IS_LOGOUT:
            return {
                ...state,
                isLogOut: true
            }
        case types.LOGOUT_FINISHED:
            return {
                ...state,
                user: null,
                isLogOut: false,
                logged: false,
            }
        case types.LOGOUT_ERROR:
            return {
                ...state,
                errorLogout: action.payload,
                errorLogoutMessage: true
            }

        case types.CHECK_USER:
            return {
                ...state,
                user: action.payload,
            }

        default:
            return state;
    }
}