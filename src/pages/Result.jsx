
import { Navigate, Link } from "react-router-dom";
import ResultScreen from "../components/ResultScreen";

function Result(props) {


  if (props.total === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <ResultScreen
        score={props.score}
        total={props.total}
        time={props.time}
        onRestart={props.onRestart}
      />

      <Link
        className="history-link"
        to="/history"
      >
        View History
      </Link>
    </div>
  );
}

export default Result;
