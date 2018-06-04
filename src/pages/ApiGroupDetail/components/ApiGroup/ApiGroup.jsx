import React, { Component } from 'react';
import { Grid, Rating } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Progress from './Progress';
import axios from 'axios';
import UpdateApiGroupFormDialog from '../UpdateApiGroupFormDialog'


const { Row, Col } = Grid;

const defaultValue = {
  regionId: '',
  regionName: '',
  id: '',
  name: '',
  description: '',
  subDomain: '',
  trafficLimit: 500,
  ctime: 0,
  mtime: 0,
  status: 1
};


export default class ReviewOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
    };
    this.fetchData(1);
  }

  fetchData = (groupId) => {
    axios.get('/mock/api-group-detail.json').then((result) => {
      this.setState({
        value: result.data
      })
    });
  };

  formatCtime = (value, index, record) => {
    return new Date(value).toLocaleString();
  }


  static displayName = 'ReviewOverview';
  render() {
    return (
      <div>
        <Row wrap gutter="20">
          <Col s="24" xxs="24">
            <IceContainer style={styles.container} title="分组概览">
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={8} >
                  <div style={styles.orverviewDataWithRightBorad}>
                    地域：{this.state.value.regionName} {this.state.value.regionId}
                  </div>
                </Col>
                <Col span={8}>
                  <div style={styles.orverviewDataWithRightBorad}>
                    名称：{this.state.value.name}
                  </div>
                </Col>
                <Col span={8}>
                  <div style={styles.overviewData}>
                    分组id：{this.state.value.id}
                  </div>
                </Col>
              </Row>
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={24}>
                  <div style={styles.overviewData}>
                    子域地址：{this.state.value.subDomain}
                  </div>
                </Col>
              </Row>
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={12}>
                  <div style={styles.orverviewDataWithRightBorad}>
                    分组状态：{this.state.value.status == 1 ? '可用' : '禁用'}
                  </div>
                </Col>
                <Col span={12}>
                  <div style={styles.overviewData}>
                    QPS限制：{this.state.value.trafficLimit}
                  </div>
                </Col>
              </Row>
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={12}>
                  <div style={styles.orverviewDataWithRightBorad}>
                    创建时间：{new Date(this.state.value.ctime).toLocaleString()}
                  </div>
                </Col>
                <Col span={12}>
                  <div style={styles.overviewData}>
                    修改时间：{new Date(this.state.value.mtime).toLocaleString()}
                  </div>
                </Col>
              </Row>
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={24}>
                  <div style={styles.overviewDataSmall}>
                    描述：{this.state.value.description}
                  </div>
                </Col>
              </Row>
              <Row wrap gutter="24" style={styles.RowBoard}>
                <Col span={24}>
                  <UpdateApiGroupFormDialog
                    regionId={this.state.value.regionId}
                    regionName={this.state.value.regionName}
                    groupId={this.state.value.groupId}
                    name={this.state.value.name}
                    subDomain={this.state.value.subDomain}
                    trafficLimit={this.state.value.trafficLimit}
                    description={this.state.value.description}
                  />
                </Col>
              </Row>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    height: 450,
  },
  RowBoard: {
    borderTop: '1px solid #eee',
  },
  overviewData: {
    paddingTop: 25,
    paddingBottom: 5,
    fontSize: 21,
  },
  orverviewDataWithRightBorad: {
    borderRight: '1px solid #eee',
    paddingTop: 25,
    paddingBottom: 5,
    fontSize: 21,
  },
  overviewDataSmall: {
    paddingTop: 25,
    fontSize: 15,
  },
};
