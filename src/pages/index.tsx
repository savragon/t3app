import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { PrismaClient, Question } from "@prisma/client";

const OptionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="relative">
        <div
          className="bar absolute right-5 top-5 cursor-pointer p-5"
          onClick={toggleMenu}
        >
          <FaBars className="text-5xl text-white" />
        </div>

        {isOpen && (
          <div className="option-menu fixed flex h-full w-full flex-col items-center justify-center bg-stone-100 p-4">
            <div
              className="bar absolute right-5 top-5 cursor-pointer p-5"
              onClick={toggleMenu}
            >
              <FaTimes className="text-5xl text-gray-700" />
            </div>

            <p className="flex items-center justify-center p-10 text-5xl font-medium text-gray-700 duration-200 hover:text-gray-500">
              Support
            </p>
            <p className="flex items-center justify-center p-10 text-5xl font-medium text-gray-700 duration-200 hover:text-gray-500">
              Create a question
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<1 | 2 | null>(null);
  const [percentage1, setPercentage1] = useState<number | null>(null);
  const [percentage2, setPercentage2] = useState<number | null>(null);

  const handleOptionClick = async (option: 1 | 2) => {
    // get the info for the current question specificly the ID

    const id = questions[currentQuestion]?.id;

    // call the API api/choice with the ID and option selected

    const res = await fetch("api/createAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: id,
        option: option,
      }),
    });

    setCurrentQuestion(
      (previousQuestion) => (previousQuestion + 1) % questions.length
    );
  };

  const getQuestions = async () => {
    const res = await fetch("api/getQuestions");
    const json = await res.json();
    console.log(json);
    setQuestions(json);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <OptionMenu />
        {questions.length < 1 ? (
          <div>Loading</div>
        ) : (
          <div className="grid grid-cols-2">
            <div
              className={`flex h-screen cursor-pointer items-center justify-center bg-stone-100 p-10 text-center text-3xl font-medium duration-300 ${
                selectedOption === 1 ? "text-gray-400" : "text-gray-900"
              }`}
              onClick={() => handleOptionClick(1)}
            >
              <p>{questions[currentQuestion]?.option1}</p>
              {selectedOption === 1 && <p>{percentage1}%</p>}
            </div>
            <div
              className={`flex h-screen cursor-pointer items-center justify-center bg-gray-900 p-10 text-center text-3xl font-medium duration-300 ${
                selectedOption === 2 ? "text-gray-500" : "text-stone-100"
              }`}
              onClick={() => handleOptionClick(2)}
            >
              <p>{questions[currentQuestion]?.option2}</p>
              {selectedOption === 2 && <p>{percentage2}%</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
