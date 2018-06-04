import React, { Component } from 'react';
import { Button, Dialog, Grid, Input } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import RegionFilterAndSearch from '../../../RegionFilterAndSearch';
import emitter from "../../../../utils/events";

const { Row, Col } = Grid;



const defaultValue = {
  name: '',
  description: '',
  domain: '',
};

export default class AddApiGroupDomainFormDialog extends Component {

  static displayName = 'AddApiGroupDomainFormDialog';

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

  componentDidMount() {
    this.eventEmitter = emitter.addListener("regionInfo", (regionInfo) => {
      this.setState({
        value: regionInfo
      })
    });
  };

  // 组件销毁前移除事件监听
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitter);
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
          title="添加域名"
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
                  <label style={styles.formLabel}>名称</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    min={5}
                    max={50}
                    message="名称非法,名称必须唯一，支持汉字、英文字母、数字、英文格式的下划线，必须以英文字母或汉字开头，4~50个字符"
                  >
                    <Input
                      name="name"
                      style={styles.input}
                      placeholder="请输入分组名称"
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '6' : '3'}`}>
                  <label style={styles.formLabel}>域名</label>
                </Col>
                <Col span={`${isMobile ? '18' : '16'}`}>
                  <IceFormBinder
                    required
                    min={5}
                    max={255}
                    message="域名非法"
                  >
                    <Input
                      name="domain"
                      style={styles.input}
                      placeholder="请输入域名"
                    />
                  </IceFormBinder>
                  <IceFormError name="subDomain" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col>
                  <IceFormBinder
                    required
                    min={1}
                    max={180}
                    message="分组名称长度不符合要求,请控制在0-180个字符"
                  >
                    <Input
                      name="description"
                      style={styles.input}
                      multiple
                      placeholder="请输入分组详细描述"
                      rows={4}
                    />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Row>
          <Col xxs={24} s={4} offset={20}>
            <Button type="primary" size="small" onClick={this.showDialog}>
              添加域名
            </Button>
          </Col>
        </Row>

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
