import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      if (!this.props.isLoggedIn && !this.props.token) {
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      this.checkAuth();
      console.log(this.props)
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
      token: state.token
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};


