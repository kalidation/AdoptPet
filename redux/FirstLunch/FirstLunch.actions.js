import types from "./FirstLunch.types";

const lunchingStart = () => ({
    type: types.START_LUNCH

})


const lunchingFinished = () => ({
    type: types.FINISH_LUNCHED
})

export const lunch = () => async (dispatch, getState) => {
    dispatch(lunchingStart())
    dispatch(lunchingFinished())
}