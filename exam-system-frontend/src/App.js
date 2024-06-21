import './styles/App.css';
import Login from './Auth/Login';
import QuestionsComp from './Components/admin/Questions/QuestionsComp';
import { NotFoundedComp } from './Components/NotFoundedComp';
import { ErrorComp } from './Components/ErrorComp';
import { SharedLayout } from './Components/admin/SharedLayout';
import { fetchQuestions } from './store/questions/questionsSlice';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { fetchExams } from './store/exams/examSlice';
import ExamsComp from './Components/admin/Exams/ExamsComp';
import {ExamList}from './Components/student/Exams/ExamList';

import {TakeExam} from './Components/student/Exams/TakeExam';
import {Results }from './Components/student/Exams/Results';
import Register from './Auth/Register';
import ResultsList from './Components/admin/Results/ResultsList';
import StudentResults from './Components/user/StudentResults';




function App() {
  const router= createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='register' element={<Register />} />
      <Route path='/' element={<Login />} />
      <Route path='/admin' element={<SharedLayout />}>
      <Route path='/admin/results' element={<ResultsList/>} />
      
      
          <Route
            index
            loader={fetchQuestions}
            path='questions'
            element={<QuestionsComp />}
            errorElement={<ErrorComp />}
          />
          <Route
            index
            loader={fetchExams}
            path='exams'
            element={<ExamsComp />}
            errorElement={<ErrorComp />}
          />

    <Route path='user/results' element={<StudentResults/>} />

  <Route path="student">
  <Route path="exams/:examId" element={<TakeExam />} />
  <Route path="exams" element={<ExamList />} />

 
</Route>


          
<Route path='*' element={<NotFoundedComp />} />
    </Route>
    <Route path='user/results' element={<StudentResults/>} />
    </>
    )
  );

  return (
    <>

    <RouterProvider router={router}/>
   </>
  );
}

export default App;
