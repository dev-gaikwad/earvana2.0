import React from 'react';
import '../css/Footer.css';

import {
  GithubIcon,
  LinkedInIcon,
  WebsiteURLIcon,
} from '../utils/svg/SVGIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className='footer-container'>
        <div className='socials-section'>
          <WebsiteURLIcon
            height='30px'
            width='30px'
            fill='var(--x-light-secondary-color)'
          />
          <GithubIcon
            height='30px'
            width='30px'
            fill='var(--x-light-secondary-color)'
          />
          <LinkedInIcon
            height='30px'
            width='30px'
            fill='var(--x-light-secondary-color)'
          />
        </div>
        <div className='copyrights-section'>
          <p>&copy; {currentYear} Earvana.</p>
          <p>
            This is a personal project inspired from multiple sources. Feel free
            to copy whatever you like. The code is open source.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
