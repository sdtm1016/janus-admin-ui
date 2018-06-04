import React, { Component } from 'react';
import RegionFilterAndSearch from '../RegionFilterAndSearch';
import FilterTable from './components/FilterTable';

export default class ApiList extends Component {
  static displayName = 'ApiList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="api-list-page">
        <RegionFilterAndSearch />
        <FilterTable />
      </div>
    );
  }
}
