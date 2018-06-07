import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Step, Grid, Input, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;
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
        username: '',
        email: '',
        phone: '',
        address: '',
        username1: '',
        email1: '',
        phone1: '',
        address1: '',
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
    this.form.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        this.setState({ step: this.state.step + 1 });
      }
    });
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
            value={initValue}
            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>分组：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Select
                      name="groupId"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="1">test</Option>
                      <Option value="2">test2</Option>
                      <Option value="3">test3</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="groupId" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>姓名：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      name="username"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="username" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="14" l="12">
                  <FormBinder type="email" required message="邮箱不合法">
                    <Input
                      name="email"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="email" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  电话：
                </Col>
                <Col s="14" l="12">
                  <FormBinder
                    required
                    message="请输入合法的电话号码"
                    pattern={telPattern}
                    triggerType="onBlur"
                  >
                    <Input
                      name="phone"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="phone" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  地址：
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Input
                      required
                      message="必填"
                      multiple
                      name="address"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="address" />
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
                  <span>分组：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Select
                      name="groupId"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="1">test</Option>
                      <Option value="2">test2</Option>
                      <Option value="3">test3</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="groupId" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>姓名：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      name="username1"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="username1" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="14" l="12">
                  <FormBinder type="email1" required message="邮箱不合法">
                    <Input
                      name="email"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="email1" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  电话：
                </Col>
                <Col s="14" l="12">
                  <FormBinder
                    required
                    message="请输入合法的电话号码"
                    pattern={telPattern}
                    triggerType="onBlur"
                  >
                    <Input
                      name="phone1"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="phone1" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  地址：
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Input
                      required
                      message="必填"
                      multiple
                      name="address1"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="address1" />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col offset={7}>
                  <Button onClick={this.lastStep} type="default">
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
                  <span>分组：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Select
                      name="groupId"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="1">test</Option>
                      <Option value="2">test2</Option>
                      <Option value="3">test3</Option>
                    </Select>
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="groupId" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  <span>姓名：</span>
                </Col>
                <Col s="14" l="12">
                  <FormBinder required message="必填项">
                    <Input
                      name="username"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="username" />
                  </div>
                </Col>
              </Row>

              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  邮箱：
              </Col>
                <Col s="14" l="12">
                  <FormBinder type="email" required message="邮箱不合法">
                    <Input
                      name="email"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="email" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  电话：
              </Col>
                <Col s="14" l="12">
                  <FormBinder
                    required
                    message="请输入合法的电话号码"
                    pattern={telPattern}
                    triggerType="onBlur"
                  >
                    <Input
                      name="phone"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="phone" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col xxs="5" s="5" l="7" style={styles.formLabel}>
                  地址：
              </Col>
                <Col s="14" l="12">
                  <FormBinder>
                    <Input
                      required
                      message="必填"
                      multiple
                      name="address"
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="address" />
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
    }
  };

  render() {
    return (
      <div className="simple-fluency-form">
        <IceContainer>
          <Step current={this.state.step} type="dot">
            <Step.Item key={0} title="填写信息" />
            <Step.Item key={1} title="确认信息" />
            <Step.Item key={2} title="完成" />
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
};
