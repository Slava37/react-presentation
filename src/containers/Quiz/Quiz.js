import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // { [id]: success error }
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' or 'error' }
        isFinished: false,
        quiz: [
            {
                id: 1,
                rightAnswerId: 2,
                question: 'Какого цвета небо?',
                answers: [
                    {id: 1, text: 'Черный'},
                    {id: 2, text: 'Синий'},
                    {id: 3, text: 'Красный'},
                    {id: 4, text: 'Зеленый'}
                ]
            },
            {
                id: 2,
                rightAnswerId: 1,
                question: 'Лучший язык программирования?',
                answers: [
                    {id: 1, text: 'Жаба'},
                    {id: 2, text: 'Си с решеточкой'},
                    {id: 3, text: 'Язык пещерных эльфов'},
                    {id: 4, text: 'Пыха'}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
            if(this.state.answerState){
                const key = Object.keys(this.state.answerState)[0];
                if(this.state.answerState[key] === 'success'){
                    return;
                }
            }

        const question = this.state.quiz[this.state.activeQuestion];
            const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'}
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                   this.setState({
                       isFinished: true
                   });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }

                window.clearTimeout(timeout);
            }, 500);


        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}

        });
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz