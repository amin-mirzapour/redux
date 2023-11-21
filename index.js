const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quanity: 1,
  };
}

const initialState = {
  numOfCakes: 10,
  //   anotherProperty : 1 , only to show that you have to make a copy in reducer first then change the state
};

// (previousState , action) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      state;
  }
};
