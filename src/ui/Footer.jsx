import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="block">
      {/* Container */}
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Component */}
        <div className="sm:flex-row flex justify-between flex-col">
            <img src='/svg/logo.svg' alt='Logo' className="w-20 h-20"/>
          <div className="mt-8 md:mt-0">
            <div className="mb-4 flex max-w-72 items-start justify-start">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bb99e6cf78_MapPin.svg"
                alt=""
                className="inline-block mr-3"
              />
              <p className="text-gray-500 text-sm sm:text-base">
                 SHARAH FAISAL Rd. KARACHI, PK
              </p>
            </div>
            <div className="mb-4 flex max-w-72 items-start justify-start">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944119e6cf76_EnvelopeSimple-2.svg"
                alt=""
                className="inline-block mr-3"
              />
              <p className="text-gray-500 text-sm sm:text-base">
                support@acuvision.co
              </p>
            </div>
          </div>
        </div>
        <div className="mb-14 w-full border-b border-black mt-16"></div>
        <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
          <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
            <a
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-[#6366f1] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              About
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-[#6366f1] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Features
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-[#6366f1] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Works
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-[#6366f1] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Support
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-[#6366f1] sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Help
            </a>
          </div>
          <p className="text-gray-500 text-sm sm:text-base">
            © Copyright 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer