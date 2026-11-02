import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import questions from "./data";

function App() {
  const [screen, setScreen] = useState("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(0);


  useEffect(() => {
    if (screen !== "quiz") return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [screen]);

  function formatTime(total) {
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }



  const question = questions[current];



  let score = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      score = score + 1;
    }
  });



  function handleStart() {
    setAnswers({});
    setCurrent(0);
    setSeconds(0);
    setScreen("quiz");
  }

  function handleSelect(option) {
    if (answers[question.id]) return; 
    setAnswers({ ...answers, [question.id]: option });
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
    setScreen("start");
  }


  return (
    <div className="app">
      <Header />

      <div className="screens">
        {screen === "start" && <div>
           <h3>Start screen</h3>
            <StartScreen onStart={handleStart} /> 
            
            </div>}

        {screen === "quiz" && (
          <div>
            <h3>Question screen</h3>
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
          </div>
        )}

        {screen === "result" && (
          <div>
            <h3>Result screen</h3>
          <ResultScreen
            score={score}
            total={questions.length}
            time={formatTime(seconds)}
            onRestart={handleRestart}
          />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
