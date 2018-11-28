
import React from 'react'


class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>Error</p>
      )
    }
    return this.props.children
  }
}

export default ErrorComponent