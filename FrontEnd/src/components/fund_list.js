/**
 * Created by fengxiaoli on 2017/12/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabsControl from "./react_tab";
import { Link } from 'react-router-dom';
import Header from './common/header-all';
import Footer from './common/footer';
import Listfundall from './list_fund_all';
import Listfundmy from './list_fund_my';
import Slider from 'react-slick';

import {fetchStartFund } from '../actions/fund';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';

import 'echarts/lib/component/dataZoom';


class FundList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        this.props.fetchStartFund();
    }

    componentDidUpdate() {
        const data = this.props.all || [];
        data.map((item, i)=>{
            item.map((item, index)=> {
                const myChart1 = echarts.init((document.getElementById(`strategy${i}`).getElementsByClassName(`main${index}`))[0]);
                const dataX= item.echart.xAxis;
                const data=item.echart.yAxis;
                const dataY1 = data[0].data;
                const dataY2 = data[1].data;
                const name1 = data[0].name;
                const name2 = data[1].name;

                // 绘制图表
                myChart1.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend:{
                        data:[name1, name2 ],
                        // bottom:0
                    },
                    grid: {
                        left: '10%',
                        right: '1%',
                        bottom: '10%'
                    },
                    dataZoom : [ {
                        xAxis: 0,
                        type : 'inside',
                        start : 0,
                        end : 100,
                    }, ],
                    xAxis : [
                        {
                            type : 'category',
                            interval:20, //每隔区域20
                            axisLabel :{
                            },
                            axisLine:{
                                show: false,
                            },
                            data:dataX
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                show: false,
                            },
                        },
                    ],
                    series : [
                        {
                            name:name1,
                            type:'line',
                            itemStyle: {
                                normal: {
                                    lineStyle:{
                                        color:'blue',
                                        opacity:"0.8"

                                    }
                                }
                            },
                            data:dataY1
                        },
                        {
                            name:name2,
                            type:'line',
                            itemStyle: {
                                normal: {
                                    lineStyle:{
                                        color:'red',
                                        opacity:"1"

                                    }
                                }
                            },
                            data:dataY2
                        }
                    ]
                });
              });
        });
    }
    renderList2(item){
        return item.map((item, index)=>{
            return(
                <Link className="col-sm-3 strategy-choiceness-item strategy-choiceness-up id-boxshadow g-mb-20 g-mt-10" to={`/funddetails/${item.id}`} key={index}>
                    <div className="strategy-choiceness-title">
                        <span className="h4">{item.fundName} {item.fundCode}</span>
                        <span className="pull-right strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                        <div className="g-py-10 strategy-choiceness-user">
                            <div className="photo">
                                <img src="/public/img/touxiang.png" alt=""/>
                                <span className="g-pl-5">{item.issueUserName}</span>
                            </div>
                            <span className="strategy-choiceness-title-line"></span>
                        </div>
                        <div className={`strategy-chart main${index}`} style={{height:"180px", width:"240px"}}></div>
                        <div className="strategy-choiceness-number row g-pt-10 text-center">
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{item.returns.totalReturn}</h5>
                                <h5 className="g-pt-5">总收益</h5>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{item.returns.netAssetValue}</h5>
                                <h5 className="g-pt-5">单位净值</h5>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{item.returns.untilNowChange}</h5>
                                <h5 className="g-pt-5">涨跌幅</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });
    }
    renderList(){
        const data = this.props.all || [];
        // console.log(data);
        return data.map((item, index)=>{
            // console.log(item);
            return(
                <div id={`strategy${index}`} key={index}>
                    {this.renderList2(item)}
                </div>

            );
        });
    }
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Header/>
                <div className='fund clear'>
                    <div className="fund-banner-list">
                        <div className="fund-bgc">
                            <div className="col-lg-6 fund-list-bgc1">
                                {/*<img src="../../public/img/left_u750.png" alt=""/>*/}
                               <div className="fund-banner-title">
                                   <div className="title-border-left g-px-20">
                                       <h2 className="g-mb-20">基金精英荟</h2>
                                       <h1 className="g-mr-10">124.20%</h1>
                                       <span>总收益</span>
                                   </div>
                                   <div className="official-btn">
                                       <span className="g-mr-20 g-px-20 g-py-10">官方出品</span>
                                       <span className="g-px-20 g-py-10">精选组合基金</span>
                                   </div>
                               </div>
                            </div>
                            <div className="col-lg-6 fund-list-bgc2">
                                {/*<img src="../../public/img/right_u747.png" alt=""/>*/}
                                <div className="fund-banner-title">
                                    <div className="title-border-right g-px-20">
                                        <h2 className="g-mb-20">艾美谷全球全天候</h2>
                                        <h1 className="g-mr-10">82.17%</h1>
                                        <span>总收益</span>
                                    </div>
                                    <div className="official-btn official-btn-right">
                                        <span className="g-mr-20 g-px-20 g-py-10">海外资产配置</span>
                                        <span className=" g-px-20 g-py-10">官方出品</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-fund ">
                    <div className="strategy-content container g-pt-100 g-pb-50">
                      <div className="row strategy-choiceness">
                        <div className="col-sm-12">
                            <div className="id-boxshadow g-pb-20 clearfix">
                                <div className="col-sm-12 title text-center g-py-20">明星基金产品</div>
                                <div className="col-sm-12 g-pb-20">
                                    <div className="col-sm-1"></div>
                                    <Slider {...settings}>
                                        {this.renderList()}
                                    </Slider>
                                    <div className="col-sm-1"></div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className=" container my-fund-bgc">
                        <TabsControl>
                            <div name="全部基金"><Listfundall/></div>
                            <div name="我的基金"><Listfundmy/></div>
                        </TabsControl>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.fund.all);
    return {
        all:state.fund.all
    };
}

export default connect(mapStateToProps, { fetchStartFund })(FundList);