import "./App.css";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const question = {
    text: "Which hook is used to add state to a functional component?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
  };

  return (
    <div className="app">
      <Header/>

      <div className="screens">
        <div>
          <h3>Start screen</h3>
          <StartScreen />
        </div>

        <div>
          <h3>Question screen</h3>
          <QuestionScreen
            current={3}
            total={10}
            time="08:45"
            question={question.text}
            options={question.options}
          />
        </div>

        <div>
          <h3>Result screen</h3>
          <ResultScreen />
        </div>
      </div>
    </div>
  );
}

export default App;