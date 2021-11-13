import { firebase } from "../../firebase/Firebase";
import types from "./Pets.Types";



const fetchingStart = () => ({
    type: types.FETCHING_START,
})


const fetchingFinished = (pets) => ({
    type: types.FETCHING_FINISHED,
    payload: pets,
})

const fetchingError = (e) => ({
    type: types.FETCHING_ERROR,
})

const resetState = () => ({
    type: types.RESET_STATE,
})

export const getPets = (type) => (dispatch, getState) => {
    dispatch(fetchingStart())
    let petType = 'Dogs'
    switch (type) {
        case 0:
            petType = 'Cats'
            break;
        case 1:
            petType = 'Dogs'
            break;
        case 2:
            petType = 'Others'
            break;
        default:
            break;
    }
    return firebase.firestore().collection("Pets").where("type", "==", petType).onSnapshot(querySnapshot => {
        const pets = [];
        querySnapshot.docs.forEach(doc => {
            pets.push(doc.data())
        }, (e) => {
            dispatch(fetchingError(e))
        })
        dispatch(fetchingFinished(pets))
    });
}

export const reset = () => async (dispatch, getState) => {
    dispatch(resetState())
}

