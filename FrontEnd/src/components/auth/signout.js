/**
 * Created by fengxiaoli on 2017/12/12.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/auth';
import Signin from './signin';
import Header from '../common/header-all';
class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <div>
                <Header />
                {/*<section className="content">*/}
                {/*<div className="text-center"><h2>您已退出登录</h2></div>*/}
                {/*</section>*/}
                <div className="siginout">
                    <Signin location="{this.props.location}" />
                </div>
            </div>
        );
    }
}

export default connect(null, { signoutUser })(Signout);
