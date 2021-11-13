import types from "./types";


const lunchingSavePet = (pet) => ({
    type: types.SAVE_PET,
    payload: pet
})

export const savePet = (pet) => async (dispatch, getState) => {
    dispatch(lunchingSavePet(pet))
}