import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/api/users/`);
        const payload = await response.json();
        setUsers(Array.isArray(payload) ? payload : payload.users || payload.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading users…</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user.id || user._id || user.email}>
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}
