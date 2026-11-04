
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import { getQuestions } from "./api";

function App() {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(0);


  const [history, setHistory] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    if (screen !== "quiz" || loading) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, loading]);

 
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  }

 
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      score = score + 1;
    }
  });


  async function handleStart() {
    setAnswers({});
    setCurrent(0);
    setSeconds(0);
    setQuestions([]);
    setError("");
    setLoading(true);
    setScreen("quiz");

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
    const question = questions[current];

    if (!question || answers[question.id]) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: option,
    }));
  }


  function handleNext() {
    if (screen !== "quiz" || questions.length === 0) return;

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
    
    else {
      const entry = {
        id: Date.now(),
        score: score,
        total: questions.length,
        percent: Math.round(
          (score / questions.length) * 100
        ),
        date: new Date().toLocaleString(),
        time: formatTime(seconds),
      };

      setHistory((previous) => [entry, ...previous]);

      setScreen("result");
      navigate("/result");
    }
  }


  function handlePrev() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }


  function handleRestart() {
    setAnswers({});
    setCurrent(0);
    setSeconds(0);
    setQuestions([]);
    setError("");
    setLoading(false);
    setScreen("start");

    navigate("/");
  }

  return (
    <div className="app">
      <Header />

      <div className="screens">
        <Routes>
          <Route
            path="/"
            element={
              <Home onStart={handleStart} />
            }
          />

          <Route
            path="/quiz"
            element={
              screen === "quiz" ? (
                <Quiz
                  loading={loading}
                  error={error}
                  questions={questions}
                  current={current}
                  answers={answers}
                  time={formatTime(seconds)}
                  onSelect={handleSelect}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onStart={handleStart}
                  onRestart={handleRestart}
                />
              ) : (
                <Home onStart={handleStart} />
              )
            }
          />

          <Route
            path="/result"
            element={
              screen === "result" ? (
                <Result
                  score={score}
                  total={questions.length}
                  time={formatTime(seconds)}
                  onRestart={handleRestart}
                />
              ) : (
                <Home onStart={handleStart} />
              )
            }
          />

          <Route
            path="/history"
            element={<History history={history} />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
