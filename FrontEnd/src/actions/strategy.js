/**
 * Created by zhangxiaojing on 2017/12/15.
 */
import axios from 'axios';
import { browserHistory, hashHistory } from 'react-router';
import {
    ROOT_STRATEGY,
    FETCH_USER_STRATEGY,
    FETCH_GREAT_STRATEGY,
    FETCH_ALL_STRATEGY,
    getAuthorizedHeader,
    requestError
} from './types';

/**
 * 获取精英策略
 */
export function fetchGreatStrategy() {
    return function (dispatch) {
        axios.post(`${ROOT_STRATEGY}/strategy/getGreatStrategy/0/0`)
            .then(response => {
                if (response.data.status == 1) {
                    dispatch({ type: FETCH_GREAT_STRATEGY, payload: response.data.data});
                }
            }).catch(err => dispatch(requestError(err.message)));
    };
}

/**
 * 获取我的策略
 */
export function fetchUserStrategy({ pageSize, pageNum, desc, userId}) {
    return function (dispatch) {
        axios.post(`${ROOT_STRATEGY}/strategy/getUserStrategy/${pageSize}/${pageNum}/${desc}/${userId}`)
            .then(response => {
                // console.log(response);
                if (response.data.status == 1) {
                    dispatch({ type: FETCH_USER_STRATEGY, payload: response.data});
                }
            }).catch(err => dispatch(requestError(err.message)));
    };
}

/**
 * 获取所有策略
 */

export function fetchAllStrategy({pageSize, pageNum, desc}) {
    return function (dispatch) {
        axios.post(`${ROOT_STRATEGY}/strategy/getAllStrategy/${pageSize}/${pageNum}/${desc}`)
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    dispatch({ type: FETCH_ALL_STRATEGY, payload: response.data});
                }
            }).catch(err => dispatch(requestError(err.message)));
    };
}

/**
 * 获取收益图
 */

export function fetchRunChart({strategyId, beginTime, endTime}) {
    return function (dispatch) {
        axios.post(`${ROOT_STRATEGY}/strategy/getRunChart/${strategyId}/${beginTime}/${endTime}`)
            .then(response => {
                // console.log(response);
                if (response.data.status == 1) {
                    dispatch({ type: FETCH_ALL_STRATEGY, payload: response.data.data});
                }
            }).catch(err => dispatch(requestError(err.message)));
    };
}



