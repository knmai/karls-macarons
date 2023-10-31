import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import macCover from '../images/macaronArray.jpg';

function HeroSection() {
  return (
    <div className='hero-container'>
        {/* This line adds video to page */}
        <img src={macCover} alt="macaron_background" />
        <h1>Macaron awaits</h1>
        <p> whatchu waiting for</p>
        <div>
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                Get started
            </Button>
            <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                Watch trailer <i className='far fa-play-circle' />
            </Button> 
        </div>
    </div>
  );
}

export default HeroSection;