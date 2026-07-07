import { Link, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="text-muted">
          Multi-tier fitness insights for users, teams, activities, workouts, and leaderboard data.
        </p>
        <p className="small text-muted">
          Define VITE_CODESPACE_NAME in .env.local to enable Codespaces API URLs. Otherwise the app falls back to localhost.
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/users">Users</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<div className="card p-4"><h2>Welcome</h2><p>Choose a section to explore the OctoFit data.</p><Link to="/users" className="btn btn-primary">Open users</Link></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
