import gql from 'graphql-tag'

export const FETCH_QUIZZES_QUERY = gql`
{
  getQuiz {
    id
    maxUsers
    userCount
    isActive
    quizType
    usersScores {
      id
      username
      score
      createdAt
      userId
    }
  }
}
`

export const MY_SCORES_QUERY = gql`
{
  getMyScores {
    id
    username
    score
    quiz
    ticketsLow
    ticketsHigh
    userId
    quizType
    price
  }
}
`




