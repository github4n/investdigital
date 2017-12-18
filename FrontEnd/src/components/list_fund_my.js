/**
 * Created by fengxiaoli on 2017/12/15.
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
import {fetchFundMy } from '../actions/fund';

class Listfundmy extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10
        };
        // this.rendertabs = this.rendertabs.bind(this);
    }
    componentWillMount(){
        const userId = localStorage.getItem('userId');
        this.props.fetchFundMy({userId});
    }
    componentDidMount() {
        const data2=[
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

        data2.map((item, i)=> {
            var myChart = echarts.init(document.getElementById(`main2${i}`));
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
    renderTags(item){
        return item.tags.map((item, index)=>{
            return(
                <span key={index} className="strategy-choiceness-tip g-px-15 g-py-5 g-mr-10">{item}</span>

            );
        });
    }
    renderList(){
        const data = this.props.myfund || [];
        if(data ==! data){
            return (
                <li className="text-center">
                    <h1> {this.props.error}</h1>
                </li>
            );
        }else {
            return data.map((item, index)=>{
                const tabs = item.tags;
                return(
                    <li className="strate-all-content-item  clearfix g-mt-20" key={index}>
                        <Link to={`/funddetails/${item.id}`}>
                            <div className="col-lg-6">
                                <div className="strategy-choiceness-item  clearfix" style={{padding:"20px 0"}}>
                                    <div className="strategy-choiceness-title">
                                        <span className="h4" style={{color:'black'}}>{item.fundName} ({item.fundCode})</span>
                                        <div className="g-my-10">
                                            {this.renderTags(item)}
                                        </div>
                                        <div className="g-py-10 strategy-choiceness-user">
                                            <div className="photo">
                                                <img src="/public/img/touxiang.png" alt=""/>
                                                <span className="g-pl-5">{item.issueUserName}</span>
                                            </div>
                                            <span className="my-fund-item-line"></span>
                                        </div>
                                        <div className="strategy-choiceness-number row g-pt-10 text-center">
                                            <div className="col-lg-3" style={{padding:0}}>
                                                <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.returns.totalReturn}</h5>
                                                <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>总收益</h5>
                                            </div>
                                            <div className="col-lg-3" style={{padding:0}}>
                                                <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.returns.netAssetValue}</h5>
                                                <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>单位净值</h5>
                                            </div>
                                            <div className="col-lg-3" style={{padding:0}}>
                                                <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.returns.untilNowChange}</h5>
                                                <h5 className="g-pt-5" style={{fontSize:"14px", color:'#6C6C6C'}}>涨跌幅</h5>
                                            </div>
                                            <div className="col-lg-3" style={{padding:0}}>
                                                <h5 className="g-pt-5"  style={{fontSize:"16px", color:'#FC5D45'}}>{item.startTimeStr}</h5>
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
                                    <div className="col-lg-8" id={`main2${index}`} style={{height:"180px", width:'300px'}}></div>                            </div>
                            </div>
                        </Link>
                    </li>
                );
            });
        }

    }
    render(){
        return(
            <div className="container g-pt-100 g-px-40 g-pb-100 clearfix">
                <div className="clearfix">
                    <ul className="clearfix">
                        {this.renderList()}
                    </ul>
                </div>
                {/*<div className="g-my-30">*/}
                    {/*<Pagination    defaultPageSize={this.state.pageSize} total={100}/>*/}
                {/*</div>*/}
            </div>

        );
    }
}

function mapStateToProps(state) {
    // console.log(state.fund.myfund);
    return {
        myfund:state.fund.myfund,
        error:state.fund.error
    };
}

export default connect(mapStateToProps, {fetchFundMy })(Listfundmy);