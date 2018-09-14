import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Define action type constants

const GOT_SHOES = 'GOT_SHOES';
const UPDATE_SHOE_IN_STORE = 'UPDATE_SHOE_IN_STORE'

// Define action creators

export const gotShoes = shoes => ({
  type: GOT_SHOES, shoes
});

export const updateShoeInStore = shoe => ({
  type: UPDATE_SHOE_IN_STORE, shoe
});

// A thunk creator which fetches all shoes from the server
// and dispatches the appropriate action when a response is
// received.
export const fetchShoes = () => async (dispatch) => {
  try {
    const { data } = await axios.get('api/shoes');
    // convert array to object
    const dataObject = data.reduce((shoes, shoe) => (
      {...shoes, [shoe.id]: shoe }
    ), {});
    dispatch(gotShoes(dataObject));
  }
  catch (error) {
    console.log(error);
  }  
}

const initialState = {
  shoes: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SHOES:
      return {
        ...state,
        shoes: action.shoes
      };

    case UPDATE_SHOE_IN_STORE:
      return {
        ...state,
        shoes: {
          ...state.shoes,
          [action.shoe.id]: action.shoe
        }
      }

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;