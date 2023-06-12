// This is a temporary page to add new products to the database

import axios from 'axios';
import React, { useEffect } from 'react';

const DataAdder = () => {
  const addData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/add-product`
        // {
        //   name: 'iFi Audio Pro Link',
        //   brand: 'iFi',
        //   category: 'Tools',
        //   in_ear: false,
        //   wired: true,
        //   image_url: '/images/products/tools/ifi-audio-pro-link.jpg',
        //   price: 8999,
        //   discount: false,
        //   rating: 4.2,
        //   description:
        //     'Experience top-notch audio performance with the iFi Audio Pro Link DAC and Amp. This high-quality device enhances the audio quality of your music system, bringing out the finest details and delivering a truly immersive listening experience.',
        // }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addData();
  }, []);
  return <div>DataAdder</div>;
};

export default DataAdder;
