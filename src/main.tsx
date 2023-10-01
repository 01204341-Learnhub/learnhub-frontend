import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import MainbarLayout from "./layouts/MainbarLayout";
import StudentNavbarLayout from "./layouts/StudentNavbarLayout";
import TeacherNavbarLayout from "./layouts/TeacherNavbarLayout";
import CourseDetail from "./pages/CourseDetail";
import ClassDetail from "./pages/ClassDetail";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnCourse from "./pages/students/LearnCourse";
import LearningClasses from "./pages/students/LearningClasses";
import LearningHomeworks from "./pages/students/LearningHomeworks";
import LearningOverview from "./pages/students/LearningOverview";
import LearningSchedule from "./pages/students/LearningSchedule";
import SelectCourse from "./pages/students/SelectCourse";
import CreateClass from "./pages/teachers/CreateClass";
import CreateCourse from "./pages/teachers/CreateCourse";
import TeacherOverview from "./pages/teachers/TeacherOverview";
import TeachingClasses from "./pages/teachers/TeachingClasses";
import TeachingCourses from "./pages/teachers/TeachingCourses";
import TeachingHomeworks from "./pages/teachers/TeachingHomeworks";
import AllClasses from "./pages/AllClasses";
import AllCourses from "./pages/AllCourses";
import store from "./store";
import Test from "./pages/Test.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<MainbarLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/courses" element={<AllCourses />}></Route>
            <Route path="/home/classes" element={<AllClasses />}></Route>
            <Route path="/detail/course/:id" element={<CourseDetail />} />
            <Route path="/detail/class/:id" element={<ClassDetail />} />
            <Route element={<StudentNavbarLayout />}>
              <Route path="/learn/overview" element={<LearningOverview />} />
              <Route path="/learn/courses" element={<SelectCourse />} />
              <Route
                path="/learn/courses/:courseID"
                element={<LearnCourse />}
              />
              <Route path="/learn/classes" element={<LearningClasses />} />
              <Route path="/learn/homework" element={<LearningHomeworks />} />
              <Route path="/learn/schedule" element={<LearningSchedule />} />
            </Route>
            <Route element={<TeacherNavbarLayout />}>
              <Route path="/teach/courses" element={<TeachingCourses />} />
              <Route path="/teach/classes" element={<TeachingClasses />} />
              <Route path="/teach/homework" element={<TeachingHomeworks />} />
              <Route path="/teach/overview" element={<TeacherOverview />} />
              <Route path="/teach/create/course" element={<CreateCourse />} />
              <Route path="/teach/create/class" element={<CreateClass />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
