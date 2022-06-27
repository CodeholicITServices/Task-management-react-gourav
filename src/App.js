import './App.css';
import './docs.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import PageNotFound from './components/PageNotFound';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';


function App() {
  const [progress, setProgress] = useState(0)
  const AppURL = process.env.REACT_APP_URL
  console.log(AppURL)
  return (
    <>
      <NoteState>
        <Router>
        <LoadingBar
        height={5}
          color='#f11946'
          shadow={true}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
          <Navbar setProgress={setProgress} />
          <div className="container" style={{marginTop: 5+"rem"}}>
            <Alert />
            <Routes>
              <Route exact path={`${AppURL}/`} element={<Home />}></Route>
              <Route exact path={`${AppURL}/dashboard`} element={<Dashboard />}></Route>
              <Route exact path={`${AppURL}/about`} element={<About />}></Route>
              <Route exact path={`${AppURL}/login`} element={<Login  setProgress={setProgress} />}></Route>
              <Route exact path={`${AppURL}/signup`} element={<Signup  setProgress={setProgress} />}></Route>
              <Route exact path={`${AppURL}/chat`} element={<Chat setProgress={setProgress} />}></Route>
              <Route path="*" element={<PageNotFound />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;