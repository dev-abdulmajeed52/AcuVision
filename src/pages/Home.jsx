import React from 'react';
import Navbar from '../ui/Navbar';
import Hero from '../ui/Hero';
import Footer from '../ui/Footer';
import Faq from '../ui/Faq';
import CallToAction from '../ui/CallToAction';
import HowItWorks from '../ui/HowItWorks';
import PrepTips from '../ui/PrepTips';
import SuccessStories from '../ui/SuccessStories';
import WhyChooseAI from '../ui/WhyChooseAI';
import Mission from '../ui/Mission';

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="home" className='mt-16'><Hero /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="prep"><PrepTips /></div>
      <div id="mission"><Mission /></div>
      <div id="why-choose-ai"><WhyChooseAI /></div>
      <div id="mock"><CallToAction /></div>
      <div id="faq"><Faq /></div>
      <Footer />
    </>
  );
}

export default Home;
