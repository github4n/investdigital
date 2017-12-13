/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageBoard from './message_board';
import { Table } from 'antd';
import 'antd/dist/antd.css';

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
                <div className="strategy-details-banner">
                    <div className="strategy-details-banner-mask">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div>
                                        <h3 className="h2">交集原则</h3>
                                        <div className="g-my-20">
                                            <span className="strategy-details-tip g-px-10 g-py-5 text-center g-mr-10">收益之王</span>
                                            <span className="strategy-details-tip g-px-10 g-py-5 text-center g-mr-10">精选之王</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div>
                                        <div className="strategy-details-info-main text-center">
                                            <div className="col-sm-5">
                                                <span className="info1">29.31%</span>
                                                <span className="info2">累计收益</span>
                                            </div>
                                            <div className="col-sm-4">
                                                <span className="info3">780.66</span>分
                                            </div>
                                            <div className="col-sm-3">
                                                <span className="info3">65</span>名
                                            </div>
                                        </div>
                                        <div className="col-sm-12 strategy-details-info-list">
                                            <ul>
                                                <li className="col-sm-3">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">年化收益</div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">年化收益</div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">年化收益</div>
                                                </li>
                                                <li className="col-sm-3">
                                                    <div className="g-py-7 number">15.65%</div>
                                                    <div className="g-py-7 title">年化收益</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="user-des id-boxshadow">
                                        <div className="g-py-20 g-px-40 text-center">
                                            <div className="photo">
                                                <img style={{width:"56px"}} src="/public/img/touxiang.png" alt=""/>
                                                <div>skssfdsf</div>
                                            </div>
                                            <hr/>
                                            <div className="signature">
                                                bfjbjfbdjbfjcd思考方法额风格和办法
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container g-mt-10 g-pb-150">
                    <div className="row">
                        <div className="col-sm-8 text-center">
                            <div className="id-boxshadow g-mb-10">jndkebf</div>
                            <div className="id-boxshadow g-mb-10">
                                <div className="section-tilte g-py-10">当前持仓</div>
                                <Table columns={columns1} dataSource={data1} pagination={false} scroll={{ y: 240 }} />
                            </div>
                            <div className="id-boxshadow g-mb-10">
                                <div className="section-tilte g-py-10">最新交易</div>
                                <Table columns={columns2} dataSource={data2} pagination={false} scroll={{ y: 240 }} />
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12"><MessageBoard/></div>
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

export default connect(mapStateToProps, {})(StrategyDetails);