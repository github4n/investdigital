/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import TabsControl from "./react_tab";
import EarningsList from './earnings_list';
import StrategyList from './strategy_list';
import Header from './common/header-all';
import Slider from 'react-slick';
import {fetchGreatStrategy} from '../actions/strategy';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';

class Strategy extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.fetchGreatStrategy();
    }
    componentDidMount() {
        const data=[
            [
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
            }
        ], [
            {
                title:1211,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:2,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:2,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }
        ], [
            {
                title:3,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:3,
                aa:"wdnn",
                name:"33333",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"33333",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }
        ]
        ];
        data.map((item, i)=>{
            item.map((item, index)=> {
                const myChart = echarts.init((document.getElementById(`strategy${i}`).getElementsByClassName(`main${index}`))[0]);
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
        });
    }
    renderList2(item){
        return item.map((item, index)=>{
            return(
                <Link className="col-sm-3 strategy-choiceness-item strategy-choiceness-up id-boxshadow g-mb-20 g-mt-10" to="/strategy/details" key={index}>
                    <div className="strategy-choiceness-title">
                        <span className="h4">{item.title}</span>
                        <span className="pull-right strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                        <div className="g-py-10 strategy-choiceness-user">
                            <div className="photo">
                                <img src="/public/img/touxiang.png" alt=""/>
                                <span className="g-pl-5">米筐CDO</span>
                            </div>
                            <span className="strategy-choiceness-title-line"></span>
                        </div>
                        <div className={`strategy-chart main${index}`} style={{height:"180px", width:"240px"}}></div>
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
            );
        });
    }
    renderList(){
        const data=[
            [
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
                }
            ], [
                {
                    title:1211,
                    aa:"wdnn",
                    name:"zhang",
                    youyi:"23%",
                    huiche:"23%",
                    dingyue:"12%",
                    time:"2017-6-30"
                }, {
                    title:2,
                    aa:"wdnn",
                    name:"zhang",
                    youyi:"23%",
                    huiche:"23%",
                    dingyue:"12%",
                    time:"2017-6-30"
                }, {
                    title:2,
                    aa:"wdnn",
                    name:"zhang",
                    youyi:"23%",
                    huiche:"23%",
                    dingyue:"12%",
                    time:"2017-6-30"
                }
            ], [
                {
                    title:3,
                    aa:"wdnn",
                    name:"zhang",
                    youyi:"23%",
                    huiche:"23%",
                    dingyue:"12%",
                    time:"2017-6-30"
                }, {
                    title:3,
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
            ]
        ];
        return data.map((item, index)=>{
            return(
                <div id={`strategy${index}`} key={index}>
                    {this.renderList2(item)}
                </div>

            );
        });
    }
    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        console.log(this.props.great_strategy);
        return(
            <div className="strategy">
                <Header/>
                <div className="strategy-list-banner">
                    <div className="strategy-list-banner-mask">
                        <h2 className="text-center h2 g-color-white" style={{marginTop:"0"}}>一起来发现最优秀的策略</h2>
                        <span className="strategy-line"></span>
                    </div>
                </div>
                <div className="strategy-content container g-pt-100 g-pb-150">
                    <div className="row strategy-choiceness">
                        <div className="col-sm-12">
                            <div className="id-boxshadow g-pb-20 clearfix">
                                <div className="col-sm-12 title text-center g-py-20">InvestDigital策略精选</div>
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
        strategy_great:state.strategy.strategy_great
    };
}

export default connect(mapStateToProps, {fetchGreatStrategy})(Strategy);