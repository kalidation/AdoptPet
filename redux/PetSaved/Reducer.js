import types from "./types";

const initialStates = {
    petSaved: []
}

export default (state = initialStates, action) => {
    switch (action.type) {
        case types.SAVE_PET:
            return {
                petSaved: [...state.petSaved, action.payload]
            }
        default:
            return state;
    }
}