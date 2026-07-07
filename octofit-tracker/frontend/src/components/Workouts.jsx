import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const response = await fetch(
          codespaceName
            ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
            : 'http://localhost:8000/api/workouts/'
        );
        const payload = await response.json();
        setWorkouts(Array.isArray(payload) ? payload : payload.workouts || payload.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <div className="p-4">Loading workouts…</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout.id || workout._id || workout.name}>
            <strong>{workout.name}</strong> — {workout.difficulty} ({workout.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}
