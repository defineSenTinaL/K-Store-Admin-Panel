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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <App />
  </Provider>
  //</React.StrictMode>
);
