import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (!this.props.isLoggedIn || !this.props.token || this.props.role !== 'Teacher') {
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      this.checkAuth();
    }
    componentDidCatch(){
      this.props.history.push('/error')
    }
    componentDidUpdate() {
      this.checkAuth();
    }
    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isLoggedIn: state.isLoggedIn,
      token: state.token,
      role: state.role
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};


