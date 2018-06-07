import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Grid, Input, Search } from '@icedesign/base'
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import { enquireScreen } from 'enquire-js';
import SwichApiVersionFormDialog from '../../SwichApiVersionFormDialog'

const { Row, Col } = Grid;

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/api-deploy-history-list.json',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class DeployHistoryTable extends Component {
  static displayName = 'DeployHistoryTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.fetchData({
      page: 1,
    });
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  fetchData = ({ page }) => {
    this.props.updateBindingData('tableData', {
      data: {
        page,
      },
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span
          style={{
            marginLeft: '10px',
            lineHeight: '20px',
          }}
        >
          {record.title}
        </span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    console.log(record.status);
    if (record.status == 'NONDEPLOYED') {
      return (
        <div
          className="filter-table-operation"
        >
          <div className="operations">
            <Row>
              <Col span={4} style={styles.operationItem}>
                <a href="#" target="_blank">
                  查看
          </a>
              </Col>
              <Col span={12} style={styles.operationItem}>
                <SwichApiVersionFormDialog apiName={this.props.apiName} apiId={this.props.apiId}/>
              </Col>
            </Row>
          </div>
        </div>

      );
    } else {
      return (
        <div
          className="filter-table-operation"
        >
          <div className="operations">
            <Row>
              <Col span={4} style={styles.operationItem}>
                <a href="#" target="_blank">
                  查看
          </a>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  formatCtime = (value, index, record) => {
    return new Date(value).toLocaleString();
  }

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="simple-table">
        <IceContainer>
          <Row style={styles.formRow} gutter={24}>
            <Col span={6}>
              <label style={styles.formLabel}>输入版本号：</label>
            </Col>
            <Col span={12} offset={6}>
              <Search
                inputWidth={150}
                searchText=""
                size="large"
                placeholder="请输入版本号"
                onSearch={this.handleSearch}
                style={{ display: 'inline-block' }}
              />
            </Col>
          </Row>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="版本" dataIndex="version" width={90} />
            <Table.Column title="环境" dataIndex="environment" width={80} />
            <Table.Column title="发布时间" dataIndex="ctime" width={150} cell={this.formatCtime} />
            <Table.Column title="描述" dataIndex="description" width={150} />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={210}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
              type={this.state.isMobile ? 'simple' : 'normal'}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
  operationItem: {
    marginRight: '7px',
    textDecoration: 'none',
    color: '#5485F7',
  },
};
