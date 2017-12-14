/**
 * Created by fengxiaoli on 2017/12/12.
 */
import axios from 'axios';
import { browserHistory, hashHistory } from 'react-router';
import {
    ROOT_URLC,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    EMAIL_SIGNUP_USER,
    getAuthorizedHeader
} from './types';

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

function setAuthToLocalStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role.id);
    localStorage.setItem('userId', data.id); //用户ID
    localStorage.setItem('loginname', data.loginname); //用户登录名
    localStorage.setItem('mobilephone', data.mobilephone);//手机号
    localStorage.setItem('createTime', data.createTime);//注册时间
    localStorage.setItem('email', data.email);//邮箱
    localStorage.setItem('firstBuyTime', data.userTxDetail.firstBuyTime); //第一次交易时间
    localStorage.setItem('txNum', data.userTxDetail.txNum); //交易次数
    localStorage.setItem('believeNum', data.userTxDetail.believeNum);//信任人数
    localStorage.setItem('sellAmount', data.userTxDetail.sellAmount); //出售的累计交易数量
    localStorage.setItem('buyAmount', data.userTxDetail.buyAmount); //购买的累计交易数量
    localStorage.setItem('firstAddress', data.firstAddress); //用户中心 收款地址
}

/**
 * 手机登录
 */
export function signinAction({ mobilephone, password }) {
    console.log(`点击登录按钮传过来的数据是 ${mobilephone},${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URLC}/user/login`, { mobilephone, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    setAuthToLocalStorage(response.data.data);
                    dispatch({ type: AUTH_USER });
                } else {
                    dispatch(
                        authError(response.data.message)
                    );
                    dispatch(authError(response.data.message));
                }
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}

/**
 * 邮箱登录
 */
export function EmailsigninAction({ email, password }) {
    console.log(`点击邮箱登录按钮传过来的数据是 ${email},${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URLC}/user/login`, { email, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    setAuthToLocalStorage(response.data.data);
                    // browserHistory.push('/');
                    dispatch({ type: AUTH_USER });
                } else {
                    dispatch(authError(response.data.message));
                }
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}

// 登出
export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginname');
    return { type: UNAUTH_USER };
}

/**
 * 手机注册
 */

export function signupUser({ loginname, mobilephone, vcode, password }, callback) {
    console.log(`手机注册传送的数据: ${loginname}, ${mobilephone},${vcode}, ${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URLC}/user/register`, { loginname, mobilephone, vcode, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    callback();
                } else {
                    // console.log(response.data.message);
                    callback(response.data.message);
                }
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}
/**
 * 邮箱注册
 */
export function EmialsignupUser({ loginname, email, password }, callback) {
    console.log(`邮箱注册传送的数据: ${loginname}, ${email}, ${password}`);
    return function (dispatch) {
        axios.post(`${ROOT_URLC}/user/register`, { loginname, email, password })
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    callback();
                } else {
                    callback(response.data.message);
                }
                dispatch({ type: EMAIL_SIGNUP_USER, payload: response });
            })
            .catch((err) => {
                dispatch(authError(err.message));
            });
    };
}



