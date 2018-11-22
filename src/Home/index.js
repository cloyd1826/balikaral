import React, { Component } from 'react'

import Banner from './Images/banner.png'
import Logo from './Images/logo.png'

import One from './Images/vol1.jpeg'
import Two from './Images/vol2.jpeg'
import Three from './Images/vol3.jpeg'

import Nav from '../Nav'

let subjects = [
    {
      subject: 'Filipino',
      reviewer: '3'
    },
    {
      subject: 'English',
      reviewer: '3'
    },
    {
      subject: 'Math',
      reviewer: '3'
    },
    {
      subject: 'Science',
      reviewer: '3'
    },
    {
      subject: 'MAPEH',
      reviewer: '3'
    },
    {
      subject: 'Sining',
      reviewer: '3'
    },
    {
      subject: 'Araling Panlipunan',
      reviewer: '3'
    },
    {
      subject: 'Economics',
      reviewer: '3'
    },
    {
      subject: 'T.L.E',
      reviewer: '3'
    },
]


class Home extends Component {
  render() {
    return (
      <div  className='home-container'>
        <Nav />

        {/* banner */}
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
              Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut 
              labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut 
              aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit 
              in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur.
            </p>
            <button type='button' className='button primary'>Magsimula</button>
          
          </div>
          <div className='home-image-banner'>
            <img alt='banner' src={Banner} />
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
                  <p className='counter-number'>3543</p>
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


          <div className='volunteer-slide'>

            <div className='volunteer-card'>
              <div className='card-image' style={{backgroundImage:'url('+ Two +')'}}></div>
              <div className='card-text'>
                <p className='card-name'>John Doe</p>
                
              </div>
            </div>

            <div className='volunteer-card'>
              <div className='card-image' style={{backgroundImage:'url('+ One +')'}}></div>
              <div className='card-text'>
                <p className='card-name'>John Doe</p>
                
              </div>
            </div>

            <div className='volunteer-card'>
              <div className='card-image' style={{backgroundImage:'url('+ Three +')'}}></div>
              <div className='card-text'>
                <p className='card-name'>John Doe</p>
                
              </div>
            </div>

            <div className='volunteer-card'>
              <div className='card-image' style={{backgroundImage:'url('+ One +')'}}></div>
              <div className='card-text'>
                <p className='card-name'>John Doe</p>
                
              </div>
            </div>

          </div>
        </div>


      {/*about*/}
        <div className='about-container'>
          <div className='grid-container fluid'>
            <div className='grid-x'>
              <div className='cell large-6 medium-12'>
                <div className='about-image'>
                  <img src={Logo} alt='tungkol sa programa' />
                </div>
              </div>
              <div className='cell large-6 medium-12'>
                <p className='bold subtitle-montserrat'>Tungkol Sa Programa</p>
                <p className='context-montserrat'>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur.
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
          {subjects.map((attr, index)=>{
            return (
                <div className='large-4 medium-6 small-12' key={index}>
                  <div className='subject-card'>
                    <div className='subject'>
                      <span className='sub'>{attr.subject}</span>
                      <span className='reviewer'>{attr.reviewer} Reviewers</span>
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
                  <p>Facebook</p>
                  <p>Twitter</p>
                  <p>Instagram</p>
                  <p>Medium</p>
                  <p>Google</p>
              </span>

              <span>
                  <p>Contact Us</p>
                  <p>info@balikaral.com</p>
                  <p>+63 936 777 238  </p>
              </span>
              

            </div>


             
            </div>
           

            <div className='large-6 medium-12'>
                <p className='bold subtitle-montserrat'>Tungkol Sa Programa</p>
                <p className='context-montserrat'>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit 
                    in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur.
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
