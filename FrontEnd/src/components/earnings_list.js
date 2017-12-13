/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import TabsControl from "./react_tab";
import EarningsDay from './earnings_day';



class MessageBoard extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render(){
        return(
            <div className="id-boxshadow">
                <TabsControl>
                    <div name="日收益"><EarningsDay/></div>
                    <div name="周收益"><EarningsDay/></div>
                    <div name="月收益"><EarningsDay/></div>
                </TabsControl>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps, {})(MessageBoard);