import React from 'react';
import { sportsNames } from '../data/sports-names';

const url = new URL('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?');

const getParams = () => {
    // musicians and bands length - find random artist
    let randomName = Math.floor(Math.random() * 99 + 1);
    // search from a randomly generated artist from the musician and bands object
    const params = { p: `${sportsNames[randomName]}`};
    return params
}
export const getQuestionAndAnswer = async () => {
    const newParams = getParams();
    url.search = new URLSearchParams(newParams);

        const questionResponse = await fetch(url, { method: 'POST' })
        .then(results => results.json())
        .then(data => {
            let finalQuestionAndAnswer = ['', '', ''];
               let randomPerson = Math.floor(Math.random() * data.player.length + 1);
                    getQuestionAndAnswer();
                
            
            let getQuestion = () => {
                return ( <div> 
                    <img className='question-image' src={data.player[0].strThumb} alt='questionImg'></img>
                </div> )
            }
            // get the name of the random song from the random artist aka the correct answer to the question
            let getCorrectAnswer = () => {
                return (
                    <div>
                        <div className='correct answer'>{data.player[0].strPlayer.toUpperCase()}</div>
                    </div>
                )
            }
            if(data.player[0]) {
                if (data.player[0].strThumb) {
                    finalQuestionAndAnswer[0] = getQuestion();
                    finalQuestionAndAnswer[1] = getCorrectAnswer();
                    finalQuestionAndAnswer[2] = false;
                } else {
                    getQuestionAndAnswer();
                }
                
            } else {
                getQuestionAndAnswer();
            }
            return finalQuestionAndAnswer;
        });
    console.log('questionResponse', questionResponse);
    return questionResponse;
};


// export const getWrongAnswer = async () => {
//     const newParams = getParams();
//     url.search = new URLSearchParams(newParams);

//         const answersResponse = await fetch(url, { method: 'POST' })
//         .then(results => results.json())
//         .then(data => {
//             let finalWrongAnswers = ['', '', '', '', '']
//             // find a random song from the random artist - temporarily as i dont want to make too many calls
//             let randomTrack1 = Math.floor(Math.random() * data.results.length);
//             let randomTrack2 = Math.floor(Math.random() * data.results.length);
//             let randomTrack3 = Math.floor(Math.random() * data.results.length);
//             let randomTrack4 = Math.floor(Math.random() * data.results.length);
//             // get the name of the random song from the random artist aka the correct answer to the question
//             let getIncorrectAnswer = ( randomTrack ) => {
//                 return (
//                     <div>
//                         <div className='incorrect answer'>{data.results[randomTrack].trackCensoredName.toUpperCase()}</div>
//                     </div>
//                 )
//             }
//             if(data.results[randomTrack1]) {
//                 if (data.results[randomTrack1].artworkUrl100) {
//                     finalWrongAnswers = [
//                     getIncorrectAnswer(randomTrack1), 
//                     getIncorrectAnswer(randomTrack2), 
//                     getIncorrectAnswer(randomTrack3),
//                     getIncorrectAnswer(randomTrack4),
//                 ]
//                 finalWrongAnswers[4] = false;
//                 } else {
//                     getWrongAnswer();
//                 }
                
//             } else {
//                 getWrongAnswer();
//             }
//             return finalWrongAnswers
//         })
//     return answersResponse
// }