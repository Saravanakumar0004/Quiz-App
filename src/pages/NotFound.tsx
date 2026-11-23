import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="m-2.5 w-full max-w-md rounded-3xl bg-white p-8 text-gray-800">
      <h2 className="text-2xl font-bold">404 - Page not found</h2>
      <p className="my-3 text-gray-500">The page you are looking for does not exist.</p>
      <Link
        className="block rounded-xl bg-[#fec83a] py-3 text-center font-bold text-black"
        to="/"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;