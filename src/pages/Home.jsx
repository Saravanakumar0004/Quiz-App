
import StartScreen from "../components/StartScreen";

function Home(props) {
  return (
    <StartScreen onStart={props.onStart} />
  );
}

export default Home;
