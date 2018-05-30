import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
import SimpleTable from './components/SimpleTable';

export default class IpStrategyList extends Component {
  static displayName = 'IpStrategyList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ip-strategy-list-page">
        <FilterWithSearch />
        <SimpleTable />
      </div>
    );
  }
}
