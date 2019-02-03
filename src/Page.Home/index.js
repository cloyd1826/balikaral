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

import {Link} from 'react-router-dom'

import Masonry from 'react-masonry-component';

import placeholderimg from '../_images/placeholder-image.png'
import otherImg from '../_images/vol2.jpeg'

import Reviewer from './Reviewer'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
        logo: '',
        pageDescription: '',
        pageLogo: '',
        tungkolSaProgramaDescription: '',
        tungkolSaProgramaLogo: '',
        passedExam: '',
        email: '',
        contact: '',
        
        facebook: '',
        twitter: '',
        instagram: '',
        medium: '',
        google: '',

        learningStrand: [],
        teacher: [],

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
    apiRequest('get', `/landing-page/fetch-active`, false, false)
      .then((res)=>{
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
              userLength: res.data.userLength,
              teacher: res.data.teacher,
              passedExam: res.data.passedExam
            })
           
          }
          
        
      })
      .catch((err)=>{
      
      })

    apiRequest('get', `/learning-strand/fetchAllReviewer?page=1`, false, false)
      .then((res)=>{
            console.log('ls data', res)
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
   
    return (
      <div className='home-container'>
        <NavBar logo={this.state.logo} />

        { this.state.signUp ? <SignUp close={this.toggleSignUp}/> : null }
        
        <Grid full>
          <Grid.X className='home-banner'>
            <Grid.Cell large={6} medium={12} small={12} className='home-banner-text'>
              <div>
                <p className='home-subtitle bold subtitle-montserrat'>
                    Tayo na at mag
                </p>
                <p className='home-title'>
                  <span className='blue-color'>Balik</span>&nbsp;
                  <span className='red-color'>Aral</span>
                  <span></span>
                </p>
                <p className='home-description'>
                  {this.state.pageDescription}
                </p>
                <button type='button' className='button primary home-button' onClick={this.toggleSignUp}>Magsimula</button>
              </div>
            </Grid.Cell>
            <Grid.Cell large={6} medium={12} small={12} className='home-image-container'>
              <ImageLoader className='home-image-banner' image={this.state.pageLogo} />
            </Grid.Cell>

          </Grid.X>
          <Grid.X className='home-counter'>
            <Grid.Cell large={6} medium={12} small={12}>
              <div className='counter'>
                  <span>
                    <p className='counter-number'>{this.state.passedExam}</p>
                    <p className='counter-text'>Mga Pumasa</p>
                  </span>
                </div>
            </Grid.Cell>
            <Grid.Cell large={6} medium={12} small={12}>
              <div className='counter'>
                 <span>
                  <p className='counter-number'>{this.state.userLength}</p>
                  <p className='counter-text'>Mga Gumagamit ng Programa</p>
                </span>
              </div>
            </Grid.Cell>

          </Grid.X>
        </Grid>



        {/*mga boluntaryo*/}
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
      {/* //STUDENT AND TEACHER */}
      <Grid full className="home-student-teacher-main-container">
        <Grid.X>
          <Grid.Cell large={12} medium={12} small={12}>
          <Grid className='home-student-teacher-container'>
              <Grid.X>
                  <Grid.Cell large={5} medium={6} small={12}>
                    <div className="cell-container text-right">
                      <h2 className="st-title text-right">Maging <span className="st-title-student">LEARNER</span></h2>
                      <p className="st-description text-right">
                        {this.state.learnerDescription} 
                      </p>
                       <Link to='/instruction/Student'>
                        <div className='st-link student'>Im a Student</div>
                      </Link>
                     
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={7} medium={6} small={12}>
                    <div className="cell-container">

                      <ImageLoader className="st-image" image={this.state.learnerDescriptionImage} />

                     
                    </div>
                  </Grid.Cell>
              </Grid.X>
              <Grid.X>
                  <Grid.Cell large={7} medium={6} small={12}>
                    <div className="cell-container">
                    
                       <ImageLoader className="st-image" image={this.state.contributorDescriptionImage} />               
                    </div>
                  </Grid.Cell>
                  <Grid.Cell large={5} medium={6} small={12}>
                    <div className="cell-container">
                      <h2 className="st-title">Maging <span  className="st-title-teacher">CONTRIBUTOR</span></h2>
                      <p className="st-description">
                        {this.state.contributorDescription} 
                      </p>
                      <Link to='/instruction/Teacher'>
                        <div className='st-link teacher'>Im a Contributor</div>
                      </Link>
                    </div>  
                  </Grid.Cell>
              </Grid.X>
            </Grid>
          </Grid.Cell>
        </Grid.X>
      </Grid>
      {/* //STUDENT AND TEACHER */}

      {/*about*/}

         <Grid.X className='about-container'>
            <Grid.Cell large={6} medium={12} small={12} className='about-banner-text'>

              <ImageLoader className='about-image' image={this.state.tungkolSaProgramaLogo}/>
            </Grid.Cell>
            <Grid.Cell large={6} medium={12} small={12} className='about-image-container'>
              <span>
                <p className='bold subtitle-montserrat'>Tungkol Sa Programa</p>
                <p className='context-montserrat'>
                    {this.state.tungkolSaProgramaDescription}
                </p>
                <button className='button primary' onClick={this.toggleSignUp}>Magsimula</button>
              </span>
            </Grid.Cell>

          </Grid.X>
          



      {/*about*/}
      <div className='subject-container'>
        <div className='grid-container fluid'>
          <div className='grid-x'>
            <div className='large-12'>
              <div className='subtitle-montserrat bold home-title-text text-center'>Mga Learning Strand</div>
            </div>
          </div>
          <div className='grid-x justify-center'>
          <Masonry className="learning-strand-container large-10">
            <div className="learning-strand-item">
                <p className='ls-title'>Test Name Exam / Reviewer Longer Name</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
            <div className="learning-strand-item">
                <img src={placeholderimg} className="ls-img" />
                <p className='ls-title'>Test Name Exam / Reviewer</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
            <div className="learning-strand-item">
                <img src={otherImg} className="ls-img" />
                <p className='ls-title'>Test Name Exam</p>
                <span className='ls-reviewer'><i className="la la-book"></i>38 Reviewers</span>
            </div>
          {this.state.learningStrand.map((attr, index)=>{
            return (
                <div key={index} className="learning-strand-item">
                    <p className='ls-title'>{attr.name}</p>
                    <span className='ls-reviewer'><i className="la la-book"></i>{attr.reviewer.length} Reviewers</span>
                </div>
              )
            })}
            </Masonry>
          </div>
        </div>
      </div>

      <Reviewer />

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
