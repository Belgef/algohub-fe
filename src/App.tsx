import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateLessonPage from "./pages/lessons/CreateLessonPage";
import LessonPage from "./pages/lessons/LessonPage";
import LessonsPage from "./pages/lessons/LessonsPage";
import { Routes as Paths } from "./routes/routesConfig";

export function App() {
  return (
    <>
      <Navbar />
      <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path={Paths.Root} element={<HomePage />} />
          <Route path={Paths.Lessons}>
            <Route path="" element={<LessonsPage />} />
            <Route path=":id" element={<LessonPage />} />
            <Route path="create" element={<CreateLessonPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}
