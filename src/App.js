import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import NewComic from './NewComic.js';
import Item from './Item/Item.js';
import ReadComic from './ReadComic/ReadComic.js';
import Chapter from './Chapter/Chapter.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from './Search/Search.js';
import List from './List/List.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truyen-moi" element={<NewComic />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Item" element={<Item />} />
        <Route path="/Chapter" element={<Chapter />} />
        <Route path="/ReadComic" element={<ReadComic />} />
        <Route path="/List/:id/:subId?" element={<List />} />
      </Routes>
    </BrowserRouter>);

}

export default App;
