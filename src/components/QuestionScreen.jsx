function QuestionScreen(props) {
  const percent = (props.current / props.total) * 100;

  function getClass(option) {
    const base = "cursor-pointer rounded-xl p-4 ";

    if (!props.selected) {
      return base + "border border-gray-300 text-gray-700 hover:border-[#6c5ce7]";
    }
    if (option === props.correct) {
      return base + "border-2 border-green-500 bg-green-50 font-bold text-green-700";
    }
    if (option === props.selected) {
      return base + "border-2 border-red-500 bg-red-50 font-bold text-red-700";
    }
    return base + "border border-gray-300 text-gray-700";
  }

  return (
    <div className="m-2.5 w-full max-w-md rounded-3xl bg-white p-6 text-gray-800 md:p-8">
      <div className="flex justify-between">
        <h4 className="font-bold">
          Question {props.current} / {props.total}
        </h4>
        <span className="text-sm text-red-500">⏱ {props.time}</span>
      </div>

      <div className="my-3 h-2 rounded-full bg-[#e5e1f7]">
        <div
          className="h-full rounded-full bg-[#6c5ce7]"
          style={{ width: percent + "%" }}
        ></div>
      </div>

      <h2 className="mb-5 text-xl font-bold">{props.question}</h2>

      <div className="flex flex-col gap-3">
        {props.options.map((option) => (
          <div
            key={option}
            className={getClass(option)}
            onClick={() => props.onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p
          className={
            props.current === 1
              ? "cursor-not-allowed text-[#6c5ce7] opacity-40"
              : "cursor-pointer text-[#6c5ce7]"
          }
          onClick={props.onPrev}
        >
          Previous
        </p>
        <p
          className="cursor-pointer rounded-xl bg-[#6c5ce7] px-10 py-3 text-white"
          onClick={props.onNext}
        >
          {props.current === props.total ? "Finish" : "Next"}
        </p>
      </div>
    </div>
  );
}

export default QuestionScreen;