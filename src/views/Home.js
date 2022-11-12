import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesSplit from '../components/sections/FeaturesSplit';


const Home = () => {
  localStorage.clear();

  return (
    <>
      <Hero className="illustration-section-01" />

      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
     
    </>
  );
}

export default Home;