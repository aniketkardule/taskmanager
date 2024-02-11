import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TaskScreen';
import Profile from './screens/Profile';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const router =  createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
     <Route path='/' element={<HomeScreen /> }/> 
     <Route path='/tasks' element ={ <TaskScreen /> } />
     <Route path='/profile' element= { <Profile /> } />
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
