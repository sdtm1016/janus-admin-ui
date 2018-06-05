import React, { Component } from 'react';
import AppTable from './components/AppTable';

export default class AppList extends Component {
  static displayName = 'AppList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-list-page">
        <AppTable />
      </div>
    );
  }
}
