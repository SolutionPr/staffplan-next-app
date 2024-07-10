import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import People from './pages/people/People';
import Staff from './pages/dashboard/Staff';
import Project from './pages/project/Project';

function App() {
  return (
    <div>
      <BrowserRouter> 
    <Routes> 
      <Route path="/" element={<Staff />}/> 
      <Route path="/people" element={<People />}/> 
      <Route path="/project" element={<Project />}/> 
    </Routes> 
  </BrowserRouter> 
    </div>
  );
}

export default App;
