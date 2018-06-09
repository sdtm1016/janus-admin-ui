import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button } from '@icedesign/base';
import CellEditor from './CellEditor';
import './EditableTable.scss';

const generatorData = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
      name: `参数名${index}`,
      location: `参数位置${index}`,
      requestName: `请求参数名${index}`,
      requestLocation: `请求参数位置${index}`,
      requestType: `请求参数类型${index}`,
    };
  });
};

export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
    };
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} shape="text">
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  addNewItem = () => {
    this.state.dataSource.push({
      name: `点击编辑参数名`,
      location: `点击编辑参数位置`,
      requestName: `点击编辑请求参数名`,
      requestLocation: `点击编辑请求参数位置`,
      requestType: `点击编辑请求参数类型`,
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column
              width={150}
              title="参数名"
              cell={this.renderEditor.bind(this, 'name')}
            />
            <Table.Column
              width={160}
              title="参数位置"
              cell={this.renderEditor.bind(this, 'location')}
            />
            <Table.Column
              width={160}
              title="请求参数名"
              cell={this.renderEditor.bind(this, 'requestName')}
            />
            <Table.Column
              width={160}
              title="请求参数位置"
              cell={this.renderEditor.bind(this, 'requestLocation')}
            />
            <Table.Column
              width={160}
              title="请求参数类型"
              cell={this.renderEditor.bind(this, 'requestType')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增后端请求参数
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center',
  },
};
