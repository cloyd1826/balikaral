import React, { Component } from 'react'

import YouTube from 'react-youtube'

class Test extends Component{
  constructor(props){
    super(props)
    this.state = {
        endTime: 0,
        hours: 0,
        minutes: 0,
        seconds: 0

    }
    this.timer = this.timer.bind(this)
  }
  componentDidMount(){
   
    let endTime = 1 * 60
    let hours = Math.floor(((endTime * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor(((endTime * 1000) % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor(((endTime * 1000) % (1000 * 60)) / 1000);
    this.setState({
        endTime: endTime,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    })

    this.timerID = setInterval(
      () => this.timer(),
      1000
    );

  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  timer(){
    let endTime = this.state.endTime
    endTime = endTime - 1
    let hours = Math.floor(((endTime * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor(((endTime * 1000) % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor(((endTime * 1000) % (1000 * 60)) / 1000);
    console.log(hours + ' ' + minutes + ' ' + seconds)
    this.setState({
        endTime: endTime,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    })
    if(this.state.endTime === 0){
        clearInterval(this.timerID);
        console.log('end')
        this.setState({
            endTime: 'end'
        })
    }
  }
  render() {
    return (
      <div>
      	 {this.state.endTime}
         <br />
         {this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds}
         <YouTube
            videoId='sstGezJYsf0'                  
                                  
            className='youtube-player'                
            containerClassName='youtube-player-container'       
             
          />
      </div>
    );
  }
}

export default Test
// onReady={func}                    
// onPlay={func}                     
// onPause={func}                    
// onEnd={func}                      
// onError={func}                    
// onStateChange={func}              
// onPlaybackRateChange={func}       
// onPlaybackQualityChange={func} 
// opts={} 