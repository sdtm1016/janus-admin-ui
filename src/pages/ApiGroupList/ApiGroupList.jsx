import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
import SimpleTable from './components/SimpleTable';


export default class ApiGroupList extends Component {
  static displayName = 'ApiGroupList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="api-group-list-page">
        <FilterWithSearch />
        <SimpleTable />
      </div>
    );
  }
}
