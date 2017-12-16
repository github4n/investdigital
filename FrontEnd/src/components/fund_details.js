/**
 * Created by fengxiaoli on 2017/12/15.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageBoard from './message_board';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import Header from './common/header-all';
import Footer from './common/footer';
import FundTimeLine from './charts/fund-time-line';

class StrategyDetails extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    render(){
        const columns1 = [{
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        }, {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const data1 = [];
        for (let i = 0; i < 100; i++) {
            data1.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }
        const columns2 = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '12%',
        }, {
            title: 'Address',
            dataIndex: 'address',
            width: '30%',
            key: 'address',
        }];

        const data2 = [{
            key: 1,
            name: 'John Brown sr.',
            children: [{
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            }, {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',

            }, {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
            }],
        }, {
            key: 2,
            name: 'Joe Black',
            children: [{
                key: 45,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            }, {
                key: 67,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',

            }, {
                key: 88,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
            }],
        }];
        return(
            <div className="strategy-details">
                <Header/>
                <div className="strategy-details-banner">
                    <div className="fund-details-banner">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div>
                                        <h3 className="h2">希瓦圣剑1号(P0000039）</h3>
                                        <div className="g-my-20">
                                            <span className="strategy-details-tip g-px-10 g-py-5 text-center g-mr-10">无认购费</span>
                                            <span className="strategy-details-tip g-px-10 g-py-5 text-center g-mr-10" style={{width:110 +'px'}}>自有基金跟投</span>
                                            <span className="pull-right fund-share g-px-10 g-py-5 text-center g-mr-10">订阅</span>
                                            <span className="pull-right fund-share g-px-10 g-py-5 text-center g-mr-10">分享</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div>
                                        <div className="strategy-details-info-main">
                                            <div className="col-lg-5">
                                                <span className="info1">29.31%</span>
                                                <span className="info2">总收益</span>
                                            </div>
                                            <div className="col-lg-7 text-right">
                                                <span className="info2 g-pt-15">净值日期:2017-11-17</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 strategy-details-info-list">
                                            <ul>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">近1个月</div>
                                                </li>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">近3个月</div>
                                                </li>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">--</div>
                                                    <div className="g-py-7 title">近1年</div>
                                                </li>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">今年收益</div>
                                                </li>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">单位净值</div>
                                                </li>
                                                <li className="col-lg-2">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">累计净值</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="user-des id-boxshadow">
                                        <div className="g-py-20 g-px-40 text-center">
                                            <div className="photo">
                                                <img style={{width:"56px"}} src="/public/img/fund_logo.png" alt=""/>
                                                <div>InvestDigital官方</div>
                                            </div>
                                            <hr/>
                                            <div className="signature g-mt-25">
                                                收益高，风险小，官方基金，力荐~
                                            </div>
                                            <button className="btn fund-detail-rengou g-px-45 g-py-8 g-mt-50 ">认购</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container g-mt-10 g-pb-150">
                    <div className="row">
                        <div className="col-lg-8 text-center">
                            <div className="id-boxshadow g-mb-10 clearfix">
                                <div className="section-tilte g-py-10">收益走势图</div>
                                <FundTimeLine/>
                            </div>
                        </div>
                        <div className="col-lg-4 g-px-0 ">
                            <div className="id-boxshadow  g-pa-20 clearfix ">
                                <h1 className="section-tilte g-py-10" style={{fontSize:20 +'px'}}>认购信息</h1>
                                <div className="strategy-choiceness-number row g-pt-10 text-center">
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5" >开放日</h5>
                                        <h5 className="g-pt-5" style={{ color:'#F2BA49'}}>每季30日</h5>
                                    </div>
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5"  >封闭期(月)</h5>
                                        <h5 className="g-pt-5" style={{ color:'#F2BA49'}}>3</h5>
                                    </div>
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5" >成立日期</h5>
                                        <h5 className="g-pt-5" style={{ color:'#F2BA49'}}>2016-10-11</h5>
                                    </div>
                                </div>
                                <div className="strategy-choiceness-number fund-b-border row g-pt-10 g-pb-30 text-center g-mb-20">
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5" >业绩提成比率</h5>
                                        <h5 className="g-pt-5" style={{color:'#F2BA49'}}>20%</h5>
                                    </div>
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5" >投顾/管理费率</h5>
                                        <h5 className="g-pt-5" style={{ color:'#F2BA49'}}>1.50%</h5>
                                    </div>
                                    <div className="col-lg-4" style={{padding:0, fontSize:"14px"}}>
                                        <h5 className="g-pt-5" >起购金额</h5>
                                        <h5 className="g-pt-5" style={{ color:'#F2BA49'}}>100万元</h5>
                                    </div>
                                </div>
                                <h1 className="section-tilte g-py-10 " style={{fontSize:20 +'px'}}>产品信息</h1>
                                <ul className="g-pl-20 g-pb-20 g-pt-10" style={{fontSize:14 +'px'}}>
                                    <li className="g-mb-20">
                                    <span>产品全称&#x3000;&#x3000;&#x3000;&nbsp;</span>
                                        <span>私募工场天猊2号私募证券投资基金</span>
                                    </li>
                                    <li className="g-my-20">
                                        <span>托管人&#x3000;&#x3000;&#x3000;&#x3000;&nbsp;</span>
                                        <span>中国国际金融股份有限公司</span>
                                    </li>
                                    <li className="g-my-20">
                                        <span>投顾公司&#x3000;&#x3000;&#x3000;&nbsp;</span>
                                        <span>上海天猊投资管理有限公司</span>
                                    </li>
                                    <li className="g-my-20">
                                        <span>经纪服务商</span>
                                        <span>&#x3000;&#x3000;&nbsp;中国国际金融股份有限公司</span>
                                    </li>
                                    <li className="g-my-20">
                                        <span>投顾所在地区</span>
                                        <span>&#x3000;&nbsp;上海</span>
                                    </li>
                                    <li className="g-my-20">
                                        <span>基金期额&#x3000;&#x3000;&#x3000;&nbsp;</span>
                                        <span>--</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="row g-mt-30">
                        <div className="col-lg-12 g-px-0"><MessageBoard/></div>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(StrategyDetails);