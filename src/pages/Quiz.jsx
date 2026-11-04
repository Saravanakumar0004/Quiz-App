
import { Navigate } from "react-router-dom";
import QuestionScreen from "../components/QuestionScreen";

function Quiz(props) {


  if (props.loading === false &&
      props.questions.length === 0 &&
      !props.error) {
    return (
      <div className="card">
        <h2>No questions found</h2>

        <button
          className="start-btn"
          onClick={props.onRestart}
        >
          Back to Home
        </button>
      </div>
    );
  }


  if (props.loading) {
    return (
      <div className="card">
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="card">
        <h2 className="error">{props.error}</h2>

        <button
          className="start-btn"
          onClick={props.onStart}
        >
          Try Again
        </button>
      </div>
    );
  }


  const question = props.questions[props.current];

  if (!question) {
    return <Navigate to="/" replace />;
  }

  return (
    <QuestionScreen
      current={props.current + 1}
      total={props.questions.length}
      time={props.time}
      question={question.question}
      options={question.options}
      selected={props.answers[question.id]}
      correct={question.answer}
      onSelect={props.onSelect}
      onNext={props.onNext}
      onPrev={props.onPrev}
    />
  );
}

export default Quiz;
