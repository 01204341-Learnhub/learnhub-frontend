import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'
import MainbarLayout from './layouts/MainbarLayout'
import StudentNavbarLayout from './layouts/StudentNavbarLayout'
import TeacherNavbarLayout from './layouts/TeacherNavbarLayout'
import AllClasses from './pages/AllClasses'
import AllCourses from './pages/AllCourses'
import ClassDetail from './pages/ClassDetail'
import CourseDetail from './pages/CourseDetail'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import LearnCourse from './pages/students/LearnCourse'
import LearningClasses from './pages/students/LearningClasses'
import LearningHomeworks from './pages/students/LearningHomeworks'
import LearningOverview from './pages/students/LearningOverview'
import LearningSchedule from './pages/students/LearningSchedule'
import SelectCourse from './pages/students/SelectCourse'
import TeachingClasses from './pages/teachers/TeachingClasses'
import TeachingCourses from './pages/teachers/TeachingCourses'
import TeachingHomeworks from './pages/teachers/TeachingHomeworks'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<Landing />} />
          <Route element={<MainbarLayout />}>
            <Route element={<ProtectedRoute />} >
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/home' element={<Home />} />
            <Route path='/home/courses' element={<AllCourses />}></Route>
            <Route path='/home/classes' element={<AllClasses />}></Route>
            <Route path='/detail/course/:id' element={<CourseDetail />} />
            <Route path='/detail/class/:id' element={<ClassDetail />} />
            <Route element={<StudentNavbarLayout />}>
              <Route path='/learn/overview' element={<LearningOverview />} />
              <Route path='/learn/courses' element={<SelectCourse />} />
              <Route path='/learn/courses/:courseID' element={<LearnCourse />} />
              <Route path='/learn/classes' element={<LearningClasses />} />
              <Route path='/learn/homework' element={<LearningHomeworks />} />
              <Route path='/learn/schedule' element={<LearningSchedule />} />
            </Route>
            <Route element={<TeacherNavbarLayout />}>
              <Route path='/teach/courses' element={<TeachingCourses />} />
              <Route path='/teach/classes' element={<TeachingClasses />} />
              <Route path='/teach/homework' element={<TeachingHomeworks />} />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
