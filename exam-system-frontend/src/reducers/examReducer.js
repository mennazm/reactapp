// reducers/examReducer.js

import {
  FETCH_EXAMS_REQUEST,
  FETCH_EXAMS_SUCCESS,
  FETCH_EXAMS_FAILURE,
  SET_RESULTS
} from '../actions/examActions';

const initialState = {
  exams: [],
  loading: false,
  error: null,
  results: []
};

const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXAMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_EXAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        exams: action.payload,
        error: null
      };
    case FETCH_EXAMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default examReducer;


