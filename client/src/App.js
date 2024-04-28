import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>

      <Route path='/home' exact element={<Homescreen />}/>
      <Route path='/book/:roomid' exact component={Bookingscreen}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
