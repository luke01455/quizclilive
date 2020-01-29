import React, { useEffect, useState, useContext } from 'react'
import gql from 'graphql-tag'
import { AuthContext } from "../../context/auth"

import { sportsNames } from '../../data/sports-names'
import { useMutation } from '@apollo/react-hooks'
import Spinner from '../spinner/spinner.component'

import './quiz-modal-sport.styles.scss'

const QuizModal = ({ scoreData }) => {
    const url = new URL('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?')
    const context = useContext(AuthContext)

    const [question, setQuestion] = useState([])
    const [isRadioChecked, setCheckedRadio] = useState(Math.floor(Math.random() * 4 + 1).toString())

    const [correctAnswer, setCorrectAnswer] = useState([])
    const [incorrectAnswer1, setIncorrectAnswer1] = useState([])
    const [incorrectAnswer2, setIncorrectAnswer2] = useState([])
    const [incorrectAnswer3, setIncorrectAnswer3] = useState([])
    const [incorrectAnswer4, setIncorrectAnswer4] = useState([])
    const [answerLocation, setAnswerLocation] = useState(1)

    const [questionIsLoading, setQuestionIsLoading] = useState(true)
    const [answerIsLoading, setAnswerIsLoading] = useState(true)

    let [count, setCount] = useState(1)
    let [score, setScore] = useState(1)

    const strArr = window.location.href.split("/")
    const arrLength = strArr.length
    const quizId = strArr[arrLength-2]
    const scoreId = strArr[arrLength-1]
    

    const getParams = () => {
        // musicians and bands length - find random artist
        let randomName = Math.floor(Math.random() * 69 + 1)
        // search from a randomly generated artist from the musician and bands object
        const params = { p: `${sportsNames[randomName]}`}
        return params
    }
    const getQuestionAndAnswer = () => {
        setAnswerLocation(Math.floor(Math.random() * 4 + 1))
        const newParams = getParams()
        url.search = new URLSearchParams(newParams)

        try {
            fetch(url, { method: 'POST' })
            .then(results => results.json())
            .then(data => {
            if(data.player){
                // find a random song from the random artist - temporary because i dont want to make too many calls
                let randomPerson = Math.floor(Math.random() * data.player.length + 1)

                // get a still from the random song of the random artist
                let getQuestion = () => {
                    return ( <div> 
                        <img className='question-image' src={data.player[randomPerson].strThumb} alt='questionImg'></img>
                    </div> )
                }
                // get the name of the random song from the random artist aka the correct answer to the question
                let getCorrectAnswer = () => {
                    return (
                        <div>
                            <div className='correct answer'>{data.player[randomPerson].strPlayer.toUpperCase()}</div>
                        </div>
                    )
                }
                if(data.player[randomPerson]) {
                    if (data.player[randomPerson].strThumb) {
                        setQuestion(getQuestion)
                        setCorrectAnswer(getCorrectAnswer)
                        setQuestionIsLoading(false)
                    } else {
                        getQuestionAndAnswer()
                    }
                    
                } else {
                    getQuestionAndAnswer()
                }
            } else {
                getQuestionAndAnswer()
            }
            })
        }
        catch(error) {
            console.log('catch', error)
        }
    };

    const getWrongAnswer = () => {
        const newParams = getParams();
        url.search = new URLSearchParams(newParams)

        try {
            fetch(url, { method: 'POST' })
            .then(results => results.json())
            .then(data => {
            if(data.player){
                // find a random song from the random artist - temporarily as i dont want to make too many calls
                let randomPerson1 = Math.floor(Math.random() * data.player.length)
                let randomPerson2 = Math.floor(Math.random() * data.player.length)
                let randomPerson3 = Math.floor(Math.random() * data.player.length)
                let randomPerson4 = Math.floor(Math.random() * data.player.length)

                // get the name of the random song from the random artist aka the correct answer to the question
                let getIncorrectAnswer1 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.player[randomPerson1].strPlayer.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer2 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.player[randomPerson2].strPlayer.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer3 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.player[randomPerson3].strPlayer.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer4 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.player[randomPerson4].strPlayer.toUpperCase()}</div>
                        </div>
                    )
                }

                if(data.player[randomPerson1]) {
                    if (data.player[randomPerson1].strPlayer) {
                        setIncorrectAnswer1(getIncorrectAnswer1)
                        setIncorrectAnswer2(getIncorrectAnswer2)
                        setIncorrectAnswer3(getIncorrectAnswer3)
                        setIncorrectAnswer4(getIncorrectAnswer4)
                        setAnswerIsLoading(false)
                    } else {
                        getWrongAnswer()
                    }
                    
                } else {
                    getWrongAnswer()
                }
            } else {
                getWrongAnswer()
            }
            })
        }
        catch(error) {
            console.log('catch', error)
        }
    }

    const nextQuestion = () => {
        if(isRadioChecked == answerLocation) {
            setCount(count + 1)
            setScore(score + 1)
            getQuestionAndAnswer()
            getWrongAnswer()
            console.log('correct', count, score)
            console.log(scoreData)
            
            
            
        } else {
            
            setCount(count + 1)
            getQuestionAndAnswer()
            getWrongAnswer()
            console.log('incorrect', count, score)
            
        }
        
    }

    const [endQuizMutation] = useMutation(QUIZ_END_MUTATION, {
        update() {
        },
        variables: {
            quizId,
            score,
            scoreId
        }
    })

    const endQuiz = () => {
        endQuizMutation()
        context.modalToggle()
    }
    
    useEffect(() => {
        getQuestionAndAnswer()
        getWrongAnswer()
        console.log(quizId, scoreId)
    }, []);


    return (
        <div className='styled-modal'>
            {
                (questionIsLoading && answerIsLoading) ?
                    (
                        <Spinner />
                    ) :
                    (
                        <div className='modal-container'>
                            <div className='question-header'> WHO IS THIS SPORTSPERSON? </div>
                            <div className='modal-warning'> {question}
                            </div>
                            <div className='modal-section-wrapper'>
                                <div className='radio-answer'>
                                    <input type="radio" value="1" onChange={() => setCheckedRadio("1")} checked={isRadioChecked === '1'} />
                                    {answerLocation === 1 ? correctAnswer : incorrectAnswer1}
                                </div>
                                <div className='radio-answer'>
                                    <input type="radio" value="2" onChange={() => setCheckedRadio("2")} checked={isRadioChecked === '2'} />
                                    {answerLocation === 2 ? correctAnswer : incorrectAnswer2}
                                </div>
                                <div className='radio-answer'>
                                    <input type="radio" value="3" onChange={() => setCheckedRadio("3")} checked={isRadioChecked === '3'} />
                                    {answerLocation === 3 ? correctAnswer : incorrectAnswer3}
                                </div>
                                <div className='radio-answer'>
                                    <input type="radio" value="4" onChange={() => setCheckedRadio("4")} checked={isRadioChecked === '4'} />
                                    {answerLocation === 4 ? correctAnswer : incorrectAnswer4}
                                </div>

                            </div>
                            <div onClick={ count !== 5 ? nextQuestion : endQuiz} className='next-button'> Next Question </div>
                        </div>
                    )
            }
        </div>
    )
}

const QUIZ_END_MUTATION = gql`
mutation updateScore($quizId: String!, $score: Int!, $scoreId: String!){
    updateScore(quizId: $quizId, score: $score, scoreId: $scoreId){
        id
        usersScores {
            id
            score
            createdAt
        }
    }
}
`

export default QuizModal