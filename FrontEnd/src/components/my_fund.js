/**
 * Created by fengxiaoli on 2017/12/14.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabsControl from "./react_tab";
import Header from './common/header-all';
import Footer from './common/footer';
import MyStrategyall from './my_strategy_all';
import MyFundall from './my_fund_all';
class Myfund extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="my-fund ">
                   <div className=" container my-fund-bgc">
                       <TabsControl>
                           <div name="我的基金"><MyFundall/></div>
                           <div name="我的策略"><MyStrategyall/></div>
                       </TabsControl>
                   </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Myfund;
