import './App.css';
import { Outlet } from "react-router-dom";
import Dashboard from './components/Dashboard';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Dashboard />
        <Outlet />
      </div>
    </CookiesProvider>
  );
}

export default App;
