/**
 * Created by fengxiaoli on 2017/12/12.
 */

export const ROOT_URLC = 'http://192.168.1.111:8081';
// export const ROOT_CHAT = 'http://192.168.1.112:8881';
// export const ROOT_SOCKET = 'ws://192.168.1.112:9999';
// export const ROOT_ORDER= 'http://192.168.1.112:8882';
// export const ROOT_URLZ = 'http://192.168.1.112:8882';
// export const ROOT_ARBITRATE = 'http://192.168.1.112:8883';
// export const ROOT_URLL = 'http://192.168.1.185:8083';
// export const ROOT_MESSAGE = 'http://192.168.1.185:9491';
export const ROOT_STRATEGY = 'http://192.168.1.112:8080';
export const ROOT_AVATAR = 'https://cdn.ricequant.com/img/avatar';

export const AUTH_USER = 'auth_user';                               //登录
export const UNAUTH_USER = 'unauth_user';                           //退出登录
export const AUTH_ERROR = 'auth_error';                             //登录失败
export const REQUEST_SUCCESS = 'request_success';                   //http请求正确
export const REQUEST_ERROR = 'request_error';                       //http请求返回错误

export const EMAIL_SIGNUP_USER = 'email_signup_user';                //邮箱注册

export const FETCH_HOME = 'fetch_home';                              //首页

export const FETCH_USER_STRATEGY = 'fetch_user_strategy';          //获取我的策略
export const FETCH_GREAT_STRATEGY = 'fetch_great_strategy';          //获取精英策略
export const FETCH_ALL_STRATEGY = 'fetch_all_strategy';          //获取所有策略




export function getAuthorizedHeader() {
    return { authorization: localStorage.getItem('token') };
}

export function requestError(error) {
    return {
        type: REQUEST_ERROR,
        payload: error
    };
}