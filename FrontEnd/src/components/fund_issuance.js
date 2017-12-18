/**
 * Created by fengxiaoli on 2017/12/13.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './common/header-all';
class FundIssuance extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header />
                <div className='fund clear'>
                    <div className="fund-banner">
                        <div className="fund-bgc">
                            <div className="fund-content text-center">
                                <div className="fund-title">
                                    <h1>InvestDigital基金工厂</h1>
                                    <hr />
                                    <h2>最靠谱的基金发行服务平台</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fund clear'>
                    <div className='fund-what-factory'>
                        <div className="fund-what-content text-center">
                            <h1>什么是基金工厂?</h1>
                            <hr />
                            <h2>InvestDigital基金工厂是帮助投资者“一键发行基金”的互联网资管服务平台</h2>
                        </div>
                        <div className='col-lg-4 fa-bz-1'>
                            <div className='text-center num-title'><p>1</p></div>
                            <div className='text-center'>
                                <img src="../../public/img/first.png" />
                                <h1>准备期</h1>
                            </div>
                            <p className="num-info">InvestDigital基金工厂协助您完成资质申请、协会备案、产品设立等产品发行前期流程</p>
                        </div>
                        <div className='col-lg-4 fa-bz-1'>
                            <div className='text-center num-title'><p>2</p></div>
                            <div className='text-center'>
                                <img src="../../public/img/second.png" />
                                <h1>募集期</h1>
                            </div>
                            <p className="num-info">InvestDigital基金工厂通过ID官方向合格投资者展现您的产品，并且协助完成募集资金事项</p>
                            <img src="../../public/img/jiantou.png" />
                        </div>
                        <div className='col-lg-4 fa-bz-1'>
                            <div className='text-center num-title'><p>3</p></div>
                            <div className='text-center'>
                                <img src="../../public/img/third.png" />
                                <h1>运营期</h1>
                            </div>
                            <p className="num-info">InvestDigital基金工厂将帮助您打造自己的基金品牌，并且协助您扩大可管资产的资金规模</p>
                            <img src="../../public/img/jiantou.png" />
                        </div>
                    </div>
                </div>
                <div className='fund clear fund-help-bgc'>
                    <div className='fund-help-factory'>
                        <div className="fund-what-content text-center">
                            <h1>基金工厂怎么帮到你?</h1>
                            <hr />
                            <h2>作为基金发行的一站式服务平台，InvestDigital将全流程协助您完成如下重要工作：</h2>
                        </div>
                        <div className='fa-help-bz'>
                            <div className='col-lg-2 fa-bz-2'>
                                <div className='text-center num-title'><p className='num-rotate'>1</p></div>
                                <div className='text-center'>
                                    <h1>资质申请</h1>
                                </div>
                                <p className="num-info">帮助你注册公司，取得管理人资质</p>
                            </div>
                            <div className='col-lg-2 fa-bz-2'>
                                <div className='text-center num-title'><p className='num-rotate'>2</p></div>
                                <div className='text-center'>
                                    <h1>产品创设</h1>
                                </div>
                                <p className="num-info">共同确定基金要素，拟定基金协议，设置投资范围，设定风控指标</p>
                            </div>
                            <div className='col-lg-2 fa-bz-2'>
                                <div className='text-center num-title'><p className='num-rotate'>3</p></div>
                                <div className='text-center'>
                                    <h1>产品设立</h1>
                                </div>
                                <p className="num-info">协助完成合同签署，账户凯丽，资金归集，产品备案，直到产品投入运行</p>
                            </div>
                            <div className='col-lg-2 fa-bz-2'>
                                <div className='text-center num-title'><p className='num-rotate'>4</p></div>
                                <div className='text-center'>
                                    <h1>业绩鉴证</h1>
                                </div>
                                <p className="num-info">为产品提供具备公信力的估值</p>
                            </div>
                            <div className='col-lg-2 fa-bz-2'>
                                <div className='text-center num-title'><p className='num-rotate'>5</p></div>
                                <div className='text-center'>
                                    <h1>产品展示</h1>
                                </div>
                                <p className="num-info">产品净值可在id的“基金工厂”产品筛选器查询，并拥有自己的专属页面</p>
                            </div>
                            <div />
                        </div>
                    </div>
                    <div className='fund-other-factory'>
                        <div className="fund-what-content text-center clear">
                            <h2>除此之外，基金工厂还将协助您完成更多基金运行相关工作</h2>
                        </div>
                        {/* <div className='fa-other-work clear'>
                         <div className='col-lg-4 fa-bz-3'>
                                <div className='text-center'>
                                    <h1>基金评价</h1>
                                    <hr/>
                                </div>
                                <p className="num-info">对基金盈利能力和风控能力进行评估，并深入分析挖掘基金的投资行为特征</p>
                            </div>
                    </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default FundIssuance;
