import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
import SimpleTable from './components/SimpleTable';

export default class ServiceAuthList extends Component {
  static displayName = 'ServiceAuthList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="service-auth-list-page">
        <FilterWithSearch />
        <SimpleTable />
      </div>
    );
  }
}
