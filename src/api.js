function decode(text) {
  const box = document.createElement("textarea");
  box.innerHTML = text;
  return box.value;
}

export async function getQuestions() {
  let url = "https://opentdb.com/api.php?amount=10&type=multiple";
  const res = await fetch(url);
  console.log("res-----", res);

  if (res.status === 429) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }

  if (res.ok === false) {
    throw new Error("Server error. Please try again.");
  }

  const data = await res.json();

  if (data.response_code === 5) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }

  const questions = [];

  for (let i = 0; i < data.results.length; i++) {
    const item = data.results[i];
    const answer = decode(item.correct_answer);
    const wrong = [];
    for (let j = 0; j < item.incorrect_answers.length; j++) {
      wrong.push(decode(item.incorrect_answers[j]));
    }

    const options = [];
    options.push(answer);
    for (let j = 0; j < wrong.length; j++) {
      options.push(wrong[j]);
    }

    options.sort(function () {
      return Math.random() - 0.5;
    });

    const question = {
      id: i + 1,
      question: decode(item.question),
      options: options,
      answer: answer,
    };

    questions.push(question);
  }

  return questions;
}
