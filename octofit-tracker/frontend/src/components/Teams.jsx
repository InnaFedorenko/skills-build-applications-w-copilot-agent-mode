import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiEndpoint('teams'));
        const payload = await response.json();
        setTeams(Array.isArray(payload) ? payload : payload.teams || payload.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <div className="p-4">Loading teams…</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team.id || team._id || team.name}>
            <strong>{team.name}</strong> — {team.focus} ({team.members} members)
          </li>
        ))}
      </ul>
    </div>
  );
}
