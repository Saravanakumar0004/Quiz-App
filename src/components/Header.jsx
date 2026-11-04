import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1>React Quiz</h1>
      <p>Build all 3 screens as separate components. Show them one below the other for now. </p>

      
      <div className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/history">History</NavLink>
      </div>
    </div>
  );
}

export default Header;
