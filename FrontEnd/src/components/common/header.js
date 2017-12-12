/**
 * Created by oxchain on 2017/10/17.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderUserInfo() {
        const role = localStorage.getItem('role');
        let allUnRead=this.props.message_number && this.props.message_number.allUnRead;
        if (this.props.authenticated) {
            const loginname = localStorage.getItem('loginname');
            return (
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="ordermenu-style dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span className="hidden-xs">{loginname}</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="info-self">
                                    <div className="info-style">
                                        <Link to="/usercenter" >用户中心</Link>
                                    </div>
                                    <div className="info-style">
                                        <Link to="/myadvert" >我的广告</Link>
                                    </div>
                                    <div className="info-style">
                                        <Link to="/signout" >退出登录</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }
    }
    render() {
        const username = localStorage.getItem('username');
        return (
            <div className="headerwidth">
                <nav className="header ">
                    <div className="header-position">
                        <div className="navdivimg">
                            <img src="/public/img/logo4.png" className="navimg" alt="" />
                        </div>
                        <ul className="headerul" >
                            <li ><a href="/" >首页</a></li>
                            <li ><Link to="/"  >策略英雄榜</Link></li>
                            <li ><Link to="/" >我的策略</Link></li>
                            <li ><Link to="/" >基金排行榜</Link></li>
                            <li ><Link to="/" >基金发行服务</Link></li>
                        </ul>
                    </div>
                    <div className={`navbar-custom-menu ${this.props.authenticated ? "hidden" : ""}`}>
                        <ul className="nav navbar-nav">
                            <li className={`registerlia order-style `} ><Link to="/signup" >注册</Link></li>
                            <li className={`loginlia order-style `}><Link to="/signin"  >登录</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;