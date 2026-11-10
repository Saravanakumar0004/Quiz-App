import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

import { useQuiz } from "./context/QuizContext";

function App() {
  const { state } = useQuiz();

  return (
    <div className="min-h-screen bg-[#2d1b69] p-4 text-white md:p-8">
      <div className="mx-auto max-w-5xl">
        <Header />

        <div className="mt-5">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/quiz"
              element={state.screen === "quiz" ? <Quiz /> : <Home />}
            />

            <Route
              path="/result"
              element={state.screen === "result" ? <Result /> : <Home />}
            />

            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;