import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { categories } from "../categories";

const difficulties = ["easy", "medium", "hard"];


function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const amount = Number(form.amount);

  if (name === "") {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 letters";
  }

  if (form.category === "") {
    errors.category = "Please select a category";
  }

  if (form.difficulty === "") {
    errors.difficulty = "Please select a difficulty";
  }

  if (String(form.amount).trim() === "" || !Number.isInteger(amount) || amount < 5 || amount > 20) {
    errors.amount = "Enter a number from 5 to 20";
  }

  return errors;
}

function Home() {
  const { settings, saveSettings, start } = useQuiz();

  const [form, setForm] = useState(settings);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  function handleBlur(e) {
    const field = e.target.name;
    const newErrors = validate(form);
    setErrors({ ...errors, [field]: newErrors[field] });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    const cleanSettings = {
      name: form.name.trim(),
      category: form.category,
      difficulty: form.difficulty,
      amount: Number(form.amount),
    };

    setErrors({});
    setSaving(true);
    saveSettings(cleanSettings);
    await start(cleanSettings);
    setSaving(false);
  }


  function inputClass(field) {
    const base = "w-full rounded-lg border px-3 py-2 text-gray-800 ";
    return base + (errors[field] ? "border-red-500" : "border-gray-300");
  }

  return (
    <div className="m-2.5 w-full max-w-md rounded-3xl bg-white p-6 text-gray-800 md:p-8">
      <h2 className="text-2xl font-bold">React Basics Quiz</h2>
      <p className="mb-4 text-gray-500">Choose your quiz settings.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Your name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("category")}
          >
            <option value="">Select category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("difficulty")}
            >
              <option value="">Select difficulty</option>
              {difficulties.map((item) => (
                <option key={item} value={item}>
                  {item[0].toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
            {errors.difficulty && <p className="mt-1 text-sm text-red-500">{errors.difficulty}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Questions (5-20)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("amount")}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-[#fec83a] py-3 text-lg font-bold text-black disabled:opacity-50"
        >
          {saving ? "Starting..." : "Start Quiz"}
        </button>
      </form>
    </div>
  );
}

export default Home;