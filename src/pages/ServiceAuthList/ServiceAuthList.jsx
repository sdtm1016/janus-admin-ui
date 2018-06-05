import React, { Component } from 'react';
import RegionFilterAndSearch from '../RegionFilterAndSearch';
import ServiceAuthTable from './components/ServiceAuthTable';

export default class ServiceAuthList extends Component {
  static displayName = 'ServiceAuthList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="service-auth-list-page">
        <RegionFilterAndSearch />
        <ServiceAuthTable />
      </div>
    );
  }
}
