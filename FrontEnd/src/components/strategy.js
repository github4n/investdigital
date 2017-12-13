/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import TabsControl from "./react_tab";
import EarningsList from './earnings_list';
import StrategyList from './strategy_list';

class Strategy extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }

    render(){
        return(
            <div className="strategy">
                <div className="strategy-list-banner">
                    <div className="strategy-list-banner-mask">
                        <h2 className="text-center h2 g-color-white">一起来发现最优秀的策略</h2>
                        <span className="strategy-line"></span>
                    </div>
                </div>
                <div className="strategy-content container g-pt-100 g-pb-150">
                    <div className="row strategy-choiceness">
                        <div className="col-sm-12">
                            <div className="id-boxshadow clearfix">
                                <div className="col-sm-12 title text-center g-py-20">InvestDigital策略精选</div>
                                <div className="col-sm-12 g-py-20">
                                    <div className="col-sm-1">&gt;</div>
                                    <Link className="col-sm-3 strategy-choiceness-item id-boxshadow" to="/strategy/details">
                                        <div className="strategy-choiceness-title">
                                            <span className="h4">交集原则</span>
                                            <span className="pull-right strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                                            <div className="g-py-10 strategy-choiceness-user">
                                                <div className="photo">
                                                    <img src="/public/img/touxiang.png" alt=""/>
                                                    <span className="g-pl-5">米筐CDO</span>
                                                </div>
                                                <span className="strategy-choiceness-title-line"></span>
                                            </div>
                                            <div className="strategy-chart"></div>
                                            <div className="strategy-choiceness-number row g-pt-10 text-center">
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">累计收益</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">12.31%</h5>
                                                    <h5 className="g-pt-5">最大回撤</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">订阅人数</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="col-sm-3 strategy-choiceness-item id-boxshadow" to="/strategy/details">
                                        <div className="strategy-choiceness-title">
                                            <span className="h4">交集原则</span>
                                            <span className="pull-right strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                                            <div className="g-py-10 strategy-choiceness-user">
                                                <div className="photo">
                                                    <img src="/public/img/touxiang.png" alt=""/>
                                                    <span className="g-pl-5">米筐CDO</span>
                                                </div>
                                                <span className="strategy-choiceness-title-line"></span>
                                            </div>
                                            <div className="strategy-chart"></div>
                                            <div className="strategy-choiceness-number row g-pt-10 text-center">
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">累计收益</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">12.31%</h5>
                                                    <h5 className="g-pt-5">最大回撤</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">订阅人数</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="col-sm-3 strategy-choiceness-item id-boxshadow" to="/strategy/details">
                                        <div className="strategy-choiceness-title">
                                            <span className="h4">交集原则</span>
                                            <span className="pull-right strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                                            <div className="g-py-10 strategy-choiceness-user">
                                                <div className="photo">
                                                    <img src="/public/img/touxiang.png" alt=""/>
                                                    <span className="g-pl-5">米筐CDO</span>
                                                </div>
                                                <span className="strategy-choiceness-title-line"></span>
                                            </div>
                                            <div className="strategy-chart"></div>
                                            <div className="strategy-choiceness-number row g-pt-10 text-center">
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">累计收益</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">12.31%</h5>
                                                    <h5 className="g-pt-5">最大回撤</h5>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h5 className="g-pt-5">29.31%</h5>
                                                    <h5 className="g-pt-5">订阅人数</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="col-sm-1">&gt;</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row g-mt-50">
                        <div className="col-sm-8">
                            <StrategyList/>
                        </div>
                        <div className="col-sm-4 ">
                            <EarningsList/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(Strategy);