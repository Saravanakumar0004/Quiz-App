import { useState } from "react";
import type { FormEvent } from "react";
import StartScreen from "../components/StartScreen";
import { useQuiz } from "../context/QuizContext";
import { categories } from "../categories";
import type { QuizSettings } from "../types/quiz";

const cardClass = "m-2.5 w-full max-w-md rounded-3xl bg-white p-8 text-gray-800";
const labelClass = "mt-4 block text-sm font-semibold text-gray-600";
const fieldClass =
  "mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-[#fec83a]";
const buttonClass =
  "mt-6 w-full cursor-pointer rounded-xl bg-[#fec83a] py-3 text-center font-bold text-black disabled:cursor-not-allowed disabled:opacity-60";
const backClass =
  "mt-3 w-full cursor-pointer rounded-xl py-2 text-center text-sm font-semibold text-gray-500";

const DIFFICULTY_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Any Difficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const AMOUNT_OPTIONS: number[] = [5, 10, 15, 20];

function Home() {
  const { settings, loading, start } = useQuiz();

  const [step, setStep] = useState<"intro" | "setup">("intro");

  const [name, setName] = useState<string>(settings.name);
  const [category, setCategory] = useState<string>(String(settings.category ?? ""));
  const [difficulty, setDifficulty] = useState<string>(String(settings.difficulty ?? ""));
  const [amount, setAmount] = useState<number>(Number(settings.amount) || 10);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const newSettings = {
      name: name.trim() || "Guest",
      category: category,
      difficulty: difficulty,
      amount: amount,
    } as QuizSettings;

    start(newSettings);
  }

  if (step === "intro") {
    return <StartScreen onStart={() => setStep("setup")} />;
  }

  return (
    <div className={cardClass}>
      <h2 className="text-2xl font-bold">Choose your quiz</h2>

      <form onSubmit={handleSubmit}>
        <label className={labelClass} htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          type="text"
          className={fieldClass}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={labelClass} htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className={fieldClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Any Category</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label className={labelClass} htmlFor="difficulty">
          Difficulty
        </label>
        <select
          id="difficulty"
          className={fieldClass}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {DIFFICULTY_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <label className={labelClass} htmlFor="amount">
          Number of questions
        </label>
        <select
          id="amount"
          className={fieldClass}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        >
          {AMOUNT_OPTIONS.map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>

        <button type="submit" className={buttonClass} disabled={loading}>
          {loading ? "Loading…" : "Start Quiz"}
        </button>

        <p className={backClass} onClick={() => setStep("intro")}>
          ← Back
        </p>
      </form>
    </div>
  );
}

export default Home;