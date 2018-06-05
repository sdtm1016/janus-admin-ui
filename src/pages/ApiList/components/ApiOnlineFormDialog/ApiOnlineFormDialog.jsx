import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  apiId: '',
  apiName: '',
  envriomentId: 'TEST',
  description: '',
};

export default class ApiOnlineFormDialog extends Component {
  static displayName = 'ApiOnlineFormDialog';

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
          title="发布API"
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
                  <label style={styles.formLabel}>将发布：</label>
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
                  <label style={styles.formLabel}>发布环境：</label>
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
                <Col>
                  <IceFormBinder>
                    <Input
                      name="description"
                      style={styles.input}
                      multiple
                      placeholder="请输入发布备注信息"
                      rows={4}
                    />
                  </IceFormBinder>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <a onClick={this.showDialog}>
          发布
        </a>
      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
