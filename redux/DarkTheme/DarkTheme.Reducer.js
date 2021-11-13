import types from "./types";

const initialStates = {
    isDarkTheme: false,
}

export default (state = initialStates, action) => {
    switch (action.type) {
        case types.START_DARKTHEME:
            return {
                ...state,
                isDarkTheme: !state.isDarkTheme
            }
        default:
            return state;
    }
}