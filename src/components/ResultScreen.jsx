import "./ResultScreen.css";

function ResultScreen(props) {
  const percent = Math.round((props.score / props.total) * 100);
  const wrong = props.total - props.score;

  let title = "Keep practicing!";
  let subtitle = "Better luck next time"
  if (percent >= 70) {
    title = "Great job! 🎉";
    subtitle = "You know your react basics well."
  } else if (percent >= 40) {
    title = "Good effort!";
    subtitle = "Keep it up"
  } 

  return (
    <div className="r-card">
      <div
        className="circle"
        style={{ background: `conic-gradient(#6c5ce7 ${percent}%, #e5e1f7 0)` }}
      >
        <div className="circle-inner">
          <h1>{props.score}/{props.total}</h1>
          <p>{percent}%</p>
        </div>
      </div>

      <h2>{title}</h2>
      <p>{subtitle}</p>

      <div className="stats">
        <div>
          <h3 className="green">{props.score}</h3>
          <p>Correct</p>
        </div>
        <div>
          <h3 className="red">{wrong}</h3>
          <p>Wrong</p>
        </div>
        <div>
          <h3 className="black">{props.time}</h3>
          <p>Time</p>
        </div>
      </div>

      <p className="restart" onClick={props.onRestart}>Restart Quiz</p>
    </div>
  );
}

export default ResultScreen;
