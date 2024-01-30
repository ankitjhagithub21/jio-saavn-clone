import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import AlbumDetails from './pages/AlbumDetails';
import Navbar from './components/Navbar';
import Player from './components/Player';
import "./App.css"
import { useSelector } from 'react-redux';

const App = () => {
  const song = useSelector((state)=>state.song.value)
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/albums/:id" element={<AlbumDetails/>}/>
      
    </Routes>
    {
      song && <Player/>
    }
    </BrowserRouter>
  )
}

export default App