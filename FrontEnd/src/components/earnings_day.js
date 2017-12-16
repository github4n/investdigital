/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ROOT_AVATAR} from '../actions/types';

class EarningsDay extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    renderList(){
        return this.props.strategy_all.data.map((item, index)=>{
            return(
                <li className="strate-earnings-content-item  strategy-choiceness-item clearfix" key={index} style={{margin:0}}>
                    <div className="col-sm-2">{item.rank}</div>
                    <div className="col-sm-8 photo">
                        <img src={`${ROOT_AVATAR}/${item.imageUrl}`} alt=""/>
                        <span className="g-pl-10">{item.loginname}</span>
                    </div>
                    <div className="col-sm-2">
                        {((item.totalReturn)*100).toFixed(2)}%
                    </div>
                </li>
            );
        });
    }

    render(){
        if(this.props.strategy_all === null){
            return(<div></div>);
        }
        console.log(this.props.strategy_all);
        return(
            <div className="strategy-all-content clearfix">
                <div className="strategy-all-content-filtrate g-py-20">
                    <div className="text-center">您当前暂未上榜</div>
                    <hr/>
                </div>
                <div className="clearfix">
                    <ul className="clearfix">
                        {this.renderList()}
                    </ul>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        strategy_all:state.strategy.strategy_all
    };
}

export default connect(mapStateToProps, {})(EarningsDay);