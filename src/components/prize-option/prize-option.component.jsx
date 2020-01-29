import React from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom';
import './prize-option.styles.scss';

const PrizeOption = ({ title, imageUrl, size, history, id, userCount, maxUsers }) => {

  const [drawWinner] = useMutation(DRAW_WINNER_MUTATION)

  const openQuiz = () => {
    history.push(`quiz/${title}/${id}`)
    drawWinner();
  }

  return (
    <div
      onClick={ openQuiz }
      className={`${size} menu-item`}>

      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >

        <div className='quiz-title-top' style={{
          //  backgroundImage: `url(https://imgs.bigtop40.com/images/31596?crop=16_9&width=660&relax=1&signature=lxbxcRTWQtjzftEU7eZBZ05Bqwo=)`
        }}> WIN A £250 AMAZON GIFT CARD! </div>
        <div className="bottom-title-container">
          <div className='quiz-title-bottom'> {title} </div>
          <div className='quiz-price'> £2.99 </div>
        </div>
      </div>


      <div className='content'>
        <h1 className='title'> ENTER </h1>
        <span className='subtitle'> {userCount} / {maxUsers} </span>
      </div>

    </div>
  )

};

const DRAW_WINNER_MUTATION = gql`
mutation drawWinner{
    drawWinner{  
        id
    }
}
`

export default withRouter(PrizeOption);