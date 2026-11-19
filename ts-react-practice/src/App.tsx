import { useState } from "react";
import Button from "./components/Button";
import Counter from "./components/Counter";
import NameForm from "./components/NameForm";
import Card from "./components/Card";
import UserList from "./components/UserList";
import ReduxCounter from "./components/ReduxCounter";

function App() {
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <Card>
        <Button label="Click me" onClick={() => setMessage("Primary button clicked")} variant="primary" />
        <Button label="Cancel" onClick={() => setMessage("Secondary button clicked")} variant="secondary" />
        <p>{message}</p>
      </Card>

      <Card>
        <Counter />
      </Card>

      <Card>
        <NameForm />
      </Card>

      <Card>
        <UserList />
      </Card>

      <Card>
        <ReduxCounter />
      </Card>
    </div>
  );
}

export default App;