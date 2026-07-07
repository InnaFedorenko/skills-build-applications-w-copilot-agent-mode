import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiEndpoint('leaderboard'));
        const payload = await response.json();
        setEntries(Array.isArray(payload) ? payload : payload.leaderboard || payload.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="p-4">Loading leaderboard…</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Leaderboard</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry.rank || entry.name}>
            <strong>#{entry.rank}</strong> {entry.name} — {entry.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
