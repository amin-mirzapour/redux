import { legacy_createStore as createStore } from 'redux';

const CAKE_ORDERED = 'CAKE_ORDERED';

// action &action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quanity: 1,
  };
}

// Reducer
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
      return state;
  }
};

// Store
const store = createStore(reducer);
console.log('initial State', store.getState());

const unsubscribe = store.subscribe(() =>
  console.log('update Store', store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();
