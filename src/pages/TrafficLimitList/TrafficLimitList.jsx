import React, { Component } from 'react';
import RegionFilterAndSearch from '../RegionFilterAndSearch';
import TrafficLimitTable from './components/TrafficLimitTable';

export default class TrafficLimitList extends Component {
  static displayName = 'TrafficLimitList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="traffic-limit-list-page">
        <RegionFilterAndSearch />
        <TrafficLimitTable />
      </div>
    );
  }
}
