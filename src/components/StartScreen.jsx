import "./StartScreen.css";

function StartScreen(props) {
  const rules = [
    "Each question has 4 options",
    "Only one answer is correct",
    "You can go back to previous questions",
    "Score is shown at the end",
  ];

  return (
    <div className="card">
      <h2>React Basics Quiz</h2>
      <p>Test what you know about React.</p>

      <div className="quiz-info">
        <p className="bb">10 questions</p>
        <p className="b2">10 minutes</p>
      </div>

      <ul>
        {rules.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>

      <p className="start-btn"  onClick={props.onStart}>Start Quiz</p>
    </div>
  );
}

export default StartScreen;