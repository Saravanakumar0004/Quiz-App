export type Screen = "start" | "quiz" | "result";

// the settings from the Home form
export interface QuizSettings {
  name: string;
  category: string;
  difficulty: string;
  amount: number;
}

// one question after we change the API data
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// one finished quiz saved in history
export interface HistoryItem {
  id: number;
  name: string;
  category: string;
  difficulty: string;
  score: number;
  total: number;
  percent: number;
  date: string;
  time: string;
}