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
              <Route exact path='' element={<Home />}></Route>
              <Route exact path='dashboard' element={<Dashboard />}></Route>
              <Route exact path="about" element={<About />}></Route>
              <Route exact path="login" element={<Login  setProgress={setProgress} />}></Route>
              <Route exact path="signup" element={<Signup  setProgress={setProgress} />}></Route>
              <Route exact path="chat" element={<Chat setProgress={setProgress} />}></Route>
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