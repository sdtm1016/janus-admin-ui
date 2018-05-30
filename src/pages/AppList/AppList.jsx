import React, { Component } from 'react';
import FilterWithSearch from './components/FilterWithSearch';
import SimpleTable from './components/SimpleTable';

export default class AppList extends Component {
  static displayName = 'AppList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-list-page">
        <FilterWithSearch />
        <SimpleTable />
      </div>
    );
  }
}
