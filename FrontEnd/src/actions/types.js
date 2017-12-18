/**
 * Created by fengxiaoli on 2017/12/12.
 */

export const ROOT_URLCF = 'http://192.168.1.111:8080';

export const ROOT_STRATEGY = 'http://192.168.1.112:8080';
export const ROOT_AVATAR = 'https://cdn.ricequant.com/img/avatar';


export const AUTH_USER = 'auth_user';                               //登录
export const UNAUTH_USER = 'unauth_user';                           //退出登录
export const AUTH_ERROR = 'auth_error';                             //登录失败
export const REQUEST_ERROR = 'request_error';                       //http请求返回错误
export const EMAIL_SIGNUP_USER = 'email_signup_user';                //邮箱注册
export const FETCH_VERIFY_CODE = 'fetch_verify_code';                //验证码
export const FUND_SUBMISSION = 'fund_submission';                    //发行基金
export const USER_FUND_MY = 'user_fund_my';                          //我的基金
export const START_FUND_GOOD = 'start_fund_good';                      //明星基金产品
export const All_FUND_LIST = 'all_fund_list';                         //基金排行榜全部基金
export const FUND_DETAIL = 'fund_detail';                             //基金详情


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