const redux = require('redux');
const createStore = redux.createStore;

const axios = require('axios');

const thunkMiddleWare = require('redux-thunk').default;
const applyMiddleWrae = redux.applyMiddleware;


const initialState = {
    loading: false,
    data: {},
    error: ''
}

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";

// to define actions
function fetchUser () {
    return {
        type: FETCH_USER_REQUEST,
    }
}

function fetchUserSuccess (data) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    }
}

function fetchUserError (message) {
    return{
        type: FETCH_USER_ERROR,
        payload: message
    }
}

// to define reducer
function reducer (state = initialState, action) {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return{
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_USER_ERROR:
            return{
                loading: false,
                data: {},
                error: action.payload
            }
        default :
            return state
    }
}


const toFetchUser = () => {
    return function (dispatch) {
        axios.get('https://fakerestapi.azurewebsites.net/api/v1/Users')
            .then(response => {
                dispatch(fetchUserSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchUserError(error.message))
            })
    }
}


const store = createStore(reducer, applyMiddleWrae(thunkMiddleWare));

store.subscribe(() => console.log(store.getState()));

store.dispatch(toFetchUser());

