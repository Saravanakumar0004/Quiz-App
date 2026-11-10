function ResultScreen(props) {
  const percent = Math.round((props.score / props.total) * 100);
  const wrong = props.total - props.score;

  let title = "Keep practicing!";
  if (percent >= 70) {
    title = "Great job! 🎉";
  } else if (percent >= 40) {
    title = "Good effort!";
  }

  return (
    <div className="m-2.5 w-full max-w-md rounded-3xl bg-white p-8 text-center text-gray-800">
      <div
        className="mx-auto mb-6 flex h-44 w-44 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(#6c5ce7 ${percent}%, #e5e1f7 0)` }}
      >
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
          <h1 className="text-4xl font-bold">{props.score}/{props.total}</h1>
          <p className="text-sm text-gray-500">{percent}%</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="my-6 flex justify-around">
        <div>
          <h3 className="text-xl font-bold text-green-600">{props.score}</h3>
          <p className="text-gray-500">Correct</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-500">{wrong}</h3>
          <p className="text-gray-500">Wrong</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-black">{props.time}</h3>
          <p className="text-gray-500">Time</p>
        </div>
      </div>

      <p
        className="cursor-pointer rounded-xl bg-[#fec83a] py-3 font-bold text-black"
        onClick={props.onRestart}
      >
        Restart Quiz
      </p>
    </div>
  );
}

export default ResultScreen;