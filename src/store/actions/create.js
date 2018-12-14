import {CREATE_QUIZ_QUESTION, RESET_QUIZ_QUESTION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizQuestion() {
    return {
        type: RESET_QUIZ_QUESTION
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quises.json', getState().create.quiz);
        dispatch(resetQuizQuestion())
    }
}