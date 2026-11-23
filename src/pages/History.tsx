import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const cardClass = "m-2.5 w-full max-w-2xl rounded-3xl bg-white p-8 text-gray-800";
const buttonClass =
  "mt-4 inline-block cursor-pointer rounded-xl bg-[#fec83a] px-6 py-3 text-center font-bold text-black";

function History() {
  const { history } = useQuiz();

  if (history.length === 0) {
    return (
      <div className={cardClass}>
        <h2 className="text-2xl font-bold">No history yet</h2>
        <p className="mt-2 text-gray-600">
          Finish a quiz and your result will show up here.
        </p>
        <Link to="/" className={buttonClass}>
          Start a Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <h2 className="text-2xl font-bold">Quiz History</h2>

      <ul className="mt-4 space-y-3">
        {history.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">{item.name || "Guest"}</p>
              <p className="text-lg font-bold text-[#2d1b69]">
                {item.score}/{item.total} ({item.percent}%)
              </p>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              {item.category || "Any Category"} ·{" "}
              {item.difficulty
                ? item.difficulty.charAt(0).toUpperCase() +
                  item.difficulty.slice(1)
                : "Any Difficulty"}{" "}
              · {item.time}
            </p>

            <p className="mt-1 text-xs text-gray-500">{item.date}</p>
          </li>
        ))}
      </ul>

      <Link to="/" className={buttonClass}>
        New Quiz
      </Link>
    </div>
  );
}

export default History;