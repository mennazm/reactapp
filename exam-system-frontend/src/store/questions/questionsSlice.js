import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Api/ExamApi';

const initialState = {
  questions: [],
  selectedQuestion: null, 
  status: 'idle',
  error: null,
};

// Define thunk for fetching questions from API
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  try {
    const response = await axiosInstance.get('/questions');
    console.log(response.data);
    return response.data;
   
  } catch (error) {
    throw Error('Failed to fetch questions');
  }
});

export const fetchQuestionById = createAsyncThunk('questions/fetchQuestionById', async (questionId) => {
    try {
      const response = await axiosInstance.get(`/questions/${questionId}`);
    console.log(response.data);

      return response.data; 
    } catch (error) {
      throw Error('Failed to fetch question details');
    }
  });
// Define thunk for adding new question
export const addNewQuestion = createAsyncThunk('questions/addNewQuestion', async (questionData) => {
  try {
    const response = await axiosInstance.post('/questions', questionData);
    return response.data;
  } catch (error) {
    throw Error('Failed to add new question');
  }
});

// Define thunk for updating question
export const updateQuestion = createAsyncThunk('questions/updateQuestion', async (questionData) => {
  try {
    const response = await axiosInstance.put(`/questions/${questionData.id}`, questionData);
    return response.data;
  } catch (error) {
    throw Error('Failed to update question');
  }
});

// Define thunk for deleting question
export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (questionId) => {
  try {
    await axiosInstance.delete(`/questions/${questionId}`);
    return questionId;
  } catch (error) {
    throw Error('Failed to delete question');
  }
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {

    clearSelectedQuestion(state) {
        state.selectedQuestion = null;
      },
  },
  extraReducers: (builder) => {
    // Handle fetch questions actions
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle add new question actions
    builder
      .addCase(addNewQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions.push(action.payload);
      })
      .addCase(addNewQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle update question actions
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedIndex = state.questions.findIndex((q) => q._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.questions[updatedIndex] = action.payload;
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handle delete question actions
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = state.questions.filter((q) => q._id !== action.payload);
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

      builder
      .addCase(fetchQuestionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedQuestion = action.payload; 
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
  
});

export default questionsSlice.reducer;
export const { removeQuestionFromExam,clearSelectedQuestion } = questionsSlice.actions;

export const { clearError } = questionsSlice.actions;
