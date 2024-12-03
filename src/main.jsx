import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode>,
)