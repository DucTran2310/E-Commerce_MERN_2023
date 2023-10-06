import { createAction } from '@reduxjs/toolkit'

export const startAlertError = createAction('START_ALERT_ERROR')
export const startAlertSuccess = createAction('START_ALERT_SUCCESS')
export const endAlertCom = createAction('END_ALERT_COM')
export const setNoTimeNotifyAction = createAction('SET_NO_TIME_NOTIFY_ACTION')
