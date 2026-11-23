export type Screen = "start" | "quiz" | "result";


export interface QuizSettings {
  name: string;
  category: string;
  difficulty: string;
  amount: number;
}


export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}


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