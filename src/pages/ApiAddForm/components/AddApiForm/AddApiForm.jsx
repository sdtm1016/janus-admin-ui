import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Grid, Input, Button, Select, Checkbox, Radio } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import RequestParamTable from '../RequestParamTable'
import ServiceParamTable from '../ServiceParamTable'
import ConstParamTable from '../ConstParamTable'
import ErrorCodeTable from '../ErrorCodeTable'

const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;
const telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

export default class AddApiForm extends Component {
  static displayName = 'AddApiForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      formValue: {
        groupId: 'test',
        name: '',
        authType: 'OAuth2',
        signMethod: 'HmacSHA256',
        type: '',
        description: '',
        protocol: '',
        requestPath: '',
        requestMethod: '',
        requestMode: 'MAPPING',
        serviceType: '',
        serviceAddress: '',
        servicePath: '',
        serviceHttpMethod: '',
        timeout: 2000,
        sampleSuccessResult: '',
        sampleFailResult: '',
      },
    };
  }

  // ICE: React Component 的生命周期

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  formChange = (newValue) => {
    this.setState({
      formValue: newValue,
    });
  };

  nextStep = () => {
    // this.form.validateAll((error, value) => {
    //   console.log(value);
    //   if (!error || error.length === 0) {
    this.setState({ step: this.state.step + 1 });
    //   }
    // });
  };
  lastStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  renderStep = (step) => {
    if (step === 0) {
      const { username, email, phone, address } = this.state.formValue;
      const initValue = {
        username,
        email,
        phone,
        address,
      };
      return (
        <IceContainer style={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            value={this.state.formValue}
            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>分组：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Select
                      name="groupId"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="test">用于测试的API分组</Option>
                      <Option value="test1">test1</Option>
                      <Option value="test2">test2</Option>
                      <Option value="test3">test3</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="groupId" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>名称：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      name="name"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="name" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>认证方式：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Select
                      name="authType"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="NON">无认证</Option>
                      <Option value="OAuth2">OAuth2.0客户端模式</Option>
                      <Option value="sign">签名模式</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="authType" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>签名算法：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Select
                      name="signMethod"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="HmacSHA256">HmacSHA256</Option>
                      <Option value="HmacSHA1">HmacSHA1</Option>
                      <Option value="NON">无认证</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="signMethod" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  描述：
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      required
                      message="必填"
                      multiple
                      name="description"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="description" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col offset={7}>
                  <Button onClick={this.nextStep} type="primary">
                    下一步
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      );
    } else if (step === 1) {
      return (
        <IceContainer style={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}

            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>协议：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Checkbox.Group name="protocol" style={{ width: '100%' }}>
                      <Checkbox value="HTTP">HTTP</Checkbox>
                      <Checkbox value="HTTPS">HTTPS</Checkbox>
                    </Checkbox.Group>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="protocol" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>请求路径：</span>
                </Col>
                <Col s="14" l="12">
                  <Input
                    name="requestPath"
                    size="large"
                    style={{ width: '100%' }}
                  />
                  <div style={styles.formErrorWrapper}>
                    <FormError name="requestPath3" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>HTTP方法：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Select
                      name="requestMethod"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="GET">GET</Option>
                      <Option value="POST">POST</Option>
                      <Option value="PUT">PUT</Option>
                      <Option value="DELETE">DELETE</Option>
                      <Option value="HEAD">HEAD</Option>
                      <Option value="PATCH">PATCH</Option>
                      <Option value="ANY">ANY</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="requestMethod" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>入参映射：</span>
                </Col>
                <Col s="14" l="12">

                  <Select
                    name="requestMode"
                    placeholder="请选择"
                    style={styles.filterTool}
                  >
                    <Option value="MAPPING">入参映射</Option>
                    <Option value="CONVERT">入参透传</Option>
                  </Select>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="requestMode" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col>
                  <RequestParamTable />
                </Col>
              </Row>
              <Row>
                <Col offset={7}>
                  <Button onClick={this.lastStep} type="normal">
                    上一步
                  </Button>
                </Col>
                <Col>
                  <Button onClick={this.nextStep} type="primary">
                    下一步
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      );
    } else if (step === 2) {
      return (
        <IceContainer style={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>服务类型：</span>
                </Col>
                <Col>
                  <FormBinder required message="必填项">
                    <RadioGroup
                      name="serviceType"
                      dataSource={[
                        {
                          value: 'HTTP',
                          label: 'HTTP/HTTPS',
                        }
                      ]}
                    />
                  </FormBinder>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>后端服务地址：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      name="serviceAdress"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="serviceAdress" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  后端请求路径：
              </Col>
                <Col s="14" l="12">
                  <FormBinder required message="路径不合法">
                    <Input
                      name="servicePath"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="servicePath" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  后端请求方法：
              </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Select
                      name="serviceHttpMethod"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="GET">GET</Option>
                      <Option value="POST">POST</Option>
                      <Option value="PUT">PUT</Option>
                      <Option value="DELETE">DELETE</Option>
                      <Option value="HEAD">HEAD</Option>
                      <Option value="PATCH">PATCH</Option>
                      <Option value="ANY">ANY</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="serviceHttpMethod" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  超时时间：
              </Col>
                <Col s="13" l="11">
                  <FormBinder
                    required
                    message="请输入合法的超时时间"
                  >
                    <Input
                      name="timeout"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="timeout" />
                  </div>
                </Col>
                <Col s="1" l="1" style={styles.formLabel}>
                  <span>毫秒</span>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <ServiceParamTable />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <ConstParamTable />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <ErrorCodeTable />
                </Col>
              </Row>
              <Row>
                <Col offset={7}>
                  <Button onClick={this.lastStep} type="normal">
                    上一步
                  </Button>
                </Col>
                <Col>
                  <Button onClick={this.nextStep} type="primary">
                    下一步
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      );
    } else if (step === 3) {
      return (
        <IceContainer style={styles.form}>
          <FormBinderWrapper
            ref={(form) => {
              this.form = form;
            }}
            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  成功响应示例
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Input
                      required
                      message="必填"
                      multiple
                      name="sampleSuccessResult"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="sampleSuccessResult" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  失败响应示例
                </Col>
                <Col s="14" l="12">
                    <Input
                      required
                      message="必填"
                      multiple
                      name="sampleFailResult"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  <div style={styles.formErrorWrapper}>
                    <FormError name="sampleFailResult" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col offset={7}>
                  <Button onClick={this.lastStep} type="normal">
                    上一步
                  </Button>
                </Col>
                <Col>
                  <Button type="primary">
                    <a href="/#/api/index" style={styles.buttonA}>
                      完成
                    </a>
                  </Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      );
    }
  };

  render() {
    return (
      <div className="simple-fluency-form">
        <IceContainer>
          <Step current={this.state.step} type="dot">
            <Step.Item key={0} title="基本信息" />
            <Step.Item key={1} title="请求信息" />
            <Step.Item key={2} title="服务信息" />
            <Step.Item key={3} title="响应信息" />
          </Step>
        </IceContainer>
        {this.renderStep(this.state.step)}
      </div>
    );
  }
}

const styles = {
  form: {
    padding: '40px 20px',
  },
  formLabel: {
    textAlign: 'right',
    lineHeight: '1.7rem',
    paddingRight: '10px',
  },
  formRow: {
    marginBottom: '20px',
  },
  formErrorWrapper: {
    marginTop: '5px',
  },
  simpleFluencyForm: {},
  buttonA: {
    textDecoration: 'none',
    color: '#FFF'
  }
};
