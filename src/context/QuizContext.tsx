import { createContext, useContext, useReducer, useState } from "react";
import type { Dispatch, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../api";
import { getCategoryName } from "../categories";
import useTimer, { formatTime } from "../hooks/useTimer";
import useLocalStorage from "../hooks/useLocalStorage";
import type { HistoryItem, Question, QuizSettings, Screen } from "../types/quiz";

const TOTAL_TIME = 600; // 10 minutes

// the reducer state
interface QuizState {
  screen: Screen;
  current: number;
  answers: Record<number, string>; // question id -> chosen option
  timeTaken: number;
}

// every action the reducer understands
type QuizAction =
  | { type: "START" }
  | { type: "ANSWER"; id: number; option: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "FINISH"; timeTaken: number }
  | { type: "RESTART" };

const initialState: QuizState = {
  screen: "start",
  current: 0,
  answers: {},
  timeTaken: 0,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START":
      return { ...initialState, screen: "quiz" };

    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.option },
      };

    case "NEXT":
      return { ...state, current: state.current + 1 };

    case "PREV":
      return { ...state, current: state.current - 1 };

    case "FINISH":
      return { ...state, screen: "result", timeTaken: action.timeTaken };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

// everything the pages can read from the context
interface QuizContextType {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
  questions: Question[];
  loading: boolean;
  error: string;
  history: HistoryItem[];
  settings: QuizSettings;
  saveSettings: (settings: QuizSettings) => void;
  score: number;
  time: string;
  timeTaken: string;
  start: (settings: QuizSettings) => Promise<void>;
  select: (option: string) => void;
  next: () => void;
  prev: () => void;
  restart: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // api states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // history and settings are remembered after refresh
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("quizHistory", []);
  const [settings, setSettings] = useLocalStorage<QuizSettings>("quizSettings", {
    name: "",
    category: "",
    difficulty: "",
    amount: 10,
  });

  // score is calculated here
  let score = 0;
  questions.forEach((q) => {
    if (state.answers[q.id] === q.answer) {
      score = score + 1;
    }
  });

  // timer runs only while the questions are showing
  const running = state.screen === "quiz" && !loading && error === "";
  const { timeLeft, time } = useTimer(TOTAL_TIME, handleTimeUp, running);

  // time is over: submit the quiz
  function handleTimeUp(): void {
    finishQuiz(TOTAL_TIME);
  }

  // save to history and show the result page
  function finishQuiz(timeUsed: number): void {
    const entry: HistoryItem = {
      id: Date.now(),
      name: settings.name,
      category: getCategoryName(settings.category),
      difficulty: settings.difficulty,
      score: score,
      total: questions.length,
      percent: Math.round((score / questions.length) * 100),
      date: new Date().toLocaleString(),
      time: formatTime(timeUsed),
    };

    setHistory([entry, ...history]); // newest first
    dispatch({ type: "FINISH", timeTaken: timeUsed });
    navigate("/result");
  }

  async function handleStart(newSettings: QuizSettings): Promise<void> {
    setQuestions([]);
    setError("");
    setLoading(true);
    dispatch({ type: "START" });
    navigate("/quiz");

    try {
      const data = await getQuestions(newSettings);
      setQuestions(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(option: string): void {
    const question = questions[state.current];
    if (!question || state.answers[question.id]) return;

    dispatch({ type: "ANSWER", id: question.id, option: option });
  }

  function handleNext(): void {
    if (state.current < questions.length - 1) {
      dispatch({ type: "NEXT" });
    } else {
      finishQuiz(TOTAL_TIME - timeLeft); // last question: finish
    }
  }

  function handlePrev(): void {
    if (state.current > 0) {
      dispatch({ type: "PREV" });
    }
  }

  function handleRestart(): void {
    dispatch({ type: "RESTART" });
    setQuestions([]);
    setError("");
    navigate("/");
  }

  const value: QuizContextType = {
    state,
    dispatch,
    questions,
    loading,
    error,
    history,
    settings,
    saveSettings: setSettings,
    score,
    time,
    timeTaken: formatTime(state.timeTaken),
    start: handleStart,
    select: handleSelect,
    next: handleNext,
    prev: handlePrev,
    restart: handleRestart,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// custom hook: pages use this to read the context
export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);

  if (context === null) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }

  return context;
}