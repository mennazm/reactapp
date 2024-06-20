import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questions/questionsSlice';
import examSlice from './exams/examSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    exams: examSlice
  },
});

export default store;
