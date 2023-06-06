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
          <FaArrowAltCircleLeft className="text-5xl text-white" />
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
        <div className="flex h-screen flex-col bg-gray-800">
          <div className="mt-36">
            <h1 className="flex items-center justify-center p-10 text-4xl font-medium text-white">
              Contact
            </h1>
            <div className="mx-96 rounded-md bg-white shadow-lg">
              <h1 className="p-2 text-gray-500">Email</h1>
            </div>
            <div className="mx-96 mt-5 rounded-md bg-white shadow-lg">
              <h1 className="p-2 text-gray-500">Reason for contact</h1>
            </div>
            <div className="mx-96 mt-5 h-48 rounded-md bg-white shadow-lg">
              <h1 className="p-2 text-gray-500">Explain</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
