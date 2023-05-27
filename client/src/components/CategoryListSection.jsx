import React from 'react';
import CategoryCard from './layout/CategoryCard';
import '../css/CategoryListSection.css';
import {
  WiredEarphonesIcon,
  WiredHeadphonesIcon,
  WirelessEarphonesIcon,
  WirelessHeadphonesIcon,
  AmplifierIcon,
  CablesIcon,
  ArrowRightBtn,
} from '../utils/svg/SVGIcons';

const CategoryListSection = () => {
  return (
    <>
      <section>
        <h2 className='section-heading'>
          Choose from our extensive list of categories
        </h2>
        <div className='category-list-section'>
          <CategoryCard
            SVGIcon={WiredEarphonesIcon}
            description='In-Ear Wired Earphones'
            categories={['in_ear', 'wired']}
          />
          <CategoryCard
            SVGIcon={WiredHeadphonesIcon}
            description='Over-the-Ear Wired Headphones'
            categories={['over_ear', 'wired']}
          />
          <CategoryCard
            SVGIcon={WirelessEarphonesIcon}
            description='In-Ear Wireless Earphones'
            categories={['in_ear', 'wireless']}
          />
          <CategoryCard
            SVGIcon={WirelessHeadphonesIcon}
            description='Over-the-Ear Wireless Headphones'
            categories={['over_ear', 'wireless']}
          />
          <CategoryCard
            SVGIcon={AmplifierIcon}
            description='Amplifiers & DACs'
            categories={['tools']}
          />
          <CategoryCard
            SVGIcon={CablesIcon}
            description='Cables'
            categories={['cables']}
          />
          <CategoryCard SVGIcon={ArrowRightBtn} description='Browse All' />
        </div>
      </section>
    </>
  );
};

export default CategoryListSection;
