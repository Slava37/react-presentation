import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-c9f11.firebaseio.com/'
})