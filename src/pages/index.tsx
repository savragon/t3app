import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { PrismaClient, Question } from "@prisma/client";
import { fetchData } from "next-auth/client/_utils";

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
              <FaTimes className="text-6xl text-gray-700" />
            </div>

            <a href="support">
              <p className=" text-5xl font-medium text-gray-700 duration-300 hover:text-gray-500">
                Contact
              </p>
            </a>
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
    // Get the info for the current question, specifically the ID

    if (percentage1 !== null && percentage2 !== null) {
      setPercentage1(null);
      setPercentage2(null);
      setCurrentQuestion(
        (previousQuestion) => (previousQuestion + 1) % questions.length
      );
    } else {
      const id = questions[currentQuestion]?.id;
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

      const res2 = await fetch("api/getPercentage?id=" + id);
      const json2 = await res2.json();
      setPercentage1(json2.percentage);
      setPercentage2(json2.percentage2);
    }

    // Move to the next question
  };

  const getQuestions = async () => {
    const res = await fetch("api/getQuestions");
    const json = await res.json();
    setQuestions(json);
  };

  // ...

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
              className={`flex h-screen cursor-pointer flex-col items-center justify-center bg-stone-100 p-10 text-center text-3xl font-medium duration-300 ${
                selectedOption === 1 ? "text-gray-400" : "text-gray-900"
              }`}
              onClick={() => handleOptionClick(1)}
            >
              {percentage1 ? (
                <p>{percentage1}%</p>
              ) : (
                <p>{questions[currentQuestion]?.option1}</p>
              )}
            </div>
            <div
              className={`flex h-screen cursor-pointer flex-col items-center justify-center bg-gray-900 p-10 text-center text-3xl font-medium duration-300 ${
                selectedOption === 2 ? "text-gray-400" : "text-stone-100"
              }`}
              onClick={() => handleOptionClick(2)}
            >
              {percentage2 ? (
                <p>{percentage2}%</p>
              ) : (
                <p>{questions[currentQuestion]?.option2}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
