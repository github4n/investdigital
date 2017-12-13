/**
 * Created by fengxiaoli on 2017/12/12.
 */
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Header from './components/common/header-all';
import Footer from './components/common/footer';
import Singin from './components/auth/signin';
import Signinemail from './components/auth/signin_email';
import Singup from './components/auth/signup';
import Signupemail from './components/auth/signup_email';

import Signout from './components/auth/signout';
import Home from './components/home';
import FundIssuance from './components/fund_issuance';
const createStoreWithMiddleware = compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If token exist, singin automatic
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <div>
                <main>
                    {/* <Header /> */}
                    <Switch>
                        <Route path="/signin" component={Singin} />
                        <Route path="/signinemail" component={Signinemail} />
                        <Route path="/signup" component={Singup} />
                        <Route path="/signupemail" component={Signupemail} />
                        <Route path="/signout" component={Signout} />
                        <Route path="/fundissuance" component={FundIssuance} />
                        <Route path="/" component={Home} />
                    </Switch>
                    {/* <Footer /> */}
                </main>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.wrapper')
);

