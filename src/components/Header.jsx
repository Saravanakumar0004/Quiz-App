import { NavLink } from "react-router-dom";


function linkClass({ isActive }) {
  return isActive ? "font-bold text-orange-400" : "text-[#c9c6ee]";
}

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-bold md:text-4xl">React Quiz</h1>
      <p className="text-sm text-[#c9c6ee]">Test your React knowledge.</p>

      <div className="mt-3 flex gap-5">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/history" className={linkClass}>History</NavLink>
      </div>
    </div>
  );
}

export default Header;