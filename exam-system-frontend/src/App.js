import logo from './logo.svg';
import './App.css';
import Login from './Auth/Login';

import QuestionsComp from './Components/admin/QuestionsComp';
import { NotFoundedComp } from './Components/NotFoundedComp';
import { ErrorComp } from './Components/ErrorComp';
import { SharedLayout } from './Components/admin/SharedLayout';
import { fetchQuestions } from './store/questions/questionsSlice';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
  const router= createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={<SharedLayout />}>
      <Route path='login' element={<Login />} />

      <Route
        index
        loader={fetchQuestions}
        element={<QuestionsComp />}
        errorElement={<ErrorComp />}
      />
      <Route path='*' element={<NotFoundedComp />} />
    </Route>
    )
  );

  return (
    <>

    <RouterProvider router={router}/>
   </>
  );
}

export default App;
