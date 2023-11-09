import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,

    // login and Register
    stateSignUpAndSignIn: {
      isRegister: true,
      email: '',
      errorEmail: false,
      errorReasonEmail: '',
      number: '',
      errorNumber: false,
      password: '',
      errorPassword: false,
      passwordConfirm: '',
      errorPasswordConfirm: false,
      firstName: '',
      errorFirstName: false,
      lastName: '',
      errorLastName: false
    },

    isLoggedIn: false,
    isForgotPass: false,
    isModalSendEmail: false,
    current: null,
    token: null
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },

    // login
    setIsRegister: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        isRegister: action.payload
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setEmail: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      let data = action.payload
      stateObjectClone = {
        ...stateObjectClone,
        email: data.value,
        errorEmail: data.value === '' ? true : data.reason !== '' ? true : false,
        errorReasonEmail: data.reason
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setNumber: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        number: action.payload,
        errorNumber: action.payload === '' ? true : false
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setPassword: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        password: action.payload,
        errorPassword: action.payload === '' ? true : false
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setFirstName: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        firstName: action.payload,
        errorFirstName: action.payload === '' ? true : false
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setLastName: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        lastName: action.payload,
        errorLastName: action.payload === '' ? true : false
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    setPasswordConfirm: (state, action) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }
      stateObjectClone = {
        ...stateObjectClone,
        passwordConfirm: action.payload,
        errorPasswordConfirm: action.payload === '' ? true : action.payload === state.stateSignUpAndSignIn.password ? false : true
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },
    resetStateSignUp: (state) => {
      let stateObjectClone = { ...state.stateSignUpAndSignIn }

      stateObjectClone = {
        ...stateObjectClone,
        email: '',
        errorEmail: false,
        errorReasonEmail: '',
        number: '',
        errorNumber: false,
        password: '',
        errorPassword: false,
        passwordConfirm: '',
        errorPasswordConfirm: false,
        firstName: '',
        errorFirstName: false,
        lastName: '',
        errorLastName: false
      }
      state.stateSignUpAndSignIn = stateObjectClone
    },


    setUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    setCurrentUser: (state, action) => {
      state.current = action.payload
    },
    setIsForgotPass: (state, action) => {
      state.isForgotPass = action.payload
    },
    setIsModalSendEmail: (state, action) => {
      state.isModalSendEmail = action.payload
    },
    logOutUser: (state ) => {
      state.isLoggedIn = false
      state.token = null
    }
  }
})

export const {
  setCategories,
  setIsRegister,
  setEmail,
  setNumber,
  setPassword,
  setFirstName,
  setLastName,
  setPasswordConfirm,
  resetStateSignUp,
  setUser,
  setIsForgotPass,
  setIsModalSendEmail,
  setCurrentUser,
  logOutUser
} = appSlice.actions

const appReducer = appSlice.reducer

export default appReducer
