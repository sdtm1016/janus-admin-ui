import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
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
        <FilterWithSearch />
        <FilterTable />
      </div>
    );
  }
}
