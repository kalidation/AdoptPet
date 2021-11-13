import { firebase } from '../../firebase/Firebase'
import types from "./Auth.types";


const registerStarted = () => ({
    type: types.IS_REGISTER
})


const registerFinished = (user) => ({
    type: types.REGISTER_FINISHED,
    payload: user,
})

const errorRegister = (error) => ({
    type: types.REGISTER_ERROR,
    payload: error
})

export const register = (email, password) => async (dispatch, getState) => {
    dispatch(registerStarted())
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                dispatch(registerFinished(user))
            })
            .catch((error) => {
                throw new Error(error)
            });
    } catch (error) {
        dispatch(errorRegister(error))
    }
}

const LoginStarted = () => ({
    type: types.IS_LOGIN
})


const LoginFinished = (user) => ({
    type: types.LOGIN_FINISHED
})

const errorLogin = (error) => ({
    type: types.LOGIN_ERROR,
    payload: error
})

export const login = (email, password) => async (dispatch, getState) => {
    dispatch(LoginStarted())
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                dispatch(LoginFinished(user))
            })
            .catch((error) => {
                throw new Error(error)
            });
    } catch (error) {
        dispatch(errorLogin(error))
    }

}

const LogOutStarted = () => ({
    type: types.IS_LOGOUT
})


const LogOutFinished = () => ({
    type: types.LOGOUT_FINISHED
})

const errorLogOut = (error) => ({
    type: types.LOGOUT_ERROR,
    payload: error,
})

export const logOut = () => async (dispatch, getState) => {
    dispatch(LogOutStarted())
    try {
        await firebase.auth().signOut()
            .then(() => {
                dispatch(LogOutFinished())
            })
            .catch((error) => {
                throw new Error(error)
            });
    } catch (error) {
        dispatch(errorLogOut(error))
    }
}

const actionUser = (user) => ({
    type: types.CHECK_USER,
    payload: user,
})

export const setUser = (user) => async (dispatch, getState) => {
    dispatch(actionUser(user))
}
