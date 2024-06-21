import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeQuestionFromExam } from '../questions/questionsSlice';

import axiosInstance from '../../Api/ExamApi';

const initialState = {
  exams: [],
  selectedExam: null,
  results: [],
  status: 'idle',
  error: null,
};

// Thunk for fetching all exams
export const fetchExams = createAsyncThunk('exams/fetchExams', async () => {
  try {
    const response = await axiosInstance.get('/exams');
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch exams');
  }
});

// Thunk for fetching a single exam by ID
export const fetchExamById = createAsyncThunk('exams/fetchExamById', async (examId) => {
  try {
    const response = await axiosInstance.get(`/exams/${examId}`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch exam details');
  }
});

// Thunk for adding a new exam
export const addNewExam = createAsyncThunk('exams/addNewExam', async (examData) => {
  try {
    const response = await axiosInstance.post('/exams', examData);
    return response.data;
  } catch (error) {
    throw Error('Failed to add new exam');
  }
});

// Thunk for updating an existing exam
export const updateExam = createAsyncThunk('exams/updateExam', async (examData) => {
  try {
    const response = await axiosInstance.put(`/exams/${examData.id}`, examData);
    return response.data;
  } catch (error) {
    throw Error('Failed to update exam');
  }
});

// Thunk for deleting an exam and its associated questions
export const deleteExamAndQuestions = createAsyncThunk(
  'exams/deleteExamAndQuestions',
  async ({ examId, questionId }, { dispatch, rejectWithValue }) => {
    try {
      // Step 1: Delete the question from the exam
      await axiosInstance.delete(`/exams/${examId}/questions/${questionId}`);

      // Step 2: Call the action from questionsSlice to remove the question from the Redux store
      dispatch(removeQuestionFromExam({ examId, questionId }));

      // Step 3: Optionally, delete the exam itself (if required)
      // await axiosInstance.delete(`/exams/${examId}`);

      return examId; // Return examId on success
    } catch (error) {
      // Handle errors and reject with an error message
      return rejectWithValue('Failed to delete question from exam');
    }
  }
);


const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearSelectedExam(state) {
      state.selectedExam = null;
    },
    addExamResult(state, action) {
      state.results.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch exams actions
      .addCase(fetchExams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle fetch single exam actions
      .addCase(fetchExamById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedExam = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle add new exam actions
      .addCase(addNewExam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams.push(action.payload);
      })
      .addCase(addNewExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle update exam actions
      .addCase(updateExam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedIndex = state.exams.findIndex((e) => e._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.exams[updatedIndex] = action.payload;
        }
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

          // Handle delete exam and questions actions
          .addCase(deleteExamAndQuestions.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteExamAndQuestions.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // Remove the deleted exam from the state
            state.exams = state.exams.filter((exam) => exam._id !== action.payload);
          })
          .addCase(deleteExamAndQuestions.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ? action.payload : 'Failed to delete exam and questions';
          });
  },
});

export default examsSlice.reducer;
export const { clearSelectedExam, addExamResult } = examsSlice.actions;
