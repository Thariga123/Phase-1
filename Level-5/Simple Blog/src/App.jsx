import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div>
        <h1>My Simple Blog 📑</h1>
        <div className="container">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/posts/:id" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
