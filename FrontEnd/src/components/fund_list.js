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

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';

class FundList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const data=[
            {
                title:"希瓦圣剑1号（P000039)",
                name:"梁宏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }, {
                title:"希瓦圣剑1号（P000039)",
                name:"梁宏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }, {
                title:"希瓦圣剑1号（P000039)",
                name:"梁宏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }, {
                title:"希瓦圣剑1号（P000039)",
                name:"梁宏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }
        ];

        data.map((item, i)=> {
            var myChart = echarts.init(document.getElementById(`main${i}`));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x: 40,
                    y:40
                },
                backgroundColor:"#E2EFF9",
                xAxis : [
                    {
                        type : 'category',
                        // boundaryGap : false,
                        axisLabel :{
                            interval:0
                        },
                        data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        borderColor:'blue',
                        // smooth:true,
                        itemStyle: {
                            normal: {
                                areaStyle: {type: 'default'},
                                lineStyle:{
                                    color:'red'
                                }
                            }
                        },
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'预购',
                        type:'line',

                        borderColor:'red',
                        data:[30, 182, 434, 791, 390, 30, 10]

                    },
                ]
            });
        });
    }

    renderList(){
        const data=[
            {
                title:"希瓦圣剑1号（P000039)",
                name:"梁宏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }, {
                title:"希瓦圣剑1号（P000039)",
                name:"志开投资罗敏",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }, {
                title:"希瓦圣剑1号（P000039)",
                name:"黄建平",
                all:"29.31%",
                danwei:"2.2451",
                zhangdie:"+109.14%",
                time:"2017-6-20"
            }
        ];
        return data.map((item, index)=>{
            return(
                <Link className="col-lg-3 strategy-choiceness-item fund-rotate id-boxshadow" to="/funddetails" key={index}>
                    <div className="strategy-choiceness-title">
                        <span className="h4" style={{color:'black'}}>{item.title}</span>
                        <div className="g-my-10">
                            <span className="strategy-choiceness-tip g-px-5 g-py-5 ">自有基金跟投</span>
                            <span className="strategy-choiceness-tip g-px-5 g-py-5 ">有止损线</span>
                            <span className="strategy-choiceness-tip g-px-5 g-py-5 ">无认购费</span>
                        </div>
                        <div className="g-py-10 strategy-choiceness-user">
                            <div className="photo">
                                <img src="/public/img/touxiang.png" alt=""/>
                                <span className="g-pl-5">{item.name}</span>
                            </div>
                            <span className="strategy-choiceness-title-line"></span>
                        </div>
                        <div className="strategy-chart" id={`main${index}`} style={{height:"180px"}}></div>
                        <div className="strategy-choiceness-number row g-pt-10 text-center">
                            <div className="col-lg-4">
                                <h5 className="g-pt-5">{item.all}</h5>
                                <h5 className="g-pt-5">总收益</h5>
                            </div>
                            <div className="col-lg-4">
                                <h5 className="g-pt-5">{item.danwei}</h5>
                                <h5 className="g-pt-5">单位净值</h5>
                            </div>
                            <div className="col-lg-4">
                                <h5 className="g-pt-5">{item.zhangdie}</h5>
                                <h5 className="g-pt-5">涨跌幅</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });
    }
    render() {
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
                            <div className="col-lg-12">
                                <div className="id-boxshadow clearfix">
                                    <div className="col-lg-12 title text-center g-py-20">明星基金产品</div>
                                    <div className="col-lg-12 g-py-20">
                                        <div className="col-lg-1">&gt;</div>
                                        {this.renderList()}
                                        <div className="col-lg-1">&gt;</div>
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

export default FundList;
