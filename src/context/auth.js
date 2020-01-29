import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null,
    modal: false
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
    // exp is expiration time
    // test if token is expired if it is, remove it
    // else set state to user
    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

const modalContext = createContext({
    modal: false,
    modalToggle: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        case 'MODAL_TOGGLE':
            return{
                ...state,
                modal: !state.modal
            }
        default: 
            return state
    }
}

function AuthProvider(props){
    // takes state and dispatch
    // initital state user: null
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem("jwtToken")
        dispatch({ type: 'LOGOUT'})
    }

    const modalToggle = () => {
        dispatch({ type: 'MODAL_TOGGLE'})
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout, modal: state.modal, modalToggle}}
            {...props}
            />
    )
}

export { AuthContext, AuthProvider, modalContext }