import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ
} from "./actionTypes";

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    dispatch(finishQuiz())
                } else {
                    // this.setState({
                    //     activeQuestion: state.activeQuestion + 1,
                    //     answerState: null
                    // });
                }

                window.clearTimeout(timeout);
            }, 500);


        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quises/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))

        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axios.get('/quises.json');

            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            });

            dispatch(fetchQuizesSuccess(quizes))

        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}