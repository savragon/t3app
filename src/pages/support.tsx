import { FaBars, FaArrowAltCircleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

const OptionMenu = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="relative">
        <div
          className="bar absolute right-5 top-5 cursor-pointer p-5"
          onClick={handleGoBack}
        >
          <FaArrowAltCircleLeft className="text-5xl text-black" />
        </div>
      </div>
    </div>
  );
};

const SupportPage = () => {
  return (
    <>
      <div>
        <OptionMenu />
        <div className="flex h-screen flex-col items-center justify-center bg-stone-200">
          <h1 className="mb-10 text-5xl font-bold text-gray-900">Support</h1>
          <div className="w-4/5 max-w-2xl rounded-lg bg-white p-8 shadow-lg">
            <p className="flex items-center justify-center text-6xl font-medium">
              FORUMS
            </p>
          </div>
          <div>
            <div className="">
              <h1 className="flex items-center justify-center p-10 text-4xl font-medium">
                Contact
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
