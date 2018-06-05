import React, { Component } from 'react';


import RealTimeStatistics from './components/RealTimeStatistics';
import YestodayDisplayCard from './components/YestodayDisplayCard';
import GatewayTotalData from './components/GatewayTotalData';
import Filter from './components/Filter';
import RequestCountStatistics from './components/RequestCountStatistics';
import { Grid } from '@icedesign/base';

import './Dashboard.scss';
const { Row, Col } = Grid;
export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <GatewayTotalData />
        <RealTimeStatistics />
        <YestodayDisplayCard />
        <Filter />
        <Row>
          <Col span={24}>
            <RequestCountStatistics />
          </Col>
        </Row>

      </div>
    );
  }
}
