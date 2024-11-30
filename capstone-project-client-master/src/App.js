
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'



import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './components/register/Register';
import Login from './components/login/Login';

import Analyites from './components/analyites/Analyites';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<ProductRoutes>
          <HomePage />
        </ProductRoutes>} />
        <Route path='/analyites' element={<Analyites />} />




      </Routes>
    </>
  );
}
export function ProductRoutes(Props) {

  if (localStorage.getItem('user')) {
    return Props.children
  } else {
    return <Navigate to='/login' />
  }
}
export default App;
