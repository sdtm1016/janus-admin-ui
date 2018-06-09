import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button } from '@icedesign/base';
import CellEditor from './CellEditor';
import './EditableTable.scss';

const generatorData = () => {
  return Array.from({ length: 0 }).map((item, index) => {
    return {
      code: `业务码${index}`,
      message: `错误信息${index}`,
      description: `描述${index}`,
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
      code: `业务码`,
      message: `错误信息`,
      description: `描述`,
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
              width={160}
              title="业务码"
              cell={this.renderEditor.bind(this, 'code')}
            />
            <Table.Column
              width={160}
              title="错误信息"
              cell={this.renderEditor.bind(this, 'message')}
            />
            <Table.Column
              width={160}
              title="描述"
              cell={this.renderEditor.bind(this, 'description')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增后端业务码
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
