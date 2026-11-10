import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const cardClass = "m-2.5 w-full max-w-md rounded-3xl bg-white p-6 text-gray-800 md:p-8";

function History() {
  const { history } = useQuiz();

  if (history.length === 0) {
    return (
      <div className={cardClass}>
        <h2 className="text-2xl font-bold">History</h2>
        <p className="my-3 text-gray-500">No quizzes played yet.</p>
        <Link
          className="block rounded-xl bg-[#fec83a] py-3 text-center font-bold text-black"
          to="/"
        >
          Start a Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <h2 className="mb-2 text-2xl font-bold">History</h2>

      {history.map((item) => (
        <div
          className="flex flex-col gap-1 border-b border-gray-200 py-3 sm:flex-row sm:justify-between"
          key={item.id}
        >
          <div>
            <p className="font-bold">
              {item.name} - {item.score}/{item.total} ({item.percent}%)
            </p>
            <p className="text-sm text-gray-500">
              {item.category} | {item.difficulty}
            </p>
          </div>
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>
      ))}
    </div>
  );
}

export default History;