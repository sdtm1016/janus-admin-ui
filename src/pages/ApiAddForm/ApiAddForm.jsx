import React, { Component } from 'react';
import AddApiForm from './components/AddApiForm';

export default class ApiAddForm extends Component {
  static displayName = 'ApiAddForm';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="api-add-form-page">
        <AddApiForm />
      </div>
    );
  }
}
