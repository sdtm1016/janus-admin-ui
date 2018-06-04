import React, { Component } from 'react';
import { Pagination, Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import { enquireScreen } from 'enquire-js';
import AddApiGroupFormDialog from '../../components/AddApiGroupFormDialog';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/api-group-table.json',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 10,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class ApiGroupTable extends Component {
  static displayName = 'ApiGroupTable';

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

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  formatCtime = (value, index, record) => {
    return new Date(value).toLocaleString();
  }

  renderOperations = (value, index, record) => {
    return (
      <div style={{ lineHeight: '28px' }}>
        <a
          href="#"
          style={styles.operation}
          target="_blank"
          onClick={() => {
            this.editItem(record);
          }}
        >
          API管理
        </a>
        <a href={"#/group/" + record.id} style={styles.operation}>
          查看详情
        </a>
        <a href="#" style={styles.operation} target="_blank">
          环境管理
        </a>
        <a href="#" style={styles.operation} target="_blank">
          删除
        </a>
      </div>
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
          <AddApiGroupFormDialog />
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column
              title="分组"
              dataIndex="name"
              width={50}
            />
            <Table.Column title="描述" dataIndex="description" width={180} />
            <Table.Column
              title="创建时间"
              dataIndex="ctime"
              width={150}
              cell={this.formatCtime}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={200}
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
  SimpleFormDialog: {
    align: 'right',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
