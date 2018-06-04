import React, { Component } from 'react';
import RegionFilterAndSearch from '../RegionFilterAndSearch';
import ApiGroupTable from './components/ApiGroupTable';


export default class ApiGroupList extends Component {
  static displayName = 'ApiGroupList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="api-group-list-page">
        <RegionFilterAndSearch />
        <ApiGroupTable />
      </div>
    );
  }
}
