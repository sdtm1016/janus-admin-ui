import React, { Component } from 'react';
import { Button, Dialog, Grid, Input, Radio } from '@icedesign/base';
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
const { Group: RadioGroup } = Radio;


const defaultValue = {
  regionId: 'cn-beijing',
  regionName: '北京',
  name: '',
  type: 'WHITELIST',
  description: '',

};

export default class ServiceAuthFormDialog extends Component {

  static displayName = 'ServiceAuthFormDialog';

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
    emitter.removeListener(this.eventEmitter, () => {
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
          title="创建API密匙"
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
                <Col span={`${isMobile ? '8' : '3'}`}>
                  <label style={styles.formLabel}>所属地域</label>
                </Col>
                <Col span={`${isMobile ? '16' : '6'}`}>
                  <label style={styles.formLabel}>{this.state.value.regionName}({this.state.value.regionId})</label>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '8' : '3'}`}>
                  <label style={styles.formLabel}>密匙名称</label>
                </Col>
                <Col span={`${isMobile ? '16' : '16'}`}>
                  <IceFormBinder
                    required
                    min={5}
                    max={50}
                    message="密匙名称名称非法,名称必须唯一，支持汉字、英文字母、数字、英文格式的下划线，必须以英文字母或汉字开头，4~50个字符"
                  >
                    <Input
                      name="name"
                      style={styles.input}
                      placeholder="请输入密匙名称名称"
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row style={styles.formRow}>

                <Col span={`${isMobile ? '8' : '3'}`}>
                  <label style={styles.formLabel}>AccessKey</label>
                </Col>
                <Col span={`${isMobile ? '16' : '16'}`}>
                  <IceFormBinder
                    required
                    min={8}
                    max={180}
                    message="AccessKey长度不符合要求,请控制在8-180个字符"
                  >
                    <Input
                      name="accessKey"
                      style={styles.input}
                      placeholder="请输入accessKey"
                    />
                  </IceFormBinder>
                  <IceFormError name="accessKey" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={`${isMobile ? '8' : '3'}`}>
                  <label style={styles.formLabel}>AccessSecret</label>
                </Col>
                <Col span={`${isMobile ? '16' : '16'}`}>
                  <IceFormBinder
                    required
                    min={8}
                    max={180}
                    message="AccessSecret长度不符合要求,请控制在8-180个字符"
                  >
                    <Input
                      name="accessSecret"
                      style={styles.input}
                      placeholder="请输入AccessSecret"
                    />
                  </IceFormBinder>
                  <IceFormError name="accessSecret" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
        <Row>
          <Col xxs={24} s={4} offset={20}>
            <Button type="primary" size="small" onClick={this.showDialog}>
              创建密匙
            </Button>
          </Col>
        </Row>

      </IceContainer>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '760px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
