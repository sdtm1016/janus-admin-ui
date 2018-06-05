import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Grid, Input, Search, Select } from '@icedesign/base'
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
// form binder 详细用法请参见官方文档
import { FormBinder as IceFormBinder, FormBinderWrapper as IceFormBinderWrapper } from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;
const { Option } = Select;


@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/auth-app-list.json',
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
export default class ApiList extends Component {
  static displayName = 'ApiList';

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

  renderOperations = (value, index, record) => {
    return (
      <Button type="primary" size="small">
        绑定
      </Button>
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

  formatCtime = (value, index, record) => {
    return new Date(value).toLocaleString();
  }

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="simple-table">
        <IceContainer>
          <Row wrap>
            <Col xxs={24} xs={8} l={4} style={styles.filterCol}>
              <label style={styles.formLabel}>未绑定的API：</label>
            </Col>
            <Col xxs={24} xs={12} l={10} style={styles.filterCol}>
              <label style={styles.filterTitle}>API分组</label>
              <IceFormBinder>
                <Select
                  name="groupId"
                  placeholder="请选择"
                  style={styles.filterTool}
                >
                  <Option value="1">test</Option>
                  <Option value="2">test2</Option>
                  <Option value="3">test3</Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={10} style={styles.filterCol}>
              <Search
                inputWidth={100}
                searchText=""
                size="large"
                placeholder="请输入名称"
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
            <Table.Column title="ID" dataIndex="id" width={80} />
            <Table.Column title="名称" dataIndex="name" width={80} />
            <Table.Column title="已绑规则" dataIndex="ruleName" width={80} />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={120}
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
