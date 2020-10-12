import React, { useState, useEffect } from "react";
import "../Scss/Answers.scss";

const Answers = ({ questions, btnStyle, handleAnswer }) => {
  const [multiple, setMultiple] = useState([]);

  const mixAnswers = (data) => {
    data.incorrect_answers.push(data.correct_answer);
    for (let i = data.incorrect_answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data.incorrect_answers[i], data.incorrect_answers[j]] = [
        data.incorrect_answers[j],
        data.incorrect_answers[i]
      ];
    }
    setMultiple(data.incorrect_answers);
  };
  useEffect(() => {
    mixAnswers(questions);
  }, [questions]);

  return (
    <>
      <div className="choices">
        {atob(questions.type) === "multiple" ? (
          <>
            {multiple.map((item, index) => (
              <button
                key={index}
                style={btnStyle}
                onClick={() => handleAnswer(atob(item))}
              >
                {atob(item)}{" "}
              </button>
            ))}
          </>
        ) : (
          <>
            <button style={btnStyle} onClick={() => handleAnswer("True")}>
              Yes
            </button>
            <button style={btnStyle} onClick={() => handleAnswer("False")}>
              No
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Answers;
