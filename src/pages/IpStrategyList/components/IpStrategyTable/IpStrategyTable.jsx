import React, { Component } from 'react';
import { Pagination, Grid, Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import { enquireScreen } from 'enquire-js';
import AddIpStrategyFormDialog from '../AddIpStrategyFormDialog'
import ApiRuleBindFormDialog from '../../../ApiRuleBindFormDialog'
import './index.css';

const { Row, Col } = Grid;

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/ip-control-list.json',
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
export default class IpStrategyTable extends Component {
  static displayName = 'IpStrategyTable';

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
    return (
      <div
        className="filter-table-operation"
      >
        <div className="operations">
          <Row>
            <Col span={5} style={styles.operationItem}>
              <ApiRuleBindFormDialog />
            </Col>
            <Col span={4} style={styles.operationItem}>
              <a href="#" style={styles.operation} target="_blank">
                详情
              </a>
            </Col>
            <Col span={4} style={styles.operationItem}>
              <a href="#" style={styles.operation} target="_blank">
                删除
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
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

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="simple-table">
        <IceContainer>
          <AddIpStrategyFormDialog />
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >

            <Table.Column title="名称" dataIndex="name" width={85} />
            <Table.Column title="类型" dataIndex="type" width={85} />
            <Table.Column title="描述" dataIndex="description" width={185} />

            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
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
  operationItem: {
    marginRight: '7px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
