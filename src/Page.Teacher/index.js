import React, { Component } from 'react'

import NavBar from '../_userComponent/NavBar'

import apiRequest from '../_axios'
import config from '../_config'

import Slider from "react-slick"

import ImageLoader from '../_component/ImageLoader'
import Grid from '../_component/Grid'

import SignUp from '../_userComponent/SignUp'

import student from '../_images/student.png'
import teacher from '../_images/teacher.png'

let feedback = [
  {
    feedback: '“FINALLY, a site that incorporates a variety of study tools, learning styles and games to make review FUN. My social studies students love competing against one another for champion status!“',
    user: 'Soljane Martinez'
  },
  {
    feedback: '“FINALLY, a site that incorporates a variety of study tools, learning styles and games to make review FUN. My social studies students love competing against one another for champion status!“',
    user: 'Soljane Martinez'
  },
  {
    feedback: '“FINALLY, a site that incorporates a variety of study tools, learning styles and games to make review FUN. My social studies students love competing against one another for champion status!“',
    user: 'Soljane Martinez'
  },
]


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
        logo: '',
        pageDescription: '',
        pageLogo: '',
        tungkolSaProgramaDescription: '',
        tungkolSaProgramaLogo: '',
       
        email: '',
        contact: '',
        
        facebook: '',
        twitter: '',
        instagram: '',
        medium: '',
        google: '',

        learningStrand: [],
        teacher: [],
        instruction: [],

        userLength: 0,
    }
    this.toggleSignUp = this.toggleSignUp.bind(this)
  }
  toggleSignUp(){
    if(this.state.signUp){
      this.setState({
        signUp: false
      })
    }else{
      this.setState({
        signUp: true
      })
    }
  }
  componentDidMount(){
    apiRequest('get', `/landing-page/fetch-instruction?userType=${this.props.match.params.type}&instructionFor=${this.props.match.params.type}`, false, false)
      .then((res)=>{
        console.log(res)
          if(res.data){
            console.log(res.data.landingPage)
            let landingPage = res.data.landingPage
            this.setState({
              logo: landingPage.logo ? landingPage.logo : '',
              pageDescription: landingPage.pageDescription ? landingPage.pageDescription : '',
              pageLogo: landingPage.pageLogo ? landingPage.pageLogo : '',
              tungkolSaProgramaDescription: landingPage.tungkolSaProgramaDescription ? landingPage.tungkolSaProgramaDescription : '',
              tungkolSaProgramaLogo: landingPage.tungkolSaProgramaLogo ? landingPage.tungkolSaProgramaLogo : '',

              learnerDescriptionImage: landingPage.learnerDescriptionImage ? landingPage.learnerDescriptionImage : '',
              contributorDescriptionImage: landingPage.contributorDescriptionImage ? landingPage.contributorDescriptionImage : '',

              learnerDescription: landingPage.learnerDescription ? landingPage.learnerDescription : '',
              contributorDescription: landingPage.contributorDescription ? landingPage.contributorDescription : '',
             
              email: landingPage.email,
              contact: landingPage.contact,
              
              facebook: landingPage.facebook,
              twitter: landingPage.twitter,
              instagram: landingPage.instagram,
              medium: landingPage.medium,
              google: landingPage.google,
              teacher: res.data.teacher,
              instruction: res.data.instruction,
            })
           
          }
          
        
      })
      .catch((err)=>{
      
      })

    apiRequest('get', `/learning-strand/fetchAllReviewer?page=1`, false, false)
      .then((res)=>{
            if(res.data){
             this.setState({
                learningStrand: res.data.data
              })  
            }    
      })
      .catch((err)=>{
        
      })
    
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    var settingsImage = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    var settingsFeedback = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,

    };
    var settingsWays = {
      dots: true,
      infinite: this.state.learningStrand.length < 3,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,

    };

    return (
      <div className='home-container'>
        <NavBar logo={this.state.logo} />

        { this.state.signUp ? <SignUp close={this.toggleSignUp}/> : null }
 

        {/*mga boluntaryo*/}
       
      {/* //STUDENT AND TEACHER */}
       <Grid full className="home-student-teacher-main-container home-banner">
          <Grid.X>
            <Grid.Cell large={12} medium={12} small={12}>
              <Grid className='home-student-teacher-container'>
                  
                  <Grid.X>
                      <Grid.Cell large={7} medium={6} small={12}>
                        <div className="cell-container">
                        
                           <ImageLoader className="st-image" image={
                            (this.props.match.params.type === 'Student' ? this.state.learnerDescriptionImage : '') + 
                            (this.props.match.params.type === 'Teacher' ? this.state.contributorDescriptionImage : '')
                            } />               
                        </div>
                      </Grid.Cell>
                      <Grid.Cell large={5} medium={6} small={12}>
                        <div className="cell-container">
                          <h2 className="st-title">Maging 
                            <span  className=
                              {
                                (this.props.match.params.type === 'Student' ? 'st-title-student' : '') + 
                                (this.props.match.params.type === 'Teacher' ? 'st-title-teacher' : '')
                              }

                              >{
                              (this.props.match.params.type === 'Student' ? 'STUDENT' : '') + 
                              (this.props.match.params.type === 'Teacher' ? 'CONTRIBUTOR' : '')
                             }
                             </span></h2>
                          <p className="st-description">
                            
                            {
                              (this.props.match.params.type === 'Student' ? this.state.learnerDescription : '') + 
                              (this.props.match.params.type === 'Teacher' ? this.state.contributorDescription : '')
                            } 
                          </p>
                          <button className={'st-button ' + 
                            (this.props.match.params.type === 'Student' ? 'st-button-student' : '') + 
                            (this.props.match.params.type === 'Teacher' ? 'st-button-teacher' : '')
                            } onClick={this.toggleSignUp}>Magsimula</button>
                        </div>  
                      </Grid.Cell>
                  </Grid.X>
                </Grid>
              </Grid.Cell>
          </Grid.X>
        </Grid>


      <Grid full>
        <Grid.X>
          
          <Grid.Cell large={12} medium={12} small={12}>
            <div className="teacher-student-slider-container">
              <div className='subtitle-montserrat bold home-title-text text-center easy-ways'>{this.state.instruction.length} easy ways to start using Balikaral</div>
              <Slider {...settingsWays}>
                {
                  this.state.instruction.map((attr, index)=>{
                    return(
                      <div key={index}>
                        <div className='instruction-slide'>
                          <div className='instruction-title'>
                            {attr.image ? attr.image !== '' ? <img src={`${config}/${attr.image}`} className="instruction-img" /> : "" : "" }
                            <div className='title'>{index + 1}) {attr.title}</div>
                            <div className='description'>{attr.description}</div>
                          </div>

                        </div>
                      </div>
                    )
                  })
                }
              </Slider>
              {/* <Slider {...settingsImage}>
              
                 {
                  this.state.instruction.map((attr, index)=>{
                    return(
                      <div className='instruction-image-container'>
                        <ImageLoader className='instruction-image' image={attr.image} />
                      </div>
                    )
                  })
                }

              </Slider> */}
            </div>
          </Grid.Cell>
        </Grid.X>
      </Grid>

      <Grid full >
        <Grid.X className='ins'>
          <Grid.Cell large={12} medium={12} small={12} className='subtitle-montserrat more-stud-rsrc text-center bold'>
            More {this.props.match.params.type.toLowerCase()} resources
          </Grid.Cell>
          <Grid.Cell large={6} medium={12} small={12}>
            <div className='instruction-banner'>
              <i className='la la-lightbulb-o'></i>
              <div className='context-montserrat bold'>
                Need help getting started?
              </div>
              <p className='context-montserrat'>Attend a {this.props.match.params.type.toLowerCase()} webinar</p>
              <p className='context-montserrat'>Learn more about Balikaral</p>
              <p className='context-montserrat'>Visit our Help Center</p>
            </div>
          </Grid.Cell>
          <Grid.Cell large={6} medium={12} small={12}>
              <div className='instruction-banner'>
                <i className='la la-graduation-cap'></i>
                <div className='context-montserrat bold'>
                  Become a power {this.props.match.params.type.toLowerCase()}
                </div>



                <p className='context-montserrat'>Upgrade to Balikaral {this.props.match.params.type.toLowerCase()}</p>
                <p className='context-montserrat'>Get discounts for schools and groups</p>
                <p className='context-montserrat'>Join the Ambassador Program</p>
              </div>
          </Grid.Cell>
          <Grid.Cell large={12} medium={12} small={12}>
            <div className='introduce'>
              <p className='subtitle-montserrat text-center'>
                Introduce your colleagues to Balikaral with our presentation templates, handouts and videos.
              </p>
              <button className='button primary rsrc-btn'>Learn More</button>
            </div>
          </Grid.Cell>
        </Grid.X>
      </Grid>
      <div className='feedback-container'>
        <Grid>
          <Grid.X>
            <Grid.Cell large={12} medium={12} small={12}>
              <Slider {...settingsFeedback}>
                {feedback.map((attr)=>{
                  return (
                      <div className='feedback'>
                        <div className='fb subtitle-montserrat text-center bold'>{attr.feedback}</div>
                        <div className='user-fb text-center'>{attr.user}</div>
                      </div>
                    )
                  
                })}
              </Slider>

            </Grid.Cell>
          </Grid.X>

        </Grid>
      </div>

       {/* <div className='volunteer-container container'>
          <div className='subtitle-montserrat bold home-title-text'>Mga Boluntaryo</div>
          <Slider {...settings}>
            {this.state.teacher.map((attr, index)=>{
               return (
                <div key={index}>
                  <div className='volunteer-card'>
                    
                    <ImageLoader className='card-image' image={attr.personalInformation ? attr.personalInformation.image ? attr.personalInformation.image : '' : '' } type='user' />
                     <div className='card-text'>
                       <p className='card-name'>{
                                       attr.personalInformation ? 
                                       (attr.personalInformation.firstName ? attr.personalInformation.firstName : '') 
                                       + ' ' + 
                                       (attr.personalInformation.middleName ? attr.personalInformation.middleName.substring(0,1) : '')
                                       + ' ' + 
                                       (attr.personalInformation.lastName ? attr.personalInformation.lastName : '')
                                       : '' 
                                     }</p>
                       
                     </div>
                   </div>
                </div>
                )
            })}
          </Slider>

        </div> */}
         
   
          



   

      <div className='footer-container'>
        <div className='grid-container fluid'>
          <div className='grid-x'>
            <div className='large-6 medium-12'>

            <div className='footer-contact'>

              <span>
                  <p>Follow Us</p>
                  <p><a href={this.state.facebook} target='_blank'>Facebook</a></p>
                  <p><a href={this.state.twitter} target='_blank'>Twitter</a></p>
                  <p><a href={this.state.instagram} target='_blank'>Instagram</a></p>
                  <p><a href={this.state.medium} target='_blank'>Medium</a></p>
                  <p><a href={this.state.google} target='_blank'>Google</a></p>
              </span>

              <span>
                  <p>Contact Us</p>
                  <p>{this.state.email}</p>
                  <p>{this.state.contact}</p>
              </span>
              

            </div>


             
            </div>
           

            <div className='large-6 medium-12'>
                <p className='bold subtitle-montserrat'>Tungkol Sa Programa</p>
                <p className='context-montserrat description'> 
                   {this.state.tungkolSaProgramaDescription}
                </p>
                <p className='context-montserrat bold'>©2018 Balik Aral</p>

            </div>
          </div>
        </div>

      </div>





      </div>

    );
  }
}

export default Home
