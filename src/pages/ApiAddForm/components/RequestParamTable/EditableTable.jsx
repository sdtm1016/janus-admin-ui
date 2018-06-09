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
      type: `参数类型${index}`,
      required: `是否必填${index}`,
      default: `默认值${index}`,
      description: `描述${index}`
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
      location: `编辑编辑参数位置`,
      type: '点击编辑参数类型',
      required: '是',
      default: '点击编辑默认值',
      description: '点击编辑参数描述'
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
              title="参数类型"
              cell={this.renderEditor.bind(this, 'type')}
            />
            <Table.Column
              width={80}
              title="是否必填"
              cell={this.renderEditor.bind(this, 'required')}
            />
            <Table.Column
              width={140}
              title="默认值"
              cell={this.renderEditor.bind(this, 'default')}
            />
            <Table.Column
              width={160}
              title="参数描述"
              cell={this.renderEditor.bind(this, 'description')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增前端请求参数
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
