import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button, Search } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import DeployHistoryTable from './DeployHistoryTable';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  envriomentId: 'TEST',
};

export default class ApiDeployTableDialog extends Component {
  static displayName = 'ApiDeployTableDialog';

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
          title="API发布历史"
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
                  <label style={styles.formLabel}>将切换：</label>
                </Col>
                <Col span={`${isMobile ? '9' : '6'}`}>
                  <label style={styles.formLabel}>{this.props.apiName}</label>
                </Col>
                <Col span={`${isMobile ? '9' : '6'}`}>
                  <label style={styles.formLabel}>接口ID：{this.props.apiId}</label>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <DeployHistoryTable apiName={this.props.apiName} apiId={this.props.apiId} />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <a onClick={this.showDialog}>
          发布历史
        </a>
      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: {
  },
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
