/**
 * Created by fengxiaoli on 2017/12/14.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './common/header-all';
import Footer from './common/footer';
class Issuefund extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="form-banner form-style g-pt-30 g-mb-20">
                    <div className="text-center">
                        <h1>申请发行基金</h1>
                        <hr/>
                        <p>请按照步骤完成申请,工作人员之后会与您联系具体发行事宜.</p>
                    </div>
                </div>
                <div className="container form-style">
                    <div className="col-lg-9 base-info g-py-20 g-px-50">
                        <h2 className="g-mb-20 g-mt-10">填写基本信息</h2>
                        <ul>
                            <li className="text-left clear">
                                <span className="col-lg-3">您的姓名</span>
                                <input type="text" className="input col-lg-9"/>

                            </li>
                            <li className="text-left clear">
                                <span className="col-lg-3">InvestDigital号</span>
                                <input type="text" className="input col-lg-9"/>
                            </li>
                            <li className="text-left clear">
                                <span className="col-lg-3">您的手机</span>
                                <input type="text" className="input col-lg-9"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container form-style g-pb-150">
                    <div className="col-lg-9  g-pa-20">
                        <div className="clear">
                            <ul>
                                <li className="input-radio">
                                    <h1>01.资产管理规模</h1>
                                    <input name="size" type="radio"/> <span>300万元以下</span><br/><br/>
                                    <input name="size" type="radio"/> <span>300万元-500万</span><br/><br/>
                                    <input name="size" type="radio"/> <span>500万以上</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>02. 拟发行私募时间？</h1>
                                    <input name="time" type="radio"/> <span>立刻发行</span><br/><br/>
                                    <input name="time" type="radio"/> <span>3个月内</span><br/><br/>
                                    <input name="time" type="radio"/> <span>3-6个月内</span><br/><br/>
                                    <input name="time" type="radio"/> <span>无法确定</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>03. 是否具备基金从业资格</h1>
                                    <input name="qualifications" type="radio"/> <span>1人具备从业资格</span><br/><br/>
                                    <input name="qualifications" type="radio"/> <span>2人或2人以上具备从业资格</span><br/><br/>
                                    <input name="qualifications" type="radio"/> <span>不具备</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>04. 私募运行阶段</h1>
                                    <input name="private" type="radio"/> <span>尚未成立公司</span><br/><br/>
                                    <input name="private" type="radio"/> <span>初创型私募</span><br/><br/>
                                    <input name="private" type="radio"/> <span>成长型私募</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>05. 是否在基金业协会备案</h1>
                                    <input name="qualifications" type="radio"/> <span>已备案登记</span><br/><br/>
                                    <input name="qualifications" type="radio"/> <span>尚未备案登记</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>06. 发行产品情况</h1>
                                    <input name="qualifications" type="radio"/> <span>未曾发行产品</span><br/><br/>
                                    <input name="qualifications" type="radio"/> <span>已发行产品</span><br/><br/>
                                </li>
                            </ul>
                            <Link className="form-style" to="/issuefund">
                                <button className="btn Issuing-fund g-my-50 " >提交信息</button>
                            </Link>
                        </div>
                    </div>

                </div>

                <Footer/>
            </div>
        );
    }
}

export default Issuefund;
