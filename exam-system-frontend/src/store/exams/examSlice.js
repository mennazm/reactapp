import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../Api/ExamApi';

const initialState = {
  exams: [],
  selectedExam: null,
  selectedExamId: null,
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

export const updateExamStatus = createAsyncThunk('exams/updateExamStatus', async ({ id, status }) => {
  const response = await axiosInstance.put(`/exams/${id}`, { status });
  return response.data;
});

// Thunk for deleting an exam
export const deleteExam = createAsyncThunk(
  'exams/deleteExam',
  async (examId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/exams/${examId}`);
      return examId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearSelectedExam(state) {
      state.selectedExam = null;
      state.selectedExamId = null;
      
    },
    updateExamStatusLocally: (state, action) => {
      const { id, status } = action.payload;
      const index = state.exams.findIndex(exam => exam._id === id);
      if (index !== -1) {
        state.exams[index].status = status;
      }
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
        state.selectedExamId = action.payload._id; 
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

      .addCase(updateExamStatus.fulfilled, (state, action) => {
        const index = state.exams.findIndex(exam => exam._id === action.payload._id);
        if (index !== -1) {
          state.exams[index].status = action.payload.status;
        }
      })
      
      // Handle delete exam actions
      .addCase(deleteExam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exams = state.exams.filter((exam) => exam._id !== action.payload); 
        state.selectedExamId = null; 
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload : 'Failed to delete exam';
      });

  },
});

export default examsSlice.reducer;
export const { clearSelectedExam ,selectedExamId, updateExamStatusLocally} = examsSlice.actions;
