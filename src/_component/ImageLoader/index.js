import React, {Component} from 'react'

import config from '../../_config'

import DefaultUser from '../../_images/placeholder-image.png'
import Logo from '../../_images/placeholder-image.png'

class ImageLoader extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      loadingImage: true,
      errorImage: false,
      loadedImage: false,
    }
    this.handleLoad = this.handleLoad.bind(this)
    this.handleError = this.handleError.bind(this)
  }
  handleError(e){
    this.setState({
      loadingImage: false,
    })
  }
  handleLoad(e){
    this.setState({
      loadingImage: false,
    })
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
 
  }
  render() {
    let { children } = this.props
    return (

        <div 
          className={this.props.className + ' image-loader'} 
          onClick={this.props.onClick}
          style={{backgroundImage: 'url(' + 
            (this.props.image !== '' || this.props.image ? `${config}/${this.props.image}` : Logo ) + ')'}}>
          {children}


          {this.state.loadingImage ? 
            <div className='image-loader-container'>
              <div className='loader'></div>
            </div>
          : null}

          <img 
            src={ `${config}/${this.props.image}`} onLoad={this.handleLoad} onError={this.handleError} style={{height: 0,width: 0}} />
        </div>

    )
  }
}
export default ImageLoader