import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import People from './pages/people/People';
import Staff from './pages/dashboard/Staff';

function App() {
  return (
    <div>
      <BrowserRouter> 
    <Routes> 
      <Route path="/" element={<Staff />}> </Route>
      <Route path="/people" element={<People />}> 
      </Route> 
    </Routes> 
  </BrowserRouter> 
    </div>
  );
}

export default App;
