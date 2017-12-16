
/**
 * Created by zhangxiaojing on 2017/12/15.
 */

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_GREAT_STRATEGY,
    FETCH_USER_STRATEGY,
    FETCH_ALL_STRATEGY
} from '../actions/types';

const INITIAL_STATE = { strategy_great: null, strategy_user:null, strategy_all:null};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_GREAT_STRATEGY:
            return { ...state, strategy_great: action.payload };
        case FETCH_USER_STRATEGY:
            return { ...state, strategy_user: action.payload };
        case FETCH_ALL_STRATEGY:
            return { ...state, strategy_all: action.payload };
    }
    return state;
}