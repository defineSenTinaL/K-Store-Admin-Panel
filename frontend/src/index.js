import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import store from './store/configureStore';
import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import rootReducer from './store/reducer/rootReducer';

//store
//const store = createStore(rootReducer, composeWithDevTools());

// Get the stored last visited route from local storage
const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <App initialRoute={lastVisitedRoute} />
  </Provider>
  //</React.StrictMode>
);
