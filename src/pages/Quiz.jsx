import QuestionScreen from "../components/QuestionScreen";
import { useQuiz } from "../context/QuizContext";

function Quiz() {
  const { state, questions, loading, error, time, select, next, prev, start, restart } = useQuiz();

  if (loading) {
    return (
      <div className="card">
        <h2>Loading…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="error">{error}</h2>
        <p className="start-btn" onClick={start}>Try Again</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card">
        <h2>No questions found</h2>
        <p className="start-btn" onClick={restart}>Back</p>
      </div>
    );
  }

  const question = questions[state.current];

  return (
    <QuestionScreen
      current={state.current + 1}
      total={questions.length}
      time={time}
      question={question.question}
      options={question.options}
      selected={state.answers[question.id]}
      correct={question.answer}
      onSelect={select}
      onNext={next}
      onPrev={prev}
    />
  );
}

export default Quiz;