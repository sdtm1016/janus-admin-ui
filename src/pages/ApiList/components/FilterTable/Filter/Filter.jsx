import React, { Component } from 'react';
import { Button, DatePicker, Grid, Input, Select } from '@icedesign/base';
// form binder 详细用法请参见官方文档
import { FormBinder as IceFormBinder, FormBinderWrapper as IceFormBinderWrapper } from '@icedesign/form-binder';

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
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>类型</label>
              <IceFormBinder>
                <Select
                  name="type"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="ALL">全部</Option>
                  <Option value="PRIVATE">私有</Option>
                  <Option value="PUBLIC">公开</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>API分组</label>
              <IceFormBinder>
                <Select
                  name="groupId"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="ALL">全部</Option>
                  <Option value="test_api_group01">用于测试的API分组</Option>
                  <Option value="test_api_group02">test_api_group03</Option>
                  <Option value="test_api_group03">test_api_group04</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
              <label style={styles.filterTitle}>发布环境</label>
              <IceFormBinder>
                <Select name="environmentId" style={styles.filterTool}>
                  <Option value="ALL">全部</Option>
                  <Option value="TEST">测试环境</Option>
                  <Option value="PRE">预发布环境</Option>
                  <Option value="ONLINE">线上环境</Option>
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
