import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends Component {
  static displayName = 'Filter';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>地域</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="TEST">北京</Option>
                  <Option value="PRE">上海</Option>
                  <Option value="ONLINE">香港</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>环境</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="TEST">测试</Option>
                  <Option value="PRE">预发布</Option>
                  <Option value="ONLINE">线上</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>分组</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="TEST">test</Option>
                  <Option value="PRE">test1</Option>
                  <Option value="ONLINE">test2</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>API</label>
              <IceFormBinder>
                <Select
                  name="size"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="TEST">API1</Option>
                  <Option value="PRE">API2</Option>
                  <Option value="ONLINE">API3</Option>
                </Select>
              </IceFormBinder>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
