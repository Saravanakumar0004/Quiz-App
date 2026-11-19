import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

function NameForm() {
  const [name, setName] = useState<string>("");
  const [saved, setSaved] = useState<string>("");

  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

 
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(name.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={handleChange} placeholder="Your name" />
      <button type="submit">Save</button>
      {saved && <p>Saved: {saved}</p>}
    </form>
  );
}

export default NameForm;