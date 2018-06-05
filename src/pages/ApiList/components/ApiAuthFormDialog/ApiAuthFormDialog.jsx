import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button, Search } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import AuthAppList from './AuthAppList';
import AlreadyAuthAppList from './AlreadyAuthAppList';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  envriomentId: 'TEST',
};

export default class ApiAuthFormDialog extends Component {
  static displayName = 'ApiAuthFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = () => {
    this.setState({
      visible: true,
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      // deal with value

      this.hideDialog();
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSearch = () => {
    // handler logical
  };

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <IceContainer>
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="API授权"
          {...this.props}
          onOk={this.onOk}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
          isFullScreen
          visible={this.state.visible}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>将授权：</label>
                </Col>
                <Col span={`${isMobile ? '9' : '6'}`}>
                  <label style={styles.formLabel}>{this.props.apiName}</label>
                </Col>
                <Col span={`${isMobile ? '9' : '6'}`}>
                  <label style={styles.formLabel}>接口ID：{this.props.apiId}</label>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>授权环境：</label>
                </Col>
                <Col>
                  <IceFormBinder>
                    <RadioGroup
                      name="envriomentId"
                      dataSource={[
                        {
                          value: 'TEST',
                          label: '测试环境',
                        },
                        {
                          value: 'PRE',
                          label: '预发布环境',
                        },
                        {
                          value: 'ONLINE',
                          label: '线上环境',
                        },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={10}>
                  <AuthAppList />
                </Col>
                <Col span={10} offset={4}>
                  <AlreadyAuthAppList />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <a onClick={this.showDialog}>
          授权
        </a>
      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: {},
  dialogContent: {},
  formRow: {
    paddingTop: 15,
    borderTop: '1px solid #eee',
  },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  rightBorad: {
    borderRight: '1px solid #eee',
  },
};
