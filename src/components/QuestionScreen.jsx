import "./QuestionScreen.css";

function QuestionScreen(props) {

  return (
    <div className="q-card">
      <div className="q-top">
        <h4>
          Question {props.current} / {props.total}
        </h4>
        <span className="timer">⏱ {props.time}</span>
      </div>

      <div className="bar">
      </div>

      <h2>{props.question}</h2>

      <div className="options">
        {props.options.map((value, index) => (
          <div key={index} className="option">
            {value}
          </div>
        ))}
      </div>

      <div className="q-buttons">
        <p className="prev">Previous</p>
        <p className="next">Next</p>
      </div>
    </div>
  );
}

export default QuestionScreen;