import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>

      <Route path='/home' exact element={<Homescreen />}/>
      <Route path='/book/:roomid/:fromdate/:todate' exact element={<Bookingscreen/>}/>
      <Route path='/register' exact element= {<Registerscreen/>}/>
      <Route path='/login' exact element= {<Loginscreen/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
