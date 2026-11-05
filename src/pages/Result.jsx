import { Link } from "react-router-dom";
import ResultScreen from "../components/ResultScreen";
import { useQuiz } from "../context/QuizContext";

function Result() {
  const { questions, score, timeTaken, restart } = useQuiz();

  return (
    <div>
      <ResultScreen
        score={score}
        total={questions.length}
        time={timeTaken}
        onRestart={restart}
      />
      <Link className="history-link" to="/history">View History</Link>
    </div>
  );
}

export default Result;