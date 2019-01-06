import React, { Component } from 'react'

import Banner from '../_images/banner.png'
import Logo from '../_images/logo.png'

import One from '../_images/vol1.jpeg'
import Two from '../_images/vol2.jpeg'
import Three from '../_images/vol3.jpeg'

import NavBar from '../_userComponent/NavBar'

import apiRequest from '../_axios'
import config from '../_config'

import Slider from "react-slick"

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

        userLength: 0,
    }
  }
  componentDidMount(){
    apiRequest('get', `/landing-page/fetch-active`, false, false)
      .then((res)=>{
          if(res.data){
      
            let landingPage = res.data.landingPage
            this.setState({
              logo: landingPage.logo,
              pageDescription: landingPage.pageDescription,
              pageLogo: landingPage.pageLogo,
              tungkolSaProgramaDescription: landingPage.tungkolSaProgramaDescription,
              tungkolSaProgramaLogo: landingPage.tungkolSaProgramaLogo,
             
              email: landingPage.email,
              contact: landingPage.contact,
              
              facebook: landingPage.facebook,
              twitter: landingPage.twitter,
              instagram: landingPage.instagram,
              medium: landingPage.medium,
              google: landingPage.google,
              userLength: res.data.userLength,
              teacher: res.data.teacher,
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
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    return (
      <div  className='home-container'>
        <NavBar logo={`${config}/${this.state.logo}`} />

        <div className='home-banner'>
          <div className='home-banner-text'>
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
            <button type='button' className='button primary'>Magsimula</button>
          
          </div>
          <div className='home-image-banner' style={{backgroundImage: 'url(' + `${config}/${this.state.pageLogo}` + ')'}}>
          </div>
        </div>


        {/* counter */}
        <div className='home-counter'>
          <div className='grid-container'>
            <div className='grid-x'>
              <div className='large-6 medium-12-12'>
                <div className='counter'>
                  <span>
                    <p className='counter-number'>4728</p>
                    <p className='counter-text'>Mga Pumasa</p>
                  </span>
                </div>
              </div>
              <div className='large-6 medium-12-12'>
                <div className='counter'>
                 <span>
                  <p className='counter-number'>{this.state.userLength}</p>
                  <p className='counter-text'>Mga Gumagamit ng Programa</p>
                </span>
              </div>
              </div>

            </div>

          </div>
        </div>


        {/*mga boluntaryo*/}
        <div className='volunteer-container container'>
          <div className='subtitle-montserrat bold home-title-text'>Mga Boluntaryo</div>
          <Slider {...settings}>



            {this.state.teacher.map((attr, index)=>{
               return (
                <div key={index}>
                  <div className='volunteer-card'>
                    <div className='card-image' style={{backgroundImage:'url('+ ( attr.personalInformation ? attr.personalInformation.image ? `${config}/${attr.personalInformation.image}` : Two : Two ) + ')'}}></div>
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

        </div>


      {/*about*/}
        <div className='about-container'>
          <div className='grid-container fluid'>
            <div className='grid-x'>
              <div className='cell large-6 medium-12'>
                <div className='about-image' style={{backgroundImage: 'url(' + `${config}/${this.state.tungkolSaProgramaLogo}` + ')'}}>
                </div>
              </div>
              <div className='cell large-6 medium-12'>
                <p className='bold subtitle-montserrat'>Tungkol Sa Programa</p>
                <p className='context-montserrat'>
                    {this.state.tungkolSaProgramaDescription}
                </p>
                <button className='button primary'>Magsimula</button>
              </div>
            </div>
          </div>
        </div>



      {/*about*/}
      <div className='subject-container'>
        <div className='grid-container fluid'>
          <div className='grid-x'>
            <div className='large-12'>
              <div className='subtitle-montserrat bold home-title-text'>Mga Takda</div>
            </div>
          </div>
          <div className='grid-x'>
          {this.state.learningStrand.map((attr, index)=>{
            return (
                <div className='large-4 medium-6 small-12' key={index}>
                  <div className='subject-card'>
                    <div className='subject'>
                      <span className='sub'>{attr.name}</span>
                      <span className='reviewer'>{attr.reviewer.length} Reviewers</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>


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
                <p className='context-montserrat'>
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
