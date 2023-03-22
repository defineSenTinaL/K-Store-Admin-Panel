import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import ProductList from './pages/ProductList';
import ProductAdd, { BasicDetails, Description, FullDetails, Images, Keyword, MoreDetails } from './pages/ProductAdd';
import ProductDelete from './pages/ProductDelete';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/admin" element={<MainLayout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="productList" element={<ProductList />} />
					<Route path="addProduct" element={<ProductAdd />} >
						<Route path="basicDetails" element={<BasicDetails />} />
						<Route path="fullDetails" element={<FullDetails />} />
						<Route path="images" element={<Images />} />
						<Route path="description" element={<Description />} />
						<Route path="keywords" element={<Keyword />} />
						<Route path="moreDetails" element={<MoreDetails />} />
					</Route>
					<Route path="deleteProduct" element={<ProductDelete />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
