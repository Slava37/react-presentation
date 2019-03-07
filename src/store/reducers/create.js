import {CREATE_QUIZ_QUESTION, RESET_QUIZ_QUESTION} from "../actions/actionTypes";

const initialState = {
    quiz: [],
    quizName: ""
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_QUIZ_QUESTION:
            return {
                ...state, quizName: action.quizName, quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_QUESTION:
            return {
                ...state, quiz: [], quizName: ""
            }
        default:
            return state;
    }
}