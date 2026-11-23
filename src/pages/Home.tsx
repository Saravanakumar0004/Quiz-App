import QuestionScreen from "../components/QuestionScreen";
import { useQuiz } from "../context/QuizContext";

const cardClass = "m-2.5 w-full max-w-md rounded-3xl bg-white p-8 text-gray-800";
const buttonClass = "mt-4 cursor-pointer rounded-xl bg-[#fec83a] py-3 text-center font-bold text-black";

function Quiz() {
  const { state, questions, loading, error, time, settings, select, next, prev, start, restart } = useQuiz();

  if (loading) {
    return (
      <div className={cardClass}>
        <h2 className="text-2xl font-bold">Loading…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardClass}>
        <h2 className="text-xl font-bold text-red-500">{error}</h2>
        <p className={buttonClass} onClick={() => start(settings)}>Try Again</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={cardClass}>
        <h2 className="text-2xl font-bold">No questions found</h2>
        <p className={buttonClass} onClick={restart}>Back</p>
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