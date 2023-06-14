import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MainLayout from './components/MainLayout';
import ProductList from './pages/ProductList';
import ProductAdd, { BasicDetails, Description, FullDetails, Images, Keyword, MoreDetails } from './pages/ProductAdd';
import CategoryAdd from './pages/CategoryAdd';
import CategoryList from './pages/CategoryList';

import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
//import  store from './store/configureStore';
import { setLoggedInUser } from './features/user/userSlice';


const App = () => {
	
	const dispatch = useDispatch();
	// to check firebase auth state, it is also used to prevent memory leak after using unsubscribe it will clear the store
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if(user) {
				
				const idTokenResult = await user.getIdTokenResult();
				console.log('User', user);

				dispatch(
					setLoggedInUser({
					  email: user.email,
					  token: idTokenResult.token,
					})
				  );
			}
		})
		//
		return () => unsubscribe();
	}, [])


	return (
		<>
		<ToastContainer />
		<Router>
			<Routes>

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
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
					<Route path="addCategory" element={<CategoryAdd />} />
					<Route path="categoryList" element={<CategoryList />} />



        </Route>
      </Routes>
    </Router>
	</>
  );
}

export default App;
