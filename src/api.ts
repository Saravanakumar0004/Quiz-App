import type { QuizSettings, Question } from "./types/quiz";

const API_URL = import.meta.env.VITE_API_URL;


interface ApiQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ApiResult {
  response_code: number;
  results: ApiQuestion[];
}


function decode(text: string): string {
  const box = document.createElement("textarea");
  box.innerHTML = text;
  return box.value;
}


function shuffle(items: string[]): string[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

export async function getQuestions(settings: QuizSettings): Promise<Question[]> {
  const url =
    API_URL +
    "?amount=" + settings.amount +
    "&type=multiple" +
    "&category=" + settings.category +
    "&difficulty=" + settings.difficulty;

  const res = await fetch(url);

  if (res.status === 429) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }
  if (!res.ok) {
    throw new Error("Server error. Please try again.");
  }

  const data: ApiResult = await res.json();

  if (data.response_code === 5) {
    throw new Error("Too many requests. Wait 5 seconds and try again.");
  }
  if (data.response_code === 1) {
    return []; 
  }
  if (data.response_code !== 0) {
    throw new Error("Could not load questions. Please try again.");
  }

  return data.results.map((item, index) => {
    const answer = decode(item.correct_answer);
    const wrong = item.incorrect_answers.map(decode);

    return {
      id: index + 1,
      question: decode(item.question),
      options: shuffle([answer, ...wrong]),
      answer: answer,
    };
  });
}