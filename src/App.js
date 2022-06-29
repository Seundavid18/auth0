import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Protected from './Protected';
import Footer from './Footer';


function App() {
  return (
    <div>
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/protected' element={<Protected />}/>
      </Route>
    </Routes>
    <Footer />
    </div>
    
 
  );
}

export default App;
