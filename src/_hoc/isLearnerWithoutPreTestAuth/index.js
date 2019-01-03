import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {
  class MixedComponent extends Component {

    checkAuth() {
      console.log(this.props.hadPreTest)
      if (!this.props.isLoggedIn || !this.props.token || this.props.role !== 'Learner' || this.props.hadPreTest ) {
        this.props.history.push('/');
      }
    }
    componentDidMount() {
      this.checkAuth();
    }
    componentWillRecieveProps(nextProps){
      this.checkAuth()
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
      role: state.role,
      hadPreTest: state.hadPreTest
    }
  }

  return connect(mapStateToProps)(MixedComponent);
};


