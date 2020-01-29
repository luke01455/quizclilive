import React, { lazy, Suspense, useState, useContext, useEffect } from 'react'
import './quiz-page.styles.scss'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from "../../context/auth"
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import Spinner from '../../components/spinner/spinner.component'

import QuizModalSport from '../../components/quiz-modal-sport/quiz-modal-sport.component'
import QuizModalMusic from '../../components/quiz-modal-music/quiz-modal-music.component'



const QuizPage = (props) => {
    const context = useContext(AuthContext)
    const strArr = window.location.href.split("/")
    const arrLength = strArr.length
    const quizId = strArr[arrLength - 1]
    const quizTitle = strArr[arrLength - 2]
    const [modalOnOff, setModalOnOff] = useState(false)

    const [thisQuiz, setThisQuiz] = useState([]);
    const { loading, data } = useQuery(FETCH_QUIZ_QUERY, {
        variables: { quizId }
    })

    useEffect(() => {
        if (data) {
            setThisQuiz(data.getThisQuiz)
        }
    }, [data]);

    // useEffect(() => {
    //     if (winnerData) {
    //         console.log('winner mutation ran')
    //     }
    // }, [winnerData]);


    const quizScores = thisQuiz.usersScores
    const [beginQuiz] = useMutation(ENTER_QUIZ_MUTATION, {
        update(proxy, { data }) {
            props.history.push(`/quiz/${quizTitle}/${quizId}/${data.createScore.usersScores[0].id}`)
        },
        variables: {
            quizId,
            score: 0
        }
    })

    const onStart = () => {
        beginQuiz()
        context.modalToggle()
    }

    return (
        <div className='quiz-page-container'>
            
            <div> Get all the questions right to win the Prize</div>
            {
                loading ? <div> loading... </div> : <div> {thisQuiz.isActive === 'filling' ? 'The winner will be drawn once the quiz is full' : 
                thisQuiz.isActive === 'filled' ? `the winner will be drawn in around 30 minutes` : `the winner is ${thisQuiz.winner}`} </div>
            }
            
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Tickets</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {loading ?
                        (
                            <Table.Row>
                        <Table.Cell> Loading... </Table.Cell>
                        </Table.Row>
                        ) :
                        (
                            quizScores &&
                            quizScores.map(userScore => (
                                (
                                    <Table.Row key={userScore.id}>
                                        <Table.Cell>{userScore.username}</Table.Cell>
                                        <Table.Cell color='green'>{userScore.score}</Table.Cell>
                                        <Table.Cell>{userScore.ticketsLow} - {userScore.ticketsHigh}</Table.Cell>
                                    </Table.Row>
                                )
                            ))
                        )}

                </Table.Body>
            </Table>



            {
                context.user ? (<button className='start-quiz-button' onClick={() => onStart()}> START QUIZ </button>) :
                    (<Link className='start-quiz-button' to='/signin'> START QUIZ </Link>)
            }

            {
                context.modal ? <Suspense fallback={<Spinner />}> {quizTitle === 'MUSIC' ? <QuizModalMusic /> : <QuizModalSport />} </Suspense> : <div></div>
            }
        </div>
    )
}

const ENTER_QUIZ_MUTATION = gql`
mutation createScore($quizId: String!, $score: Int!){
    createScore(quizId: $quizId, score: $score){
        id
        usersScores {
            id
            score
            createdAt
        }
    }
}
`


const FETCH_QUIZ_QUERY = gql`
query getThisQuiz($quizId: String!)
{
  getThisQuiz(quizId: $quizId) {
    id
    maxUsers
    userCount
    isActive
    quizType
    winner
    usersScores {
      id
      username
      score
      createdAt
      userId
      ticketsLow
      ticketsHigh
    }
  }
}
`

export default QuizPage;
