import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Answers from "../Components/Answers";
import Cats from "../Components/Cats";
import HighScore from "../Components/HighScore";

const Home = () => {
  const id = useRef(null);
  const [catValue, setCatValue] = useState("9");
  const [diff, setDiff] = useState("easy");
  const [lvl, setLvl] = useState(1);
  const [questionCount, setQuestionCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [btnStyle, setBtnSTyle] = useState({});
  const [overlayStyle, setOverlayStyle] = useState({});
  const [btnPlayStyle, setBtnPlayStyle] = useState({});
  const [styleBtnPlayText, setStyleBtnPlayText] = useState({});
  const [progressBarStyle, setProgressBarStyle] = useState({ width: "0%" });
  const [progressBar, setProgressBar] = useState(0);
  const [questions, setQuetions] = useState([
    {
      category: "R2VvZ3JhcGh5",
      type: "bXVsdGlwbGU=",
      difficulty: "bWVkaXVt",
      question:
        "V2hhdCBFdXJvcGVhbiBjb3VudHJ5IGlzIG5vdCBhIHBhcnQgb2YgdGhlIEVVPw==",
      correct_answer: "Tm9yd2F5",
      incorrect_answers: ["TGl0aHVhbmlh", "SXJlbGFuZA==", "Q3plY2hpYQ=="]
    }
  ]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [answered, setAnswered] = useState(false);

  const handleCat = (cat, name) => {
    setCatValue(cat);
    setSelectedCat(name);
  };

  const handleStart = () => {
    setPoints(0);
    setQuestionCount(0);
    setLvl(1);
    FetchData(diff, catValue);
  };

  const handleBtnPlay = () => {
    setBtnPlayStyle({ animation: "btnPlayAnim 2s linear" });
    setStyleBtnPlayText({ display: "none" });
    setTimeout(() => {
      setOverlayStyle({ background: "#2d56d2" });
    }, 1000);
    setTimeout(() => {
      setProgressBar(0);
      setProgressBarStyle({ width: "0%", transition: "none" });
      setOverlayStyle({ display: "none" });
    }, 2000);
  };

  const FetchData = async (difficulty, catValue) => {
    try {
      await axios
        .get(
          "https://opentdb.com/api.php?amount=10&difficulty=" +
            difficulty +
            "&category=" +
            catValue +
            "&encode=base64"
        )
        .then((response) => setQuetions(response.data.results));
    } catch (error) {}
  };

  const timerZero = () => {
    setQuestionCount(questionCount + 1);
    setProgressBar(0);
    setProgressBarStyle({ width: "0%", transition: "none" });
  };

  const handleAnswer = (answer) => {
    if (highScore < points) {
      setHighScore(points);
    }
    if (atob(questions[questionCount].correct_answer) === answer) {
      setProgressBar(0);
      setTimeout(() => {
        setProgressBarStyle({ width: "0%", transition: "none" });
        setPoints(points + 1);
      }, 2000);
    } else {
      setProgressBar(0);
      setTimeout(() => {
        setProgressBarStyle({ width: "0%", transition: "none" });
      }, 2000);
    }
    if (questionCount === 9) {
      setBtnSTyle({ pointerEvents: "none" });
      if (lvl === 1) {
        if (points >= 6) {
          setDiff("medium");
          FetchData("medium", catValue);
          setQuestionCount(0);
          setLvl(lvl + 1);
          setBtnSTyle({ pointerEvents: "auto" });
        } else {
          setBtnSTyle({ pointerEvents: "auto" });
          setOverlayStyle({ display: "block" });
          setBtnPlayStyle({ animation: "none" });
          setStyleBtnPlayText({ display: "block" });
        }
      } else if (lvl === 2) {
        if (points >= 12) {
          setDiff("hard");
          FetchData("hard", catValue);
          setQuestionCount(0);
          setLvl(lvl + 1);
          setBtnSTyle({ pointerEvents: "auto" });
        } else {
          setBtnSTyle({ pointerEvents: "auto" });
          setOverlayStyle({ display: "block" });
        }
      } else if (lvl === 3) {
        setBtnSTyle({ pointerEvents: "auto" });
        setOverlayStyle({ display: "block" });
      }
    } else {
      setAnswered(true);
      setTimeout(() => {
        setAnswered(false);
        setQuestionCount(questionCount + 1);
      }, 2000);
    }
  };

  const clear = () => {
    window.clearInterval(id.current);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      const calc = progressBar;
      setProgressBar((prc) => prc + 10);
      setProgressBarStyle({ width: calc + "%", transition: "0.5s" });
    }, 1000);
    return () => clear();
  }, [progressBar]);

  useEffect(() => {
    if (progressBar >= 103) {
      clear();
    }
  }, [progressBar]);

  useEffect(() => {
    FetchData(diff, catValue);
  }, [diff, catValue]);

  return (
    <>
      <div className="content">
        <div className="overlay-start" style={overlayStyle}>
          <h1>Quick Play</h1>
          <p>{selectedCat}</p>
          <HighScore highScore={highScore} />
          <Cats handleCat={handleCat} />
          <button
            className="play"
            style={btnPlayStyle}
            onClick={() => {
              handleStart();
              handleBtnPlay();
            }}
          >
            <span style={styleBtnPlayText}>Play Now</span>
          </button>
        </div>
        <div className="content-timer">
          <div className="bar-under">
            <div className="bar-upper" style={progressBarStyle}></div>
          </div>
        </div>

        <h1 className="question">{atob(questions[questionCount].question)}</h1>

        {progressBar === 110 || answered === true ? (
          <>
            <div className="time-out">
              <p>
                The correct answers was <br />
                <span>{atob(questions[questionCount].correct_answer)}</span>.
              </p>
              {answered === false && (
                <button onClick={timerZero}>Next Question</button>
              )}
            </div>
          </>
        ) : (
          <>
            <Answers
              btnStyle={btnStyle}
              questions={questions[questionCount]}
              handleAnswer={handleAnswer}
            />
          </>
        )}
        <p className="question-count"> {questionCount + 1} / 10 </p>
      </div>
    </>
  );
};

export default Home;
