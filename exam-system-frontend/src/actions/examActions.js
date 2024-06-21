// actions/examActions.js

export const FETCH_EXAMS_REQUEST = 'FETCH_EXAMS_REQUEST';
export const FETCH_EXAMS_SUCCESS = 'FETCH_EXAMS_SUCCESS';
export const FETCH_EXAMS_FAILURE = 'FETCH_EXAMS_FAILURE';
export const SET_RESULTS = 'SET_RESULTS';

export const fetchExamsRequest = () => ({
  type: FETCH_EXAMS_REQUEST
});

export const fetchExamsSuccess = (exams) => ({
  type: FETCH_EXAMS_SUCCESS,
  payload: exams
});

export const fetchExamsFailure = (error) => ({
  type: FETCH_EXAMS_FAILURE,
  payload: error
});

export const setResults = (results) => ({
  type: SET_RESULTS,
  payload: results
});

export const fetchExams = () => {
  return async (dispatch) => {
    dispatch(fetchExamsRequest());
    try {
      const response = await fetch('http://localhost:8081/exams');
      if (!response.ok) {
        throw new Error('Failed to fetch exams');
      }
      const exams = await response.json();
      dispatch(fetchExamsSuccess(exams));
    } catch (error) {
      dispatch(fetchExamsFailure(error.message));
    }
  };
};
