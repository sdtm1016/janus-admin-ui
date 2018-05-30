import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
import SimpleTable from './components/SimpleTable';

export default class TrafficLimitList extends Component {
  static displayName = 'TrafficLimitList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="traffic-limit-list-page">
        <FilterWithSearch />
        <SimpleTable />
      </div>
    );
  }
}
