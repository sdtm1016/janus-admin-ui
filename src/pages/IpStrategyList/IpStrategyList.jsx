import React, { Component } from 'react';
import RegionFilterAndSearch from '../RegionFilterAndSearch';
import IpStrategyTable from './components/IpStrategyTable';

export default class IpStrategyList extends Component {
  static displayName = 'IpStrategyList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ip-strategy-list-page">
        <RegionFilterAndSearch />
        <IpStrategyTable />
      </div>
    );
  }
}
