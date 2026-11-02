import "./QuestionScreen.css";

function QuestionScreen(props) {
  const percent = (props.current / props.total) * 100;

  function getClass(option) {
    if (!props.selected) return "option";
    if (option === props.correct) return "option correct";
    if (option === props.selected) return "option wrong";
    return "option";
  }

  return (
    <div className="q-card">
      <div className="q-top">
        <h4>
          Question {props.current} / {props.total}
        </h4>
        <span className="timer">⏱ {props.time}</span>
      </div>

      <div className="bar">
        <div className="bar-fill" style={{ width: percent + "%" }}></div>
      </div>

      <h2>{props.question}</h2>

      <div className="options">
        {props.options.map((option) => (
          <div
            key={option.id}
            className={getClass(option)}
            onClick={() => props.onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="q-buttons">
        <p
          className={props.current === 1 ? "prev disabled" : "prev"}
          onClick={props.onPrev}
        >
          Previous
        </p>
        <p className="next" onClick={props.onNext}>
          {props.current === props.total ? "Finish" : "Next"}
        </p>
      </div>
    </div>
  );
}

export default QuestionScreen;
