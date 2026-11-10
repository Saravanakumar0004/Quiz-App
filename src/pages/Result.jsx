import { Link } from "react-router-dom";
import ResultScreen from "../components/ResultScreen";
import { useQuiz } from "../context/QuizContext";
import { getCategoryName } from "../categories";

function Result() {
  const { questions, score, timeTaken, settings, restart } = useQuiz();

  return (
    <div>
      <div className="m-2.5 text-[#c9c6ee]">
        <p className="text-lg font-bold text-white">Player: {settings.name}</p>
        <p className="text-sm">
          {getCategoryName(settings.category)} | {settings.difficulty} | {settings.amount} questions
        </p>
      </div>

      <ResultScreen
        score={score}
        total={questions.length}
        time={timeTaken}
        onRestart={restart}
      />

      <Link className="m-2.5 inline-block text-orange-400" to="/history">
        View History
      </Link>
    </div>
  );
}

export default Result;