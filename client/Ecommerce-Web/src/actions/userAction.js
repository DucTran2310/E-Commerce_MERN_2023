import { createAction } from '@reduxjs/toolkit'

export const registerAction = createAction('REGISTER_ACTION')
export const loginAction = createAction('LOGIN_ACTION')
export const forgotPasswordAction = createAction('FORGOT_PASSWORD_ACTION')
export const resetPasswordAction = createAction('RESET_PASSWORD_ACTION')
