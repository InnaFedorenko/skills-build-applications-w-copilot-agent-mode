import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const payload = await response.json();
        setActivities(Array.isArray(payload) ? payload : payload.activities || payload.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <div className="p-4">Loading activities…</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity.id || activity._id || activity.type}>
            <strong>{activity.type}</strong> — {activity.duration} • {activity.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
