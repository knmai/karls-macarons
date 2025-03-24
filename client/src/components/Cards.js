import React from 'react'
import CardItem from './CardItem'
import './Cards.css';
import img1 from '../images/cremeBruleeMacaron 1.jpg';
import img2 from '../images/cremeBruleeMacaron 2.jpg';
import img3 from '../images/cremeBruleeMacaron 3.jpg';



function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={img1}
              text='Delicate'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src={img2}
              text='Tempting'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src={img3}
              text='Exquisite delights'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src={img1}
              text='Delicate'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src={img2}
              text='Tempting'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src={img3}
              text='Exquisite delights'
              label='Adventure'
              path='/products'
            />
             
            
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;