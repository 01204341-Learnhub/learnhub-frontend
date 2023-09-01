import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import MainbarLayout from './layouts/MainbarLayout'
import StudentNavbarLayout from './layouts/StudentNavbarLayout'
import CourseDetail from './pages/CourseDetail'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import LearningClasses from './pages/students/LearningClasses'
import LearningCourses from './pages/students/LearningCourses'
import LearningHomeworks from './pages/students/LearningHomeworks'
import LearningOverview from './pages/students/LearningOverview'
import LearningSchedule from './pages/students/LearningSchedule'
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
            <Route element={<StudentNavbarLayout />}>
              <Route path='/learn/overview' element={<LearningOverview />} />
              <Route path='/learn/courses' element={<LearningCourses />} />
              <Route path='/learn/classes' element={<LearningClasses />} />
              <Route path='/learn/homework' element={<LearningHomeworks />} />
              <Route path='/learn/schedule' element={<LearningSchedule />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
