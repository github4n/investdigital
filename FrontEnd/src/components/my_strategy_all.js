/**
 * Created by fengxiaoli on 2017/12/14.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
// import $ from 'jquery';
// const echarts = require('echarts');
class MyStrategyall extends Component{
    constructor(props) {
        super(props);
        this.state={

        };
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

        return data.map((item, index)=>{
            return(
                <li className="strate-all-content-item  clearfix g-mt-20" key={index}>
                    <Link to="/strategy/details">
                        <div className="col-lg-6">
                            <div className="strategy-choiceness-item  clearfix" style={{padding:"20px 0"}}>
                                <div className="strategy-choiceness-title">
                                    <span className="h4" style={{color:'black'}}>{item.title}</span>
                                    <div className="g-my-10">
                                        <span className="strategy-choiceness-tip g-px-15 g-py-5 g-mr-10">自有基金跟投</span>
                                        <span className="strategy-choiceness-tip g-px-15 g-py-5 g-mx-10">有止损线</span>
                                        <span className="strategy-choiceness-tip g-px-15 g-py-5 g-mx-10">无认购费</span>
                                        <span className="strategy-choiceness-tip g-px-15 g-py-5 g-ml-10">官方基金</span>
                                    </div>
                                    <div className="g-py-10 strategy-choiceness-user">
                                        <div className="photo">
                                            <img src="/public/img/touxiang.png" alt=""/>
                                            <span className="g-pl-5">{item.name}</span>
                                        </div>
                                        <span className="my-fund-item-line"></span>
                                    </div>
                                    <div className="strategy-choiceness-number row g-pt-10 text-center">
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.all}</h5>
                                            <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>总收益</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.danwei}</h5>
                                            <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>单位净值</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.zhangdie}</h5>
                                            <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>涨跌幅</h5>
                                        </div>
                                        <div className="col-lg-3" style={{padding:0}}>
                                            <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.time}</h5>
                                            <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>开始时间</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 g-px-0">
                            <div className=" my-fund-border g-px-20 g-mt-20" >
                                <div className="col-lg-4 g-pl-30" style={{height:"180px"}}>
                                    <ul className="my-fund-echart">
                                        <li className="g-mb-20"><Link to="">近六个月以来</Link></li>
                                        <li className="g-mb-20"><Link to="">今年以来</Link></li>
                                        <li><Link to="">全部</Link></li>
                                    </ul>
                                </div>
                                <div className="col-lg-8 fund-Echart" style={{height:"180px"}}>
                                    {/*{this.handleEchart()}*/}
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            );
        });
    }


    // handleEchart(){
    //
    //     const myChart = echarts.init($("fund-Echart"));
    //     // 指定图表的配置项和数据
    //     var option = {
    //         title: {
    //             text: 'ECharts 入门示例'
    //         },
    //         tooltip: {},
    //         legend: {
    //             data:['销量']
    //         },
    //         xAxis: {
    //             data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }]
    //     };
    //
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    // }

    render(){
        return(
            <div className="container g-pt-100 g-px-40 g-pb-200 clearfix">
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

export default connect(mapStateToProps, {})(MyStrategyall);