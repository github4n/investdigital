/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Pagination} from 'nl-design';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';


class StrategyMy extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10
        };
    }
    componentWillMount() {

    }
    componentDidMount() {
        const data2=[
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

        data2.map((item, i)=> {
            var myChart2 = echarts.init(document.getElementById(`main2${i}`));
            // 绘制图表
            myChart2.setOption({
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
                <li className={ index === this.state.index ? "active" : ""} onClick={ this.handleClick.bind(this, index)} key={index}>{item.title}</li>
            );
        });
    }
    renderList(){
        const data2=[
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
        return data2.map((item, index)=>{
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
                            <div className="strategy-chart g-mt-20" id={`main2${index}`} style={{height:"180px", width:"248px"}}></div>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="strategy-all-content clearfix">
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