import types from "./types";

const setDarkTheme = () => ({
    type: types.START_DARKTHEME
})


export const setIsDarkTheme = () => async (dispatch, getState) => {
    dispatch(setDarkTheme())
}