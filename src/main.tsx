import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import MainbarLayout from './layouts/MainbarLayout'
import CourseDetail from './pages/CourseDetail'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<Landing />} />
          <Route element={<MainbarLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/detail/course/:id' element={<CourseDetail />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
