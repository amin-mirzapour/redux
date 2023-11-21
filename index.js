import { legacy_createStore as createStore } from 'redux';
import { bindActionCreators, combineReducers, applyMiddleware } from 'redux';
import pkg from 'redux-logger';
const createLogger = pkg.createLogger;
const logger = createLogger({});
//constants
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// action & action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockedCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockedIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// Reducer
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
//   //   anotherProperty : 1 , ...state only to show that you have to make a copy in reducer first then change the state
// };

const cakeInitialState = {
  numOfCakes: 10,
};
const iceCreamInitialState = {
  numOfIceCreams: 20,
};

// (previousState , action) => newState
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// Store
const rootreducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootreducer, applyMiddleware(logger));
console.log('initial State', store.getState());

const unsubscribe = store.subscribe(() => {});

//before logger installation
// const unsubscribe = store.subscribe(() =>
//   console.log('update Store', store.getState())
// );

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockedCake(2));

const actions = bindActionCreators(
  { orderCake, restockedCake, orderIceCream, restockedIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockedCake(5);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockedIceCream(1);

unsubscribe();
