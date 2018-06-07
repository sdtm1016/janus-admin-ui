/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Pagination, Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import ApiOnlineFormDialog from '../ApiOnlineFormDialog';
import ApiAuthFormDialog from '../ApiAuthFormDialog';
import ApiOfflineFormDialog from '../ApiOfflineFormDialog';
import SwichApiVersionFormDialog from '../SwichApiVersionFormDialog';
import ApiDeployTableDialog from '../ApiDeployTableDialog';
import { Dialog, Grid, Input, Radio, Button } from '@icedesign/base';
import './index.css'

const { Row, Col } = Grid;

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/api-list.json',
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
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache,
    });
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
      >
        <div className="operations">
          <Row>
            <Col span={4} style={styles.operationItem}>
              <a href="#" target="_blank">
                管理
              </a>
            </Col>
            <Col span={3} style={styles.operationItem}>
              <ApiOnlineFormDialog apiId={record.id} apiName={record.name} />
            </Col>
            <Col span={3} style={styles.operationItem}>
              <ApiOfflineFormDialog apiId={record.id} apiName={record.name} />
            </Col>
            <Col span={3} style={styles.operationItem}>
              <ApiAuthFormDialog apiId={record.id} apiName={record.name} />
            </Col>
            <Col span={6} style={styles.operationItem}>
              <ApiDeployTableDialog apiId={record.id} apiName={record.name} />
            </Col>
            <Col span={4} style={styles.operationItem}>
              <a href="#" target="_blank">
                删除
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  renderStatus = (value, index, record) => {
    return (
      <div>
        <div align='right'>
          测试：<IceLabel inverse={false} status={record.deployInfo.TEST == 'DEPLOYED' ? 'success' : 'default'}>{record.deployInfo.TEST == 'DEPLOYED' ? '已发布' : '未发布'}</IceLabel>
        </div>
        <div align='right'>
          预发布：<IceLabel inverse={false} status={record.deployInfo.PRE == 'DEPLOYED' ? 'success' : 'default'}>{record.deployInfo.PRE == 'DEPLOYED' ? '已发布' : '未发布'}</IceLabel>
        </div>
        <div align='right'>
          线上：<IceLabel inverse={false} status={record.deployInfo.ONLINE == 'DEPLOYED' ? 'success' : 'default'}>{record.deployInfo.ONLINE == 'DEPLOYED' ? '已发布' : '未发布'}</IceLabel>
        </div>
      </div>
    );
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  formatTableTime = (value, index, record) => {
    return new Date(value).toLocaleString();
  }

  render() {
    const tableData = this.props.bindingData.tableData;
    const { filterFormValue } = this.state;

    return (
      <div className="filter-table">
        <IceContainer title="筛选条件">
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >

            <Table.Column title="名称" dataIndex="name" width={85} />
            <Table.Column title="分类" dataIndex="type" width={85} />
            <Table.Column title="分组" dataIndex="groupName" width={85} />
            <Table.Column title="描述" dataIndex="description" width={140} />
            <Table.Column
              title="修改时间"
              dataIndex="mtime"
              cell={this.formatTableTime}
              width={150}
            />
            <Table.Column
              title="状态"
              cell={this.renderStatus}
              width={120}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={260}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '7px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
