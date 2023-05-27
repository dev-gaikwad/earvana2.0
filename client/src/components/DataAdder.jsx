import axios from 'axios';
import React, { useEffect } from 'react';

const DataAdder = () => {
  const addData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/add-product`,
        {
          // name: 'Bose QuietComfort Earbuds',
          // brand: 'Bose',
          // category: 'Audioset',
          // in_ear: true,
          // wired: false,
          // image_url:
          //   '/images/products/earphones/wireless/bose-quietcomfort-earbuds.jpg',
          // price: 24990,
          // discount: false,
          // rating: 4.6,
          // description:
          //   'Enjoy unparalleled noise cancellation and immersive sound with the Bose QuietComfort Earbuds. These true wireless earphones offer superb audio quality, comfortable fit and long battery',
        }
      );
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
