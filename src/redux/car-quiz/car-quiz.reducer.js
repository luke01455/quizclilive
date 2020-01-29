import CarQuizTypes from "./car-quiz.types";

const INITIAL_STATE = {
  carTickets: 1,
  quizCount: 0
};

const ticketsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CarQuizTypes.ADD_TEN_TICKETS:
      return {
        ...state,
        carTickets: state.carTickets + 10
      };
    case CarQuizTypes.ADD_TO_COUNT:
      return {
        ...state,
        quizCount: state.quizCount + 1
      };
    default:
      return state;
  }
};

export default ticketsReducer;