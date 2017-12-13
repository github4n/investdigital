/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Pagination} from 'nl-design';


class StrategyMy extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10
        };
    }
    componentWillMount() {

    }
    renderList(){
        const data=[
            {
                title:1111,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }
        ];
        return data.map((item, index)=>{
            console.log(item);
            return(
                <li className="strate-all-content-item  clearfix g-mt-20" key={index}>
                    <Link to="/strategy/details">
                        <div className="col-sm-2">
                            <img style={{width:"100%"}} className="g-mt-50" src="/public/img/u158.png" alt=""/>
                        </div>
                        <div className="col-sm-5">
                            <div className="strategy-choiceness-item clearfix" style={{padding:"20px 0"}}>
                                <div className="strategy-choiceness-title">
                                    <span className="h4">交集原则</span>
                                    <div className="g-my-10">
                                        <span className="strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                                    </div>
                                    <div className="g-py-10 strategy-choiceness-user">
                                        <div className="photo">
                                            <img src="/public/img/touxiang.png" alt=""/>
                                            <span className="g-pl-5">米筐CDO</span>
                                        </div>
                                        <span className="strategy-choiceness-title-line"></span>
                                    </div>
                                    <div className="strategy-choiceness-number row g-pt-10 text-center" style={{fontSize:"12px"}}>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">29.31%</h5>
                                            <h5 className="g-pt-5">累计收益</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">12.31%</h5>
                                            <h5 className="g-pt-5">最大回撤</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">29.31%</h5>
                                            <h5 className="g-pt-5">订阅人数</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">2017-6-20</h5>
                                            <h5 className="g-pt-5">开始时间</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="strategy-chart g-mt-20" style={{height:"180px"}}></div>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="strategy-all-content clearfix">
                <div className="strategy-all-content-filtrate g-py-20">
                    <ul>
                        <li>我的分享</li>
                        <li>我的订阅</li>
                    </ul>
                    <div className="btn">设置</div>
                </div>
                <div className="clearfix">
                    <ul className="clearfix">
                        {this.renderList()}
                    </ul>
                </div>
                <div className="g-my-30">
                    <Pagination  defaultPageSize={this.state.pageSize} total={10}/>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(StrategyMy);