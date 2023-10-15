import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import MainbarLayout from "./layouts/MainbarLayout";
import StudentNavbarLayout from "./layouts/StudentNavbarLayout";
import TeacherNavbarLayout from "./layouts/TeacherNavbarLayout";
import AllClasses from "./pages/AllClasses";
import AllCourses from "./pages/AllCourses";
import Basket from "./pages/Basket";
import ClassDetail from "./pages/ClassDetail";
import CourseDetailPage from "./pages/CourseDetail";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import TeacherProfile from "./pages/TeacherProfile";
import LearnCourse from "./pages/students/LearnCourse";
import LearningClass from "./pages/students/LearningClass";
import LearningClasses from "./pages/students/LearningClasses";
import LearningHomeworkDetail from "./pages/students/LearningHomeworkDetail";
import LearningHomeworks from "./pages/students/LearningHomeworks";
import LearningOverview from "./pages/students/LearningOverview";
import LearningSchedule from "./pages/students/LearningSchedule";
import SelectCourse from "./pages/students/SelectCourse";
import CreateClass from "./pages/teachers/CreateClass";
import CreateCourse from "./pages/teachers/CreateCourse";
import ReviewWork from "./pages/teachers/ReviewWork";
import SelectTeachingClass from "./pages/teachers/SelectTeachingClass";
import TeacherCourseManage from './pages/teachers/TeacherCourseManage';
import TeacherIncomes from "./pages/teachers/TeacherIncomes";
import TeacherOverview from "./pages/teachers/TeacherOverview";
import TeachingClasses from "./pages/teachers/TeachingClasses";
import TeachingCourses from "./pages/teachers/TeachingCourses";
import TeachingHomeworks from "./pages/teachers/TeachingHomeworks";
import BasketPayment from "./pages/ฺBasketPayment";
import store from "./store";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<MainbarLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/teacherprofile/:id" element={<TeacherProfile />} />
            <Route path="/baskets" element={<Basket />} />
            <Route path="/baskets/payment" element={<BasketPayment />} />
            <Route path="/home/courses" element={<AllCourses />}></Route>
            <Route path="/home/classes" element={<AllClasses />}></Route>
            <Route path="/detail/course/:id" element={<CourseDetailPage />} />
            <Route path="/detail/class/:id" element={<ClassDetail />} />
            <Route element={<StudentNavbarLayout />}>
              <Route path="/learn/overview" element={<LearningOverview />} />
              <Route path="/learn/courses" element={<SelectCourse />} />
              <Route
                path="/learn/courses/:courseID"
                element={<LearnCourse />}
              />
              <Route path="/learn/classes" element={<LearningClasses />} />
              <Route
                path="/learn/classes/:classId"
                element={<LearningClass />}
              />
              <Route
                path="/learn/classes/:classId/homeworks/:homeworkId"
                element={<LearningHomeworkDetail />}
              />
              <Route path="/learn/homework" element={<LearningHomeworks />} />
              <Route path="/learn/schedule" element={<LearningSchedule />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<TeacherNavbarLayout />}>
                <Route path="/teach/courses" element={<TeachingCourses />} />
                <Route path="/teach/classes" element={<SelectTeachingClass />} />
                <Route path="/teach/classes/:classID" element={<TeachingClasses />} />
                <Route
                  path="/teach/classes/assignment/:assignmentID"
                  element={<TeachingClasses />}
                />
                <Route path="/teach/classes/:classID/review/:assignmentID" element={<ReviewWork />} />
                <Route path="/teach/homework" element={<TeachingHomeworks />} />
                <Route path="/teach/overview" element={<TeacherOverview />} />
                <Route path="/teach/course/:id" element={<TeacherCourseManage />} />
                <Route path="/teach/create/course" element={<CreateCourse />} />
                <Route path="/teach/create/class" element={<CreateClass />} />
                <Route path="/teach/incomes" element={< TeacherIncomes />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
