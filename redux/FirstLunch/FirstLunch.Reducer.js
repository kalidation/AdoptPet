import types from "./FirstLunch.types";

const initialStates = {
    isLunching: false,
    alreadyLunched: false,
    error: false,
    errorMessage: ''
}

export default (state = initialStates, action) => {
    switch (action.type) {
        case types.START_LUNCH:
            return {
                ...state,
                isLunching: true
            }
        case types.FINISH_LUNCHED:
            return {
                ...state,
                isLunching: false,
                alreadyLunched: true
            }
        case types.ERROR_LUNCHING:
            return {
                ...state,
                errorMessage: action.payload,
                error: true
            }
        default:
            return state;
    }
}