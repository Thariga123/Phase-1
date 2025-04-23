import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';
import Search from './components/Search';
import Sidebar from './components/Sidebar';
import CategoryTabs from './components/CategoryTabs';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <Search />
          <CategoryTabs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
