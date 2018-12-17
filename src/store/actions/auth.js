import axios from "axios";
import {AUTH_LOGOUT} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {

        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAStUwG-A7hGHoTzlGezy5YXDAZ2JNuBIw`;
        if (isLogin) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAStUwG-A7hGHoTzlGezy5YXDAZ2JNuBIw`;
        }

        let response = await axios.post(url, authData);
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: 'AUTH_SUCCESS',
        token: token

    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT
    }
}