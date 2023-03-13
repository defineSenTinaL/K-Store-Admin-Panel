import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import ProductList from './pages/ProductList';
import ProductAdd from './pages/ProductAdd';
import ProductDelete from './pages/ProductDelete';
import 'bootstrap/dist/css/bootstrap.min.css';


function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/admin' element={<MainLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='productList' element={<ProductList />} />
          <Route path='addProduct' element={<ProductAdd />} />
          <Route path='deleteProduct' element={<ProductDelete />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;