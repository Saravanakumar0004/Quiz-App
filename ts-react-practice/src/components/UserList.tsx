import { useEffect, useState } from "react";
import type { User } from "../types/user";


interface UsersResponse {
  users: User[];
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=5");
        if (!res.ok) {
          throw new Error("Request failed: " + res.status);
        }
        const data: UsersResponse = await res.json();
        setUsers(data.users);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName} - {user.email}
        </li>
      ))}
    </ul>
  );
}

export default UserList;