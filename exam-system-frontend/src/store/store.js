import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questions/questionsSlice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    // Add other reducers here if needed
  },
});

export default store;
