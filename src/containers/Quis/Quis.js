import React, {Component} from "react";
import './Quis.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quis extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Як мене звати?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'Настя', id: 1},
                    {text: 'Оля', id: 2},
                    {text: 'Даша', id: 3},
                    {text: 'Наташа', id: 4}
                ]
            },
            {
                question: 'Якого року я народження?',
                rightAnswerId: 1,
                id: 2,
                answers: [
                    {text: '1999', id: 1},
                    {text: '1998', id: 2},
                    {text: '2000', id: 3},
                    {text: '2001', id: 4}
                ]
            },
            {
                question: 'Як звали мою першу домашню тварину?',
                rightAnswerId: 3,
                id: 3,
                answers: [
                    {text: 'Бублік', id: 1},
                    {text: 'Тріксі', id: 2},
                    {text: 'Рома', id: 3},
                    {text: 'Лука', id: 4}
                ]
            },
            {
                question: 'Моя улюблена страва?',
                rightAnswerId: 4,
                id: 4,
                answers: [
                    {text: 'Макарони', id: 1},
                    {text: 'Піца', id: 2},
                    {text: 'Суши', id: 3},
                    {text: 'Шпецле', id: 4}
                ]
            },
            {
                question: 'Мій улюблений фільм?',
                rightAnswerId: 1,
                id: 5,
                answers: [
                    {text: '1+1', id: 1},
                    {text: 'Гаррі Поттер', id: 2},
                    {text: 'Гра в імітацію', id: 3},
                    {text: 'Шерлок', id: 4}
                ]
            },
            {
                question: 'Мій улюблений супергерой?',
                rightAnswerId: 3,
                id: 6,
                answers: [
                    {text: 'Халк', id: 1},
                    {text: 'Людина павук', id: 2},
                    {text: 'Залізна людина', id: 3},
                    {text: 'Доктор Стренж', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {

        // запопігає фінішу при подвійному клікі
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            console.log(key)
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion] //яке саме запитання
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeOut = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeOut)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: null,
            results: {}
        })
    }

    render() {
        return (
            <div className='Quiz'>
                <div className="QuizWraper">
                    <h1>Наскільки добре ти мене знаєш?</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry = {this.retryHandler}
                            /> :
                    <ActiveQuiz
                        answers = {this.state.quiz[this.state.activeQuestion].answers}
                        question = {this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLength = {this.state.quiz.length}
                        answerNumber = {this.state.activeQuestion + 1}
                        state = {this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}

export default Quis