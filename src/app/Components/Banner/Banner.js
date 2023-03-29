import React from 'react';
import './Banner.css';
//import { Carousel } from 'react-responsive-carousel';
import team from '../../Assets/team2.jpg';
const Banner = () => {
    return (
        <div>
           <img src={team} alt="team"/>
         </div>
    );
}

export default Banner;
