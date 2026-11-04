import { Link } from "react-router-dom";

function History(props) {
  if (props.history.length === 0) {
    return (
      <div className="card">
        <h2>History</h2>
        <p>No quizzes played yet.</p>
        <Link className="start-btn" to="/">Start a Quiz</Link>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>History</h2>

      {props.history.map((item) => (
        <div className="history-item" key={item.id}>
          <span>{item.score}/{item.total} ({item.percent}%)</span>
          <span>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

export default History;
