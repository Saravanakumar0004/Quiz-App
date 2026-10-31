import "./ResultScreen.css";

function ResultScreen() {
  return (
    <div className="r-card">
      <div className="circle">
        <div className="circle-inner">
          <h1>7/10</h1>
          <p>70%</p>
        </div>
      </div>

      <h2>Great job! 🎉</h2>
      <p className="msg">You know your React basics well.</p>

      <div className="stats">
        <div>
          <h3 className="green">7</h3>
          <p>Correct</p>
        </div>
        <div>
          <h3 className="red">3</h3>
          <p>Wrong</p>
        </div>
        <div>
          <h3 className="black">06:12</h3>
          <p>Time</p>
        </div>
      </div>

      <p className="restart">Restart Quiz</p>
    </div>
  );
}

export default ResultScreen;