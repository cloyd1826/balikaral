import React, {Component} from 'react'

import config from '../../_config'

import DefaultUser from '../../_images/placeholder-image.png'
import Logo from '../../_images/placeholder-image.png'

class ImageLoader extends Component {
  constructor(props) {
    super(props)
    this.state = { 

    }
  }
  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
 
  }
  render() {
    let { children } = this.props
    return (

        <div 
          className={this.props.className} 
          onClick={this.props.onClick}
          style={{backgroundImage: 'url(' + 
            (this.props.image !== '' || this.props.image ? `${config}/${this.props.image}` : 
               
                ( this.props.type==='user' ? DefaultUser : Logo )
              
            )
          + ')'}}>
          {children}

        </div>

    )
  }
}
export default ImageLoader