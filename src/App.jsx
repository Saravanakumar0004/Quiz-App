
import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

import { getQuestions } from "./api";

function App() {


  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  // useEffect(() => {
  //   async function loadQuestions() {
  //     try {
  //       const data = await getQuestions();
  //       setQuestions(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadQuestions();
  // }, []);

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
    return ( String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
  }



  const question = questions[current];



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
  setError("");
  setLoading(true);
  setScreen("quiz");
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
    if (answers[question.id]) return;
    setAnswers((previous) => ({
      ...previous,
      [question.id]: option
    }));
  }


  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setScreen("result");
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
    setScreen("start");
  }



  return (
    <div className="app">
      <Header />
      <div className="screens">
        {screen === "start" && (
          <StartScreen
            onStart={handleStart}
          />
        )}

        {screen === "quiz" && loading && (
          <div className="card">
            <h2>Loading...</h2>
          </div>
        )}

        {screen === "quiz" && !loading && error && (
          <div className="card">
            <h2 className="error">{error}</h2>
            <p className="start-btn" onClick={handleStart}>
              Try Again
            </p>
          </div>
        )}

        {screen === "quiz" &&
          !loading &&
          !error &&
          questions.length === 0 && (
            <div className="card">
              <h2>No questions found</h2>
              <p className="start-btn" onClick={handleRestart}>
                Back
              </p>
            </div>
          )}


        {screen === "quiz" &&
          !loading &&
          !error &&
          questions.length > 0 && (
            <QuestionScreen
              current={current + 1}
              total={questions.length}
              time={formatTime(seconds)}
              question={question.question}
              options={question.options}
              selected={answers[question.id]}
              correct={question.answer}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}



        {screen === "result" && (
          <ResultScreen
            score={score}
            total={questions.length}
            time={formatTime(seconds)}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );

}

export default App;
