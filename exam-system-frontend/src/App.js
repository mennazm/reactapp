import './styles/App.css';
import Login from './Auth/Login';
import Register from './Auth/Register';
import QuestionsComp from './Components/admin/Questions/QuestionsComp';
import { NotFoundedComp } from './Components/NotFoundedComp';
import { ErrorComp } from './Components/ErrorComp';
import { SharedLayout } from './Components/admin/SharedLayout';
import ExamsComp from './Components/admin/Exams/ExamsComp';
import ResultsList from './Components/admin/Results/ResultsList';
import { fetchQuestions } from './store/questions/questionsSlice';
import { fetchExams } from './store/exams/examSlice';
import { ExamList } from './Components/student/Exams/ExamList';
import { TakeExam } from './Components/student/Exams/TakeExam';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import StudentResults from './Components/student/Exams/Results';
import SharedStudentComp from './Components/student/SharedStudentComp';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='register' element={<Register />} />
        <Route path='/' element={<Login />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<SharedLayout />}>
          <Route path='results' element={<ResultsList />} />
          <Route
            index
            loader={fetchQuestions}
            path='questions'
            element={<QuestionsComp />}
            errorElement={<ErrorComp />}
          />
          <Route
            loader={fetchExams}
            path='exams'
            element={<ExamsComp />}
            errorElement={<ErrorComp />}
          />
        </Route>

        {/* Student Routes */}
        <Route path='/student' element={<SharedStudentComp/>}>
          <Route path='exams' element={<ExamList />} />
          <Route path='exams/:examId' element={<TakeExam />} />
          <Route path='results' element={<StudentResults/>} />
        </Route>
        
        {/* Catch-all Route */}
        <Route path='*' element={<NotFoundedComp />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
