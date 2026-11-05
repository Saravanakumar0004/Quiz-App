import { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../api";
import useTimer, { formatTime } from "../hooks/useTimer";
import useLocalStorage from "../hooks/useLocalStorage";

const QuizContext = createContext();


const initialState = {
  screen: "start", 
  current: 0,
  answers: {},
  timeTaken: 0,
};


function quizReducer(state, action) {
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

export function QuizProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [history, setHistory] = useLocalStorage("quizHistory", []);


  let score = 0;
  questions.forEach((q) => {
    if (state.answers[q.id] === q.answer) {
      score = score + 1;
    }
  });


  const running = state.screen === "quiz" && !loading && error === "";
  const { timeLeft, time } = useTimer(600, handleTimeUp, running);


  function handleTimeUp() {
    finishQuiz(600);
  }


  function finishQuiz(timeTaken) {
    const entry = {
      id: Date.now(),
      score: score,
      total: questions.length,
      percent: Math.round((score / questions.length) * 100),
      date: new Date().toLocaleString(),
      time: formatTime(timeTaken),
    };

    setHistory([entry, ...history]);
    dispatch({ type: "FINISH", timeTaken: timeTaken });
    navigate("/result");
  }

  async function handleStart() {
    setQuestions([]);
    setError("");
    setLoading(true);
    dispatch({ type: "START" });
    navigate("/quiz");

    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(option) {
    const question = questions[state.current];
    dispatch({ type: "ANSWER", id: question.id, option: option });
  }

  function handleNext() {
    if (state.current < questions.length - 1) {
      dispatch({ type: "NEXT" });
    } else {
      finishQuiz(600 - timeLeft); 
    }
  }

  function handlePrev() {
    if (state.current > 0) {
      dispatch({ type: "PREV" });
    }
  }

  function handleRestart() {
    dispatch({ type: "RESTART" });
    setQuestions([]);
    setError("");
    navigate("/");
  }


  const value = {
    state,
    dispatch,
    questions,
    loading,
    error,
    history,
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


export function useQuiz() {
  return useContext(QuizContext);
}