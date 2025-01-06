import React from 'react';
import brain from '../assets/m.jpg';

const HeadSection = () => {
  return (
    <div
      className="h-[100vh] bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${brain})`,
      }}
    >
      <div className="p-6 ">
        <h1 className="text-4xl font-bold mb-4">Welcome to Acuvision</h1>
        <p className="text-lg">We here to Give you , your Best</p>
      </div>
    </div>
  );
};

export default HeadSection;
