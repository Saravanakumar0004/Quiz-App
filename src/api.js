
function decode(text) {
  const box = document.createElement("textarea");
  box.innerHTML = text;
  return box.value;
}

export async function getQuestions(settings) {
  const url =
    "https://opentdb.com/api.php?amount=" + settings.amount +
    "&type=multiple&category=" + settings.category +
    "&difficulty=" + settings.difficulty;


  const res = await fetch(url);
  if (res.status === 429) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }
  if (!res.ok) {
    throw new Error("Server error. Please try again.");
  }

  const data = await res.json();
  if (data.response_code === 5) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }


  return data.results.map((item, index) => {
    const answer = decode(item.correct_answer);
    const wrong = item.incorrect_answers.map(decode);
    const options = [answer, ...wrong].sort(() => Math.random() - 0.5);

    return {
      id: index + 1,
      question: decode(item.question),
      options: options,
      answer: answer,
    };
  });
}