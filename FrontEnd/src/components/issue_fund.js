/**
 * Created by fengxiaoli on 2017/12/14.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './common/header-all';
import Footer from './common/footer';

import {fetchFundSubmission } from '../actions/fund';

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class Issuefund extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            error: null,
            actionResult: '',
            radio1:"",
            radio2:"",
            // radio3:"",
            // radio4:"",
            // radio5:"",
            // radio6:"",
        };
        this.FundSubmission= this.FundSubmission.bind(this);
        this.radioChange1= this.radioChange1.bind(this);
        this.radioChange2= this.radioChange2.bind(this);
        // this.radioChange3= this.radioChange3.bind(this);
        // this.radioChange4= this.radioChange4.bind(this);
        // this.radioChange5= this.radioChange5.bind(this);
        // this.radioChange6= this.radioChange6.bind(this);
    }
    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };
    FundSubmission(){
        // const { radio} = this.state;
        // console.log(radio);
        // const username = this.refs.name.value;
        // const investDigitalNo = this.refs.id.value;
        // const mobilephone = this.refs.phonenum.value;

        // console.log(username, investDigitalNo, mobilephone);

        // const username = this.refs.name.value;
       const formdata = {
           "username":this.refs.name.value,
           "investDigitalNo": this.refs.id.value,
           "mobilephone": this.refs.phonenum.value,
           "assetManageScale": 3,
           "privateIssuanceTime": 2,
           "fundQualification": 1,
           "privateIssuanceStage": 1,
           "fundAssociationRecord": 2,
           "productDistribution": 1,
       };
       this.props.fetchFundSubmission({ formdata }, err => {
           this.setState({ isModalOpen: true, error: err, actionResult: err || '提交成功!' });
       });
    }
    radioChange1(e) {
        this.setState({radio1:e.target.value});
    }
    radioChange2(e) {
        this.setState({radio2:e.target.value});
    }
    // radioChange3(e) {
    //     this.setState({radio3:e.target.value});
    // }
    // radioChange4(e) {
    //     this.setState({radio4:e.target.value});
    // }
    // radioChange5(e) {
    //     this.setState({radio5:e.target.value});
    // }
    // radioChange6(e) {
    //     this.setState({radio6:e.target.value});
    // }


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
                                <input type="text" className="input col-lg-9" ref="name"/>

                            </li>
                            <li className="text-left clear">
                                <span className="col-lg-3">InvestDigital号</span>
                                <input type="text" className="input col-lg-9" ref="id"/>
                            </li>
                            <li className="text-left clear">
                                <span className="col-lg-3">您的手机</span>
                                <input type="text" className="input col-lg-9" ref="phonenum"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container form-style g-pb-50">
                    <div className="col-lg-9  g-pa-20">
                        <div className="clear">
                            <ul>
                                <li className="input-radio">
                                    <h1>01.资产管理规模</h1>
                                    <input name="size" type="radio" value='1' checked={this.state.radio1 === "1"} onChange={this.radioChange1}/> <span>300万元以下</span><br/><br/>
                                    <input name="size" type="radio" value='2' checked={this.state.radio1 === "2"} onChange={this.radioChange1}/> <span>300万元-500万</span><br/><br/>
                                    <input name="size" type="radio" value='3' checked={this.state.radio1 === "3"} onChange={this.radioChange1}/> <span>500万以上</span><br/><br/>
                                </li>
                                <li className="input-radio">
                                    <h1>02. 拟发行私募时间？</h1>
                                    <input name="time" type="radio" value='1' checked={this.state.radio2 === "1"} onChange={ this.radioChange2}/> <span>立刻发行</span><br/><br/>
                                    <input name="time" type="radio" value='2' checked={this.state.radio2 === "2"} onChange={this.radioChange2}/> <span>3个月内</span><br/><br/>
                                    <input name="time" type="radio" value='3' checked={this.state.radio2 === "3"} onChange={this.radioChange2}/> <span>3-6个月内</span><br/><br/>
                                    <input name="time" type="radio" value='4' checked={this.state.radio2 === "4"} onChange={this.radioChange2}/> <span>无法确定</span><br/><br/>
                                </li>
                                {/*<li className="input-radio">*/}
                                    {/*<h1>03. 是否具备基金从业资格</h1>*/}
                                    {/*<input name="qualifications" type="radio" value='1' checked={this.state.radio3 === "1"} onChange={this.radioChange3}/> <span>1人具备从业资格</span><br/><br/>*/}
                                    {/*<input name="qualifications" type="radio" value='2' checked={this.state.radio3 === "2"} onChange={this.radioChange3}/> <span>2人或2人以上具备从业资格</span><br/><br/>*/}
                                    {/*<input name="qualifications" type="radio" value='3'checked={this.state.radio3 === "3"} onChange={this.radioChange3}/> <span>不具备</span><br/><br/>*/}
                                {/*</li>*/}
                                {/*<li className="input-radio">*/}
                                    {/*<h1>04. 私募运行阶段</h1>*/}
                                    {/*<input name="private" type="radio" value='1' checked={this.state.radio4 === "1"} onChange={this.radioChange4}/> <span>尚未成立公司</span><br/><br/>*/}
                                    {/*<input name="private" type="radio" value='2' checked={this.state.radio4 === "2"} onChange={this.radioChange4}/> <span>初创型私募</span><br/><br/>*/}
                                    {/*<input name="private" type="radio" value='3' checked={this.state.radio4 === "3"} onChange={this.radioChange4}/> <span>成长型私募</span><br/><br/>*/}
                                {/*</li>*/}
                                {/*<li className="input-radio">*/}
                                    {/*<h1>05. 是否在基金业协会备案</h1>*/}
                                    {/*<input name="qualifications" type="radio" value='1' checked={this.state.radio5 === "1"} onChange={this.radioChange5}/> <span>已备案登记</span><br/><br/>*/}
                                    {/*<input name="qualifications" type="radio" value='2' checked={this.state.radio5 === "2"} onChange={this.radioChange5}/> <span>尚未备案登记</span><br/><br/>*/}
                                {/*</li>*/}
                                {/*<li className="input-radio">*/}
                                    {/*<h1>06. 发行产品情况</h1>*/}
                                    {/*<input name="qualifications" type="radio" value='1' checked={this.state.radio6 === "1"} onChange={this.radioChange6}/> <span>未曾发行产品</span><br/><br/>*/}
                                    {/*<input name="qualifications" type="radio" value='2' checked={this.state.radio6 === "2"} onChange={this.radioChange6}/> <span>已发行产品</span><br/><br/>*/}
                                {/*</li>*/}
                            </ul>
                            <Link className="form-style" to="/issuefund">
                                <button className="btn Issuing-fund g-my-50 " onClick={this.FundSubmission}>提交信息</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal} />
                        <ModalTitle>提示:</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p className={this.state.error ? 'text-red' : 'text-green'}>
                            {this.state.actionResult}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn'  onClick={this.hideModal}>
                            <a style={{color:'#444444'}} >关闭</a>
                        </button>
                    </ModalFooter>
                </Modal>
                <Footer/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    console.log(state.fund.all);
    return {
        all:state.fund.all
    };
}

export default connect(mapStateToProps, {fetchFundSubmission})(Issuefund);