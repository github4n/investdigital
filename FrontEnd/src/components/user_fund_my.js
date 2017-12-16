/**
 * Created by fengxiaoli on 2017/12/14.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';


class UserFundmy extends Component{
    constructor(props) {
        super(props);
        this.state={
            index:0,
        };
    }
    componentWillMount() {

    }
    componentDidMount() {
        const data1=[
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

        data1.map((item, i)=> {
            var myChart = echarts.init(document.getElementById(`main1${i}`));
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
    handleClick (index) {
        this.setState({index});
    }
    renderSelect(){
        const selectItem=[
            {title:"我的分享"},
            {title:"我的订阅"}
        ];
        return selectItem.map((item, index)=>{
            return(
                <li className={` g-mx-10 ${index === this.state.index ? "active" : ""}`} onClick={ this.handleClick.bind(this, index)} key={index}>{item.title}</li>
            );
        });
    }
    renderList(){
        const data=[
            {
                title:"ETF大法",
                name:"米筐CDO",
                all:"29.31%",
                danwei:"29.31%",
                zhangdie:"2.31%",
                time:"2017-6-20"
            }, {
                title:"ETF大法",
                name:"米筐CDO",
                all:"29.31%",
                danwei:"29.31%",
                zhangdie:"2.31%",
                time:"2017-6-20"
            }, {
                title:"ETF大法",
                name:"米筐CDO",
                all:"29.31%",
                danwei:"29.31%",
                zhangdie:"2.31%",
                time:"2017-6-20"
            }, {
                title:"ETF大法",
                name:"米筐CDO",
                all:"29.31%",
                danwei:"29.31%",
                zhangdie:"2.31%",
                time:"2017-6-20"
            }
        ];
        return data.map((item, index)=>{
            return(
                <li className="strate-all-content-item  clearfix g-mt-20" key={index}>
                    <Link to="/strategy/details">
                        <div className="col-lg-1">
                            <img style={{width:"100%"}} className="g-mt-50" src="/public/img/u158.png" alt=""/>
                        </div>
                        <div className="col-lg-5">
                            <div className="strategy-choiceness-item clearfix" style={{padding:"20px 0"}}>
                                <div className="strategy-choiceness-title">
                                    <span className="h4">{item.title}</span>
                                    <div className="g-my-10">
                                        <span className="strategy-choiceness-tip g-px-5 g-py-5">稳如泰山</span>
                                        <span className="strategy-choiceness-tip g-px-5 g-py-5">一浪接一浪</span>
                                        <span className="strategy-choiceness-tip g-px-5 g-py-5">收益之王</span>
                                    </div>
                                    <div className="g-py-10 strategy-choiceness-user">
                                        <div className="photo">
                                            <img src="/public/img/touxiang.png" alt=""/>
                                            <span className="g-pl-5">{item.name}</span>
                                        </div>
                                        <span className="strategy-choiceness-title-line"></span>
                                    </div>
                                    <div className="strategy-choiceness-number row g-pt-10 text-center" style={{fontSize:"12px"}}>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5 text-red">{item.all}</h5>
                                            <h5 className="g-pt-5">累计收益</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5 text-red">{item.danwei}</h5>
                                            <h5 className="g-pt-5">最大回撤</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5 ">{item.zhangdie}</h5>
                                            <h5 className="g-pt-5">订阅人数</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">{item.time}</h5>
                                            <h5 className="g-pt-5">开始时间</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="strategy-chart g-mt-20" id={`main1${index}`} style={{height:"180px", width:"320px"}}></div>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="strategy-all-content g-pb-200 col-lg-8 clearfix">
                <div className="strategy-all-content-filtrate g-py-20 clearfix">
                    <ul>
                        {this.renderSelect()}
                    </ul>
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

    };
}

export default connect(mapStateToProps, {})(UserFundmy);