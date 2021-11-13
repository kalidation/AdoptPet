import types from "./Pets.Types";

const initialStates = {
    isFetching: false,
    hasError: false,
    errorMessage: '',
    fullPets: []
}

export default (state = initialStates, action) => {
    switch (action.type) {
        case types.FETCHING_START:
            return {
                ...state,
                isFetching: true,
            }
        case types.FETCHING_FINISHED:
            return {
                ...state,
                isFetching: false,
                fullPets: action.payload
            }
        case types.FETCHING_ERROR:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                errorMessage: action.payload,
                fullPets: []
            }
        case types.RESET_STATE: {
            return {
                ...initialStates
            }
        }
        default:
            return state;
    }
}