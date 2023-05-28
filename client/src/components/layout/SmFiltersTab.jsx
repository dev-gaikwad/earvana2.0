import React from 'react';
import '../../css/SmFiltersTab.css';
import FiltersSidebar from './FiltersSidebar';
import { CloseButtonIcon } from '../../utils/svg/SVGIcons';

const SmFiltersTab = ({ setShowSmallScreenFilterTab }) => {
  return (
    <div className='sm-filter-tab-container'>
      <div className='sm-filter-tab-header'>
        <div
          className='filter-tab-close-button'
          onClick={() => setShowSmallScreenFilterTab(false)}
        >
          <CloseButtonIcon height='24px' width='24px' fill='#000000' />
        </div>
      </div>
      <FiltersSidebar />
    </div>
  );
};

export default SmFiltersTab;
