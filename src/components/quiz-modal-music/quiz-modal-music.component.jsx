import React, { useEffect, useState } from 'react';

import { musiciansAndBands } from '../../data/musicians-bands';

import Spinner from '../spinner/spinner.component';

import './quiz-modal-music.styles.scss';

const QuizModal = () => {
    let count = 1;
    const url = new URL('https://itunes.apple.com/search');
    const [question, setQuestion] = useState([]);
    const [isRadioChecked, setCheckedRadio] = useState(Math.floor(Math.random() * 4 + 1).toString());
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [incorrectAnswer1, setIncorrectAnswer1] = useState([]);
    const [incorrectAnswer2, setIncorrectAnswer2] = useState([]);
    const [incorrectAnswer3, setIncorrectAnswer3] = useState([]);
    const [incorrectAnswer4, setIncorrectAnswer4] = useState([]);
    const [answerLocation, setAnswerLocation] = useState(1);
    const [questionIsLoading, setQuestionIsLoading] = useState(true);
    const [answerIsLoading, setAnswerIsLoading] = useState(true);
    

    const getParams = () => {
        // musicians and bands length - find random artist
        let randomArtist = Math.floor(Math.random() * 69 + 1);
        // search from a randomly generated artist from the musician and bands object
        const params = { term: `${musiciansAndBands[randomArtist]}`, media: 'musicVideo'};
        return params
    }
    const getQuestionAndAnswer = () => {
        setAnswerLocation(Math.floor(Math.random() * 4 + 1));
        const newParams = getParams();
        url.search = new URLSearchParams(newParams);

        try {
            fetch(url, { method: 'POST' })
            .then(results => results.json())
            .then(data => {
                if(data.results) {
                // find a random song from the random artist - temporary because i dont want to make too many calls
                let randomTrack = Math.floor(Math.random() * data.results.length + 1);

                // get a still from the random song of the random artist
                let getQuestion = () => {
                    return ( <div> 
                        <img className='question-image' src={data.results[randomTrack].artworkUrl100} alt='questionImg'></img>
                    </div> )
                }
                // get the name of the random song from the random artist aka the correct answer to the question
                let getCorrectAnswer = () => {
                    return (
                        <div>
                            <div className='correct answer'>{data.results[randomTrack].trackCensoredName.toUpperCase()}</div>
                        </div>
                    )
                }
                if(data.results[randomTrack]) {
                    if (data.results[randomTrack].artworkUrl100) {
                        setQuestion(getQuestion);
                        setCorrectAnswer(getCorrectAnswer);
                        setQuestionIsLoading(false);
                    } else {
                        getQuestionAndAnswer();
                    }
                    
                } else {
                    getQuestionAndAnswer();
                }
            } else {
                getQuestionAndAnswer();
            } 
            })
        }
        catch(error) {
            console.log('catch', error)
        }
    };

    const getWrongAnswer = () => {
        const newParams = getParams();
        url.search = new URLSearchParams(newParams);

        try {
            fetch(url, { method: 'POST' })
            .then(results => results.json())
            .then(data => {
            if(data.results) {
                // find a random song from the random artist - temporarily as i dont want to make too many calls
                let randomTrack1 = Math.floor(Math.random() * data.results.length);
                let randomTrack2 = Math.floor(Math.random() * data.results.length);
                let randomTrack3 = Math.floor(Math.random() * data.results.length);
                let randomTrack4 = Math.floor(Math.random() * data.results.length);

                // get the name of the random song from the random artist aka the correct answer to the question
                let getIncorrectAnswer1 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.results[randomTrack1].trackCensoredName.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer2 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.results[randomTrack2].trackCensoredName.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer3 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.results[randomTrack3].trackCensoredName.toUpperCase()}</div>
                        </div>
                    )
                }
                let getIncorrectAnswer4 = () => {
                    return (
                        <div>
                            <div className='incorrect answer'>{data.results[randomTrack4].trackCensoredName.toUpperCase()}</div>
                        </div>
                    )
                }

                if(data.results[randomTrack1]) {
                    if (data.results[randomTrack1].artworkUrl100) {
                        setIncorrectAnswer1(getIncorrectAnswer1);
                        setIncorrectAnswer2(getIncorrectAnswer2);
                        setIncorrectAnswer3(getIncorrectAnswer3);
                        setIncorrectAnswer4(getIncorrectAnswer4);
                        setAnswerIsLoading(false);
                    } else {
                        getWrongAnswer();
                    }
                    
                } else {
                    getWrongAnswer();
                }
            } else {
                getWrongAnswer();
            }
                
            })
        }
        catch(error) {
            console.log('catch', error)
        }
    }

    const nextQuestion = () => {
        if(isRadioChecked == answerLocation) {
            console.log('correct', isRadioChecked,  answerLocation, count);
            //addToCount();
            //addTenCarTickets();
            getQuestionAndAnswer();
            getWrongAnswer();
            
            
        } else {
            console.log('incorrect', isRadioChecked,  answerLocation, count)
            //addToCount();
            getQuestionAndAnswer();
            getWrongAnswer();
            
        }
        
    }

    useEffect(() => {
        getQuestionAndAnswer();
        getWrongAnswer();
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
                            <div className='question-header'> WHAT IS THE NAME OF THIS MUSIC VIDEO </div>
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
                            <div onClick={nextQuestion} className='next-button'> Next Question </div>
                        </div>
                    )
            }
        </div>
    )
}

// const mapDispatchToProps = dispatch => ({
//     addTenCarTickets: () => dispatch(addTenCarTickets()),
//     addToCount: () => dispatch(addToCount())
//    });


//export default connect(null, mapDispatchToProps)(QuizModal);

export default QuizModal