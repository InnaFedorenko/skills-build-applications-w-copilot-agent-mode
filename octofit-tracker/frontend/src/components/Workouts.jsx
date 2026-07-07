import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
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
