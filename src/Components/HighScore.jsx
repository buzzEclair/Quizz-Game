import React from "react";

const HighScore = ({ highScore }) => {
  return (
    <>
      <div className="highScore">
        <p>{highScore} pts</p>
      </div>
    </>
  );
};

export default HighScore;
