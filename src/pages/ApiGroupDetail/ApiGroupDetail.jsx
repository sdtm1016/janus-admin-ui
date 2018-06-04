import React, { Component } from 'react';
import ApiGroup from './components/ApiGroup';
import BindedDomainList from './components/BindedDomainList';

export default class ApiGroupDetail extends Component {
  static displayName = 'ApiGroupDetail';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="api-group-detail-page">
        <ApiGroup />
        <BindedDomainList />
      </div>
    );
  }
}
