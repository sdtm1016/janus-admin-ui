import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Search } from '@icedesign/base';
import './RegionFilterAndSearch.scss';
import emitter from "../../utils/events";

const { Row, Col } = Grid;

const defaultValue = {
  regionId: 'cn-beijing',
  regionName: '北京'
};



export default class RegionFilterAndSearch extends Component {
  static displayName = 'RegionFilterAndSearch';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue
    };
  }
  selectFilter = (regionId, regionName) => {
    this.state.value.regionId = regionId;
    this.state.value.regionName = regionName;
    // this.forceUpdate();
    this.setState({
      value: {
        regionId: regionId,
        regionName: regionName
      }
    })
    // 触发自定义事件
    emitter.emit("regionInfo", this.state.value);
  };


  handleSearch = () => {
    // handler logical
  };

  render() {

    return (
      <div className="filter-with-search" style={styles.filterWithSearch}>
        <IceContainer
          className="filter-with-search-container"
          style={styles.filterWithSearchContainer}
        >
          <Row wrap justify="space-between" style={styles.row}>
            <Col xxs={24} s={8} style={styles.filterContainer}>
              <span
                className={this.state.value.regionId == 'cn-beijing' ? 'filter-item selected' : 'filter-item'}
                style={styles.filterItem}
                onClick={this.selectFilter.bind(this, 'cn-beijing', '北京')}
              >
                北京
              </span>
              <span
                className={this.state.value.regionId == 'cn-shanghai' ? 'filter-item selected' : 'filter-item'}
                style={styles.filterItem}
                onClick={this.selectFilter.bind(this, 'cn-shanghai', '上海')}
              >
                上海
              </span>
              <span
                className={this.state.value.regionId == 'cn-hongkong' ? 'filter-item selected' : 'filter-item'}
                style={styles.filterItem}
                onClick={this.selectFilter.bind(this, 'cn-hongkong', '香港')}
              >
                香港
              </span>
            </Col>
            <Col xxs={24} s={16} style={styles.searchWrapper}>
              <Search
                inputWidth={150}
                searchText=""
                size="large"
                placeholder="请输入API分组名称"
                onSearch={this.handleSearch}
                style={{ display: 'inline-block' }}
              />
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  row: {
    alignItems: 'center',
  },
  filterContainer: {
    lineHeight: '32px',
  },
  filterItem: {
    height: '20px',
    padding: '0 20px',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    borderRight: '1px solid #D8D8D8',
  },
  searchWrapper: {
    textAlign: 'right',
    margin: '10px 0',
  },
};
